import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  })
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body || {}
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password are required' })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: 'Email already in use' })

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role === 'admin' ? 'admin' : 'user',
    })

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Register failed' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' })

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    const token = signAccessToken({
      sub: String(user._id),
      id: user._id,
      email: user.email,
      role: user.role,
    })

    return res.json({
      accessToken: token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Login failed' })
  }
}

export async function me(req, res) {
  return res.json({ user: req.user })
}

