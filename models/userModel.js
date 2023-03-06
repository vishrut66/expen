const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide your name!'],
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide valide Email']
    },
    password: {
        type: String,
        require: [true, 'please provide your password'],
        minlength: 6,
        select: false
    },
    profession: {
        type: String,
        required: [true, "please provide your profession"],
        trim: true,
        maxlength: 90,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

// hash the password middlerware
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

// generate jw token while login the user
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_E_TIME })
}


userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}


const User = mongoose.model('User', userSchema);

module.exports = User;