import express from "express"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use("/api/users", usersApi)


app.listen(3001, () => {
    console.log("server start..")
})