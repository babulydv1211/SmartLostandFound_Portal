import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET_KEY

export function authGuard(req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  const token = authorization.split(" ")[1]
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
