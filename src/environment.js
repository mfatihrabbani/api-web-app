import dotenv from 'dotenv'
dotenv.config()

const environment = {
    server: {
        port: process.env.PORT
    },
    db: {
        databaseName: process.env.DATABASENAME, 
        host: process.env.HOSTNAMEDB,
        username: process.env.USERNAMEDB,
        password: process.env.PASSWORDDB,
        databaseProvider: process.env.DATABASEPROVIDER
    }
}

export default environment
