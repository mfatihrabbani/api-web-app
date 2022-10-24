import sequelize from "../config/databaseConfig.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define("users",{
    id_user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Users.sync({alter: false})

export default Users