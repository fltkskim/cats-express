const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cats = require('../models/cats')
const { throwError } = require('../utils/error')

exports.jwtLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const cat = await cats.findCatByEmail(email)
    if (!cat) {
      throwError(400, '이메일과 비밀번호를 확인해주요.')
    }
    const isPasswordValidated = await bcrypt.compare(password, cat.password)
    if (!isPasswordValidated) {
      throwError(400, '이메일과 비밀번호를 확인해주세요.')
    }
    const payload = { email, sub: cat.id }
    return res.status(200).send({
      data: {
        token: jwt.sign(payload, process.env.JWT_SECRET),
      }
    })
  } catch (err) {
    next(err)
  }
}