const jwt = require('jsonwebtoken')

verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token']
    ? req.headers['x-access-token']
    : null

  if (!token) {
    return res.status(401).send({
      message: 'No token provided!'
    })
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    req.userName = decoded
    next()
  })
}

module.exports = verifyToken
