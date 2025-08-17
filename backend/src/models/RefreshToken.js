const mongoose = require("mongoose")

const refreshToken = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        index : true
    },
    tokenHash:{
        type:String,
        required:true,
        index:true
    },
    userAgent:{
        type:String
    },
    ip:{
        type:String
    },
    expiresAt:{
        type:Date,
        required:true,
        index:true
    },
    revokedAt:{
        type:Date,
        default:null
    },
},{timestamps:true})

module.exports = mongoose.model("RefreshToken",refreshToken)