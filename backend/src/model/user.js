const mongoose = require('mongoose')

const {ObjectId} =  mongoose.Schema.Types 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    following:[{
        type:ObjectId,
        ref:"User"
    }],
    followers:[{
        type:ObjectId,
        ref:"User"
    }],
    ProfilePic:{
        type:String,
        required:true
    }
})

const user = mongoose.model("User",userSchema)

module.exports = user
