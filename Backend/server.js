const chalk = require("chalk")
const app = require("./app");
const connectDB = require("./config/connectDB.JS");
const {setServers} = require("dns/promises")
setServers(["8.8.8.8","8.8.4.4"])
app.set("query parser" , "extended")
connectDB()

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(chalk.bgBlue(`Server is running at port ${port}`));
})
