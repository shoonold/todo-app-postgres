const jwt = require('jsonwebtoken')
const User = require('../models').users

module.exports = {
  async login (req, res) {
    const user = await User.findOne({
      where: { username: req.body.userName, password: req.body.password }
    })

    if (!user) {
      res.send({
        success: false,
        msg: `Invalid username or password`
      })
    } else {
      const token = jwt.sign(
        { userName: req.body.userName, id: user.id },
        process.env.SECRET_KEY,
        {
          expiresIn: '7d'
        }
      )
      res.send({
        success: true,
        token: token,
        userName: req.body.userName,
        msg: 'User logged in successfully'
      })
    }
  }
}
