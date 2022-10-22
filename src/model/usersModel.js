import sequelize from "../config/databaseConfig";
import { DataType } from "sequelize";

const Users = sequelize.define({
    id_user: {
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    }
})

Users.sync({alter: true})

export default Users