const express = require('express')

const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userController.js')
const validateToken = require('../middlewares/validateTokenHandler.js')

const router = express.Router()

router.route('/register').post(registerUser) 

router.route('/login').post(loginUser) 

router.get('/current', validateToken, currentUser)


module.exports = router