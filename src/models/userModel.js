const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            }, message: 'email should be a valid email id'
        },
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    profileImage: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



module.exports = mongoose.model('hUser', userSchema)