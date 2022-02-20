const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const postSchema = mongoose.Schema({
    user_id: {
        type: ObjectId,
        refs: 'hUser',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    time: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('hPost', postSchema)