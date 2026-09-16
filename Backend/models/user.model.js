const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name : {
        type :String ,
        required : true ,
        minLength : [3,"name is must be 3 char or more"],
        maxLength : [30,"name is must be below 30 char"],
    },
    email : {
        type :String ,
        required : true ,
        unique : true,
        minLength : [3,"email is must be 3 char or more"],
    },
    password : {
        type :String ,
        required : true ,
        minLength : [6,"password is must be 6 char or more"],
        select : false
    },
    image : {
        type :String
    },
    role : {
        type : String ,
        enum : ["user" , "admin"] ,
        default : "user"
    },
    confirmOTP : {
        type : String 
    },
    OTPExpired : {
        type : Date
    },
    isConfirmed : {
        type : Boolean ,
        default : false
    },
    resetToken : {
        type : String
    },
    isDeleted : {
        type : Boolean ,
        default : false 
    },
    deletedAt : {
        type : Date
    }
}, {
    timestamps : true ,
    versionKey : false
})

const User = mongoose.model("user" , userSchema)

module.exports = User