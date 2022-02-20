const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const userTagSchema = new mongoose.Schema({

    user_id: {
        type: ObjectId,
        refs: 'hUser',
        required: true
    },
    tag_id: {
        type: ObjectId,
        refs: 'tag',
        required: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

module.exports = mongoose.model('userTag', userTagSchema)