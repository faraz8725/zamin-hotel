const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const crypto = require('crypto');

const User = require('../models/user.model');
const { asyncHandler } = require('../utils/asyncHandler');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(80).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required()
});

const forgotSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).max(128).required()
});

const register = asyncHandler(async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const existing = await User.findOne({ email: value.email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(value.password, 12);
  const user = await User.create({
    name: value.name,
    email: value.email,
    passwordHash,
    role: value.email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() ? 'admin' : 'customer',
    isBlocked: false
  });

  // Force admin password match for safety if registering with admin email
  if (user.role === 'admin') {
    const adminPassOk = await bcrypt.compare(value.password, await bcrypt.hash(process.env.ADMIN_PASSWORD, 12));
    // If mismatch, set as customer by default.
    if (!adminPassOk) {
      user.role = 'customer';
      await user.save();
    }
  }

  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

const login = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.isBlocked) return res.status(403).json({ message: 'Account blocked' });

  const ok = await bcrypt.compare(value.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

const logout = asyncHandler(async (_req, res) => {
  // JWT is stateless; client can discard token.
  res.json({ message: 'Logged out' });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { error, value } = forgotSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const user = await User.findOne({ email: value.email });
  // Avoid account enumeration
  if (!user) return res.json({ message: 'If an account exists, a reset email will be sent' });

  const token = crypto.randomBytes(32).toString('hex');
  user.passwordResetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
  user.passwordResetExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  // TODO: implement nodemailer email sending. For now, return token only in dev.
  if (process.env.NODE_ENV === 'development') {
    return res.json({ message: 'Reset token generated (dev)', token });
  }

  res.json({ message: 'If an account exists, a reset email will be sent' });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { error, value } = resetSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const tokenHash = crypto.createHash('sha256').update(value.token).digest('hex');
  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: new Date() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.passwordHash = await bcrypt.hash(value.newPassword, 12);
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ user });
});

module.exports = { register, login, logout, forgotPassword, resetPassword, getMe };

