const express = require('express')

const POSTUSER = require('../model/post')

const router = express.Router()

const middle = require('../middleware/details')


//create Post

router.post("/createPost",middle,(req,res)=>{
    const {
        title,
        body,
        pic
    } = req.body

    if(!title || !body || !pic){
        return res.json({msg:"Fill All The Fields"})
    }

    req.user.password = undefined

    const postSave = new POSTUSER({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })

    postSave.save().then((data)=>{
        res.json({
            post:data
        })
    })

})



//display myPost
router.get('/myPost',middle,(req,res)=>{
    POSTUSER.find({postedBy:req.user._id})
    .populate("PostedBy","_id name")
    .then((myPost)=>{
        res.json({myPost:myPost})
    })
})


//display All post
router.get('/allPost',middle,(req,res)=>{
    POSTUSER.find()
    .populate("postedBy","_id  name")
    .populate("comment.postedBy", "_id name")
    .then((data)=>{
        res.status(202).json({
            post:data
        })
    })
})

router.put("/Like",middle,(req,res)=>{
    POSTUSER.findByIdAndUpdate(req.body.postId,{
        $push:{Likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(202).json(err)
        }
        else{
            res.json(result)
        }
    })
})

router.put("/unLike",middle,(req,res)=>{
    POSTUSER.findByIdAndUpdate(req.body.postId,{
        $pull:{Likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(202).json(err)
        }
        else{
            res.json(result)
        }
    })
})


router.put("/comment",middle,(req,res)=>{
    const comments = {
        text:req.body.text,
        postedBy:req.user._id
    }
    POSTUSER.findByIdAndUpdate(req.body.postId,{
        $push:{comment:comments} 
    },{
        new:true  
    })
    .populate("comment.postedBy", "_id name")
    .exec((err,result)=>{
        if(err){
            res.status(400).json({
                err 
            })
        }
        else{
            res.status(200).json({
                result 
            })
        }
    })
})


router.delete("/delete:id",middle,(req,res)=>{
    POSTUSER.findOne({_id:req.params.id})
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err){
            res.status(400).json({err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then((result)=>{
                if(result){
                    res.status(200).json({
                        result
                    })
                }
                else{
                    res.status(400).json({
                       err
                    })
                }
            })
        }
    })
})



module.exports = router