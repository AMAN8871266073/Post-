const express=require('express')
const userController=require('../controllers/userController')
const tagController=require('../controllers/tagController')
const userTagController=require('../controllers/userTagController')
const postController=require('../controllers/postController')

const router=express.Router()

router.post('/registerUser',userController.createUser)
router.post('/login',userController.login)

router.post('/registerTag',tagController.createTag)
router.get('/tagList',tagController.tagList)

router.post('/registerUserTag',userTagController.createUserTag)

router.post('/createPost',postController.createPost)


module.exports=router