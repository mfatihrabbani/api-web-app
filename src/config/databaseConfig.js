import Sequelize from "sequelize"

const sequelize = new Sequelize("users", "root", "root",{
    "host": "localhost",
    "dialect": "mysql"
})

try {
    sequelize.connect()
    console.log("Database Connect")
} catch (error) {
    console.log(error)
}

export default sequelize