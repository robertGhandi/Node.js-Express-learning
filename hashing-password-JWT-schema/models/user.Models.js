const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'enter username']
    },
    email: {
        type: String,
        required: [true, 'enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter password']
    },
},
    { timestamps: true, versionKey: false }
)

// Hash password before saving
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

// Generate jwt token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User