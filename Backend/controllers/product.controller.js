const Product = require("../models/product.model")
const ApiFeatures = require("../utils/ApiFeatures")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")


exports.getAllProducts = catchAsync(async (req,res,next) => {
        console.log(req.query);
        
        let features = new ApiFeatures(Product.find({isDeleted : false}),req.query).filter().fields().sort().search().pagination()
        const products = await features.query    
        const productsCount = await Product.countDocuments({isDeleted:false,...features.filterQuery,...features.searchQuery})
        res.status(200).json({
            success :true ,
            productsCount ,
            results : products.length,
            data : products
        })
})

exports.getDeletedProducts = catchAsync(async (req,res,next) => {
    const products = await Product.find({isDeleted : true}).select("+isDeleted +deletedAt")
        res.status(200).json({
            success :true ,
            productCount : products.length ,
            data : products 
    })
})

exports.getStates = catchAsync(async (req,res,next) => {
    const states = await Product.aggregate([
        {$sort : {price : -1}},
        {$group : {
            _id : "$category",
            productsCount : {$sum : 1},
            minPrice : {$min : "$price"},
            maxPrice : {$max : "$price"},
            avgPrice : {$avg : "$price"},
            mostExpProduct : {$first : "$$ROOT"}
        }},
        {$project : {_id :0 , category : "$_id", productsCount : 1 , 
                    minPrice : 1 , maxPrice : 1 , avgPrice : 1 , mostExpProduct :1}}
    ])
    res.status(200).json({
        success : true ,
        data : states
    })
})



exports.getOneProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findOne({isDeleted:false,_id:req.params.id})
    if(!product) return next(new AppError(404,`No product found with this id ${req.params.id}`))
    res.status(200).json({
        success : true ,
        data : product
    })
})



exports.createProduct = catchAsync(async (req,res,next) => {
    // const product = new Product(req.body)
    // await product.save()
    const product = await Product.create(req.body)
    product.isDeleted = undefined
    res.status(201).json({
        success :true ,
        data : product
    })
})

exports.updateProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findOneAndUpdate({_id:req.params.id,isDeleted:false},
                                                    {...req.body},
                                                    {returnDocument:"after",runValidators:true})
    if(!product) return next(new AppError(404,`No product found with this id ${req.params.id}`))
    res.status(200).json({
        success : true ,
        data : product
    })
})

exports.softDeleteProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findOneAndUpdate({_id:req.params.id,isDeleted:false},{isDeleted:true,deletedAt:new Date()})
    if(!product) return next(new AppError(404,`No product found with this id ${req.params.id}`))
    res.status(200).json({
        success : true ,
        message : `Product is deleted successfully`
    })
})

exports.DeleteProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product) return next(new AppError(404,`No product found with this id ${req.params.id}`))
    res.status(204).send()
})

