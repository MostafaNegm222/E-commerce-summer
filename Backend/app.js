require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const productRouter = require("./routes/product.route")
const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")
const globalError = require("./middlewares/globalError")

const app = express()
app.set("query parser" , "extended")

app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    origin: ['http://localhost:4200','https://e-commerce-app-nine-ivory.vercel.app']
}))


app.get("/",(req,res) => {
    res.status(200).json({
        success : true ,
        message : "Welcome to server"
    })
})


app.use("/auth",authRouter)
app.use("/products",productRouter)
app.use("/users",userRouter)


app.use((req,res) => {
    res.status(404).json({
        success :false ,
        message : "404 page not found"
    })
})

app.use(globalError)


module.exports = app