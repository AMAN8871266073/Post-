const userModel = require('../models/userModel')
const userTagModel = require('../models/userTagModel')


const createUserTag=async function(req,res){
    let data=req.body
    let saved=await userTagModel.create(data)
    return res.status(201).send({status:true,data:saved})
}



module.exports={createUserTag}