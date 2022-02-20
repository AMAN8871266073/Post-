const userModel = require('../models/userModel')
const postModel = require('../models/postModel')

const createPost=async function(req,res){
    let requestBody=req.body
    let date=new Date()
    let data={
     user_id:requestBody.user_id,
     title:requestBody.title,
     description:requestBody.description,
     image:'xyz',
     time:date
    }
    let saved=await postModel.create(data)
    return res.status(201).send({status:true,"post":saved})
}


module.exports={createPost}