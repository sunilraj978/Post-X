const jwt = require('jsonwebtoken')
const {JWT} = require('../const/key')
const mongoose = require('mongoose')

const User = require('../model/user')

module.exports = (req,res,next)=>{
    const { authorization } = req.headers
    if(!authorization){
        return res.status(401).json({msg:"Need to Login"})
    }

    const tokens =  authorization.replace("abcd ","")
    jwt.verify(tokens,JWT,(err,payload)=>{
        if(err){
            return res.status(401).json({msg:"Something went Wrong"})
        }
        const {_id} = payload

        User.findById(_id).then((userdata)=>{
            req.user = userdata
            next()
        })
    })
    
}