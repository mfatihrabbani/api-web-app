import express from "express"
import bodyParser from "body-parser"
import usersApi from "./routes/usersRoute.js"

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(bodyParser.json())
app.use("/api/users", usersApi)

app.use("/", (err, req, res, next) => {
    if(err){
        console.log(err)
        const errorMessage = err.message || "Something Error"
        const statusCode = err.statusCode || 500
        res.status(statusCode).json({status: "Failed", message: errorMessage}) 
    }
})

app.listen(3001, () => {
    console.log("server start..")
})