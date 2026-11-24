const mongoose = require("mongoose")
const chalk = require("chalk")

// Surface database outages to requests in 5 seconds instead of the
// default 10 seconds of silent buffering.
mongoose.set("bufferTimeoutMS", 5000)

// Reuse one connection across serverless invocations on Vercel
let cached = global.mongooseConnection

async function connectDB() {
    if (cached) return cached
    try {
        cached = await mongoose.connect(process.env.PRODUCTION_DATABASE, {
            serverSelectionTimeoutMS: 5000,
        })
        global.mongooseConnection = cached
        console.log(chalk.bgRed(`Database is connected successfully ✅ in ${cached.connection.name}`));
        return cached
    } catch (error) {
        cached = null
        console.error("Database connection failed:", error.message)
    }
}

module.exports = connectDB
