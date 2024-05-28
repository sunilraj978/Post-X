const express = require('express')
const User = require('../model/user')
const router = express.Router()
const bycrypt = require('bcrypt')
const middleware = require('../middleware/details')
const jwt = require('jsonwebtoken')
const {JWT} = require('../const/key')

//Sign Up
router.post('/signUp',(req,res)=>{
    const{
        name,email,password,ProfilePic
    } = req.body

    if(!name || !email || !password || !ProfilePic){
       return res.status(422).json({
            error:"Please fill all fields"
        })
    }

    User.findOne({email:email}).then((data)=>{
       if(data){
        return res.status(404).json({
            message:"User Already Exists"
        })  
       }

      bycrypt.hash(password,12).then(passwords=>{
        const user = new User({
            email,name,password:passwords,ProfilePic
        })
 
        user.save().then((response)=>{
            if(response){
                res.json({message:"Saved Successfully"})
            }
        })
      })

    })

    })



//Login
router.post('/Login',(req,res)=>{
    const {
        email,password
    } = req.body;

    if(!email || !password){
        return res.status(404).json({
            error:"Please Fill All Fields"
        })   
    }
    User.findOne({email:email}).then((savedData)=>{
        if(!savedData){
            return res.status(404).json({error:"Email or Password are incorrect"})
        }
        bycrypt.compare(password,savedData.password).then((correct)=>{
            if(!correct){
                return res.status(404).json({error:"Email or Password are incorrect"})
            }
            else{
                const token = jwt.sign({ _id:savedData._id},JWT)
                const {_id,email,name,following,followers,ProfilePic} = savedData
                res.json({token,user:{_id,name,email,following,followers,ProfilePic}})
            }
        })
    })
})    






module.exports = router
