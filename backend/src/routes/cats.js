const bcrypt = require('bcrypt')
const cats = require('../models/cats')
const { throwError } = require('../utils/error')

exports.getPresentCat = async (req, res, next) => {
  console.log(req.user)
  return res.status(200).send({ data: req.user })
}

exports.uploadImg = async (req, res, next) => {
  try {
    const fileName = `cats/${req.file.filename}`
    const newCat = await cats.findByIdAndUpdateImg(req.user.id, fileName)
    return res.status(200).send(newCat)
  } catch (err) {
    next(err)
  }
}

exports.getAllCat = async (req, res, next) => {
  try {
    const allCat = await cats.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData)
    return res.status(200).send({ data: readOnlyCats })
  } catch (err) {
    next(err)
  }
}

exports.signUp = async (req, res, next) => {
  try {
    const { email, name, password } = req.body
    const isCatExist = await cats.existsByEmail(email)
  
    if(isCatExist) {
      throwError(400, '해당하는 고양이는 이미 존재합니다.')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await cats.create({ email, name, password: hashedPassword })
    return res.status(200).send(cat.readOnlyData)
  } catch (err) {
    next(err)
  }
}
