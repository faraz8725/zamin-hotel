import jwt from 'jsonwebtoken'

function getToken(req) {
  // Authorization: Bearer <token>
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) return header.slice(7)

  // Optional cookie fallback
  if (req.cookies && req.cookies.accessToken) return req.cookies.accessToken

  return null
}

export function requireAuth(req, res, next) {
  try {
    const token = getToken(req)
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export function requireAdmin(req, res, next) {
  try {
    requireAuth(req, res, () => {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' })
      }
      return next()
    })
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' })
  }
}

