const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    } ,
    email:{
        type:String,
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("user",userSchema)
