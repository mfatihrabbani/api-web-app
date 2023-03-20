import Sequelize from "sequelize"
import config from "../environment.js"

const sequelize = new Sequelize(config.db.databaseName, config.db.username, config.db.password,{
    "host": config.db.host,
    "dialect": config.db.databaseProvider
})

try {
    sequelize.connect()
    console.log("Database Connect")
} catch (error) {
    console.log(error)
}

export default sequelize
