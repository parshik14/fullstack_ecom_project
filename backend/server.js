const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp")
const connectDB = require("./src/config/db")

require("dotenv").config();

const app = express()

connectDB()


// middlewares
app.use(cors(),morgan("combined"),helmet())
app.disable("x-powered-by")


//Routes
app.get("/",(req,res)=>{
    res.status(200).send("server us started")
})


//Global error handler
app.use((err,req,res,next)=>{
    console.error("Error : ", err.stack)
    res.status(500).json({ error: "Something went wrong!" });
})


//start server
app.listen(process.env.PORT || 8080,()=>{
    console.log("server is stareted");
})

//handle unhandled promises and rejection
process.on("unhandledRejection",(reason,promise)=>{
    console.error("unhandle Rejection : ",reason)
    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});