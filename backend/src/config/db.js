const mongooose = require("mongoose")


const connectDB = async ()=>{
    try {
        const conn = await mongooose.connect(process.env.MONGO_URI)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Mongodb connection field: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB ;