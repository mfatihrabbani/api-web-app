import sequelize from "../config/databaseConfig.js";
import { DataTypes } from "sequelize";

const ForgotPassword = sequelize.define("forgot_password", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})


ForgotPassword.sync({alter: false})

export default ForgotPassword



