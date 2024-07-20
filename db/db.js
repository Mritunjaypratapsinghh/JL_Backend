const mongoose = require("mongoose")
const { dbUrl, dbName } = require("../urlLinks")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${dbUrl}/${dbName}`)
        if(connectionInstance) console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Database Connection Error :",error)
    }
}

module.exports = connectDB