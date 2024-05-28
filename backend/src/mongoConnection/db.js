

const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://sunilraj:sunildon@cluster0.i9pvm.mongodb.net/Instagram?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false}).then(()=>{
    console.log("Connected")
})

module.exports = mongoose
