const tagModel=require('../models/tagModel')

const createTag=async function(req,res){
    let detail=req.body
    let savedTag=await tagModel.create(detail)
    return res.status(200).send({status:true,'tag':savedTag})
}

const tagList=async function(req,res){
    let list=await tagModel.find()
    return res.status(200).send({status:true,"list":list})
}

module.exports={createTag,tagList}