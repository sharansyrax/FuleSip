import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers
  console.log("Received token:", token)

  if (!token) {
    return res.json({ success: false, message: "Not Authorized login again" })
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = token_decode.id
    next()
  } catch (error) {
    console.log(error)
    console.error("JWT verification failed:", error.message)
    res.json({ success: false, message: "Error" })
  }
}

export default authMiddleware
