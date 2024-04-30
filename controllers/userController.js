const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



const registerUser = asyncHandler(async(req, res) =>{
    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }

    const isUserAvailable = await User.findOne({email})
    if(isUserAvailable){
        res.status(400)
        throw new Error(" User Already exist")
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({username,email,password: hashedPassword})
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user:user.username,
            email: user.email,
            id: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
      

})


const currentUser = asyncHandler(async (req, res) => {


})

module.exports = {
    registerUser,
    loginUser,
    currentUser
}