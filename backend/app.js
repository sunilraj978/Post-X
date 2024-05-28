//express
const express = require('express')
//app
const app = express()
//mogoDb connection
const mongoose = require('./src/mongoConnection/db')
// Mongoose Models
const user = require('./src/model/user')
const create = require('./src/model/post')
//middleware for post 
app.use(express.json())
//router
const route = require('./src/routers/routes')
const post = require('./src/routers/post')
const users = require('./src/routers/user')
app.use(route)
app.use(post)
app.use(users)





app.get('/s',(req,res)=>{
    res.send("Home Page")
})

app.listen(5000,()=>{
    console.log("This is connected to port 5000")
})