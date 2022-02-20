const userModel = require('../models/userModel')
const aws = require("aws-sdk");
const jwt = require("jsonwebtoken")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRRMC6253G",  // id
    secretAccessKey: "88NOFLHQrap/1G2LqUy9YkFbFRe/GNERsCyKvTZA",  // like your secret password
    region: "ap-south-1" // Mumbai region
});


// this function uploads file to AWS and gives back the url for the file
let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" });
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "user/" + file.originalname,
            Body: file.buffer,
        };


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            console.log(data)
            console.log(`File uploaded successfully. ${data.Location}`);
            return resolve(data.Location); //HERE 
        });
    });
};

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createUser = async function (req, res) {
    try {
        const file = req.files
        console.log(file)
        if (file && file.length > 0) {
            var uploadedFileURL = await uploadFile(file[0]);
            // return uploadedFileURL;
        }
        else {
            res.status(400).send({ status: false, msg: "No file to write" });
        }
        let requestBody = req.body
        let data = {
            name: requestBody.name,
            password: requestBody.password,
            email: requestBody.email,
            profileImage: uploadedFileURL,
        }

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide blog details' })
            return
        }
        if (!isValid(data.name)) {
            res.status(400).send({ status: false, message: 'first name is required' })
            return
        }
        if (!isValid(data.email)) {
            res.status(400).send({ status: false, message: 'first name is required' })
            return
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        if (!isValid(data.password)) {
            res.status(400).send({ status: false, message: 'first name is required' })
            return
        }
        let isEmailAlreadyExist = await userModel.findOne({ email: data.email })
        if (isEmailAlreadyExist) {
            return res.status(200).send({ status: true, 'msg': "document already exist with given email" })
        }
        let savedUser = await userModel.create(data)
        return res.status(201).send({ status: true, 'data': savedUser })


    } catch (err) {
        console.log('error is ' + err)
    }
}

//////////////////////////////////////////////////////////////////////////

const login = async function (req, res) {
    try {
        const requestBody = req.body
        const email = requestBody.email
        const password = requestBody.password
        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide blog details' })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, message: 'email id required' })
            return
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        if (!isValid(password)) {
            res.status(400).send({ status: false, message: 'password is required' })
            return
        }

        let checkUser = await userModel.findOne({ email: email, password: password })
        if (!checkUser) {
            return res.status(404).send({ status: false, 'msg': 'document doesnot exist with given credentials' })
        }
        let token = jwt.sign({ id: checkUser._id }, 'AmanTandon');
        return  res.status(200).send({ status: true, 'message': "User login successfull", 'data': { 'token': token, "id": checkUser._id } })

    } catch (err) {
        res.status(500).send({ status: false, 'error': err })
    }
}

module.exports = { createUser,login }

