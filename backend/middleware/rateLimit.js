const { RateLimiterMemory } = require('rate-limiter-flexible');

const authRateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60, // seconds
  blockDuration: 60,
  keyPrefix: 'auth'
});

const handler = async (req, res, next) => {
  try {
    await authRateLimiter.consume(req.ip);
    return next();
  } catch (e) {
    return res.status(429).json({ message: 'Too many requests' });
  }
};

module.exports = {
  authRateLimiter: handler
};

