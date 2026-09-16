const mongoose = require("mongoose")
const chalk = require("chalk")

async function connectDB () {
    try {
        const con = await mongoose.connect(process.env.PRODUCTION_DATABASE)
        console.log(chalk.bgRed(`Database is connected successfully ✅ in ${con.connection.name}`));
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDB