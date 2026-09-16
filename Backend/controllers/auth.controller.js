const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const {promisify} = require("util")
const User = require("../models/user.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");
const template = require("../utils/emailTemplate");

const jwtSign = promisify(jwt.sign)

exports.signup = catchAsync(async (req,res,next) => {
    const {email,password,name,image} = req.body
    // email if email exist
    const findUser = await User.findOne({email,isDeleted:false})
    if(findUser) return next(new AppError(400,`This email is already used`))
    // hash password
    const hashPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
    // generate otp 
    const { nanoid } = await import("nanoid");
    const otp = nanoid.customAlphabet("0123456789",6)()
    const confirmOTP = await bcrypt.hash(otp,+process.env.SALT_ROUNDS)
    const OTPExpired = Date.now() + 10 * 60 * 1000 
    // save user in database 
    const user = await User.create({email,name,image,password:hashPassword,confirmOTP,OTPExpired})
    // send otp to email
    sendEmail(email,"Confirm Email",template(otp,name,"Confirm Email"))

    user.isDeleted = undefined
    user.confirmOTP = undefined
    user.OTPExpired = undefined
    user.password = undefined

    res.status(201).json({
        success : true ,
        data : user
    })
})

exports.confirmEmail = catchAsync(async (req,res,next) => {
    const {email,confirmOTP} = req.body 
    // check if email is exist 
    const findUser = await User.findOne({isDeleted:false,email})
    if(!findUser) return next(new AppError(400,`This email doesn't exist please signup first!`))
    // check if email is active
    if(findUser.isConfirmed) return next(new AppError(400,`This email is already active`))
    // check otp 
    const check = await bcrypt.compare(confirmOTP,findUser.confirmOTP)
    if(!check || !confirmOTP || findUser.OTPExpired < Date.now()) return next(new AppError(400,`Invalid OTP or Expired`)) 
    findUser.isConfirmed = true 
    findUser.confirmOTP = undefined 
    findUser.OTPExpired = undefined 
    await findUser.save()
    res.status(200).json({
        success : true ,
        message : `Email is confirmed please login`
    })
})


exports.login = catchAsync(async (req,res,next) => {
    const {email,password} = req.body 
    const findUser = await User.findOne({isDeleted:false,email}).select("+password")
    if(!findUser) return next(new AppError(400, `Invalid Credential`))
    if(!findUser.isConfirmed) return next(new AppError(400, `This email isn't confirm please confirm first !`))
    const check = await bcrypt.compare(password,findUser.password)
    if(!check) return next(new AppError(400, `Invalid Credential`))
    const token = await jwtSign({_id:findUser._id,role:findUser.role},process.env.SECRET_KEY,{expiresIn:"7d"})
    res.status(200).json({
        success : true ,
        data : {
            accessToken : token
        }
    })
})


exports.forgetPassword = catchAsync(async (req,res,next) => {
    const {email} = req.body 
    const findUser = await User.findOne({isDeleted:false,email})
    if(!findUser) return next(new AppError(404,'this email is not found'))
    const resetToken = await crypto.randomBytes(32).toString("hex")
    findUser.resetToken = resetToken
    await findUser.save()
    const link = `http://localhost:4200/auth/reset-password/${resetToken}`
    sendEmail(email,"Reset Password",template(link,findUser.name,"Reset Password"))
    res.status(200).json({
        success : true ,
        message : 'link sent to email'
    })
})


exports.resetPassword = catchAsync(async(req,res,next) => {
    const {token} = req.params 
    const {password} = req.body 
    const findUser = await User.findOne({isDeleted:false,resetToken:token})
    if(!findUser) return next(new AppError(400,`The rest Token is invalid or expired`))
    if(password.length < 6) return next(new AppError(400,`password must be 6 char or more`))
    const hashPassword = await bcrypt.hash(password,+process.env.SALT_ROUNDS)
    findUser.password = hashPassword
    findUser.resetToken = undefined 
    await findUser.save()
    res.status(200).json({
        success : true ,
        message : "password is reset successfully"
    })
})

exports.getMe = catchAsync(async (req,res,next) => {
    res.status(200).json({
        success : true ,
        data : req.user
    })
})