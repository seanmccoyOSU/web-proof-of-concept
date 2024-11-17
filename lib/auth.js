const jwt = require("jsonwebtoken")

const secretKey = process.env.SECRET_KEY

exports.generateAuthToken = function (userId, admin) {
  const payload = {
    sub: userId
    //admin: admin
  }
  return jwt.sign(payload, secretKey, { expiresIn: "24h" })
}

exports.requireAuthentication = function (req, res, next) {
  const authHeader = req.get("Authorization") || ""
  const authHeaderParts = authHeader.split(" ")
  const token = authHeaderParts[0] === "Bearer" ? authHeaderParts[1] : null

  try {
    const payload = jwt.verify(token, secretKey)
    req.user = payload.sub
    //req.admin = payload.admin
    next()
  } catch (e) {
    res.status(401).send({
      error: "Valid authentication token required"
    })
  }
}