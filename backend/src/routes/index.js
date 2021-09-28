const express = require('express')
const multer = require('multer')
const cats = require('./cats')
const auth = require('./auth')
const { storage } = require('../utils/multerOptions')
const { isLoggedIn } = require('../middlewares/authentication')

const router = express.Router()

const upload = multer({ storage: storage('cats') })

router.get('/', isLoggedIn, cats.getPresentCat)
router.post('/', cats.signUp)
router.post('/login', auth.jwtLogIn)
router.post('/upload', isLoggedIn, upload.single('image'), cats.uploadImg)
router.get('/all', cats.getAllCat)

module.exports = router