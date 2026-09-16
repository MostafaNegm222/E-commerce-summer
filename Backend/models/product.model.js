const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        unique : true ,
        minLength : [3,'name must be 3 char or more'],
        maxLength : [30,'name must be below 30 char'],
    },
    price : {
        type : Number,
        required : true ,
        min : [1,'price must positive value'],
    },
    image : {
        type : String ,
        required : true ,
        minLength : [3,'image must be 3 char or more'],
    },
    category : {
        type : String ,
        required : true ,
        enum : ["clothes" , "sports" , "electronics"],
    },
    description : {
        type : String ,
        required : true ,
        minLength : [3,'name must be 3 char or more'],
    },
    isDeleted : {
        type : Boolean ,
        default : false,
        select : false
    },
    deletedAt : {
        type : Date,
        select : false
    }
} , {
    timestamps : true ,
    versionKey : false
})

const Product = mongoose.model('product',productSchema)

module.exports = Product