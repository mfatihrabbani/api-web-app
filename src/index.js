import express from "express"
import bodyParser from "body-parser"
import usersApi from "./routes/usersRoute.js"
import cors from "cors"
import config from "./environment.js"
console.log(config)
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use("/api/users", usersApi)

app.use("/", (err, req, res, next) => {
    if(err){
        console.log(err)
        const errorMessage = err.message || "Something Error"
        const statusCode = err.status || 500
        res.status(statusCode).json({status: "Failed", message: errorMessage}) 
    }
})

app.listen(config.server.port, () => {
    console.log("server start..")
})
