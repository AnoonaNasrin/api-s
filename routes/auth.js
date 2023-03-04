const router = require('express').Router()
const { register, login  , resetPassword,forgetPassword , userName} = require("../controller/authController");

router.post('/login',login)
router.post('/register',register)
router.post('/reset' , resetPassword )
router.post('/forget', forgetPassword)
router.post('/user', userName)

module.exports = router;