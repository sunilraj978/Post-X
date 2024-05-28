const express = require('express')
const POSTUSER = require('../model/post')
const router = express.Router()
const User = require('../model/user')
const mongoose = require('mongoose')
const middle = require('../middleware/details')


router.get('/user:userId',middle,(req,res)=>{
    User.findOne({_id:req.params.userId})
    .select("-password")
    .then(user=>{
        POSTUSER.find({postedBy:req.params.userId})
        .populate("postedBy" ,"_id name")
        .exec((err,post)=>{
            if(err){
                res.status(200).json({error:err})
            }
            res.status(200).json({user,post})
        })
    })
})


router.put('/follow',middle,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new:true},(err,result)=>{
        if(err){
            res.status(400).json({message:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{new:true})
        .then(user=>{
            res.json({user})
        })
    })
})





router.put('/Unfollow',middle,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{new:true},(err,result)=>{
        if(err){
            res.status(400).json({message:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{new:true})
        .then(user=>{
            res.json({user})
        })
    })
})


module.exports = router