const mongoose = require('mongoose')

const {ObjectId} =  mongoose.Schema.Types 

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    Likes:[{
        type:ObjectId,
        ref:"User"
    }],
    comment:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"

    }
})

const post = mongoose.model("POSTUSER",postSchema)

module.exports = post