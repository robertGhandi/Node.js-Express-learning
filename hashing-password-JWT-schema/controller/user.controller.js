const User = require('../models/user.Models')
const bcrypt = require('bcrypt')

// function to check if the user with the given email already exists
const checkExistingUser = async (email) => {
    return User.findOne({ email })
}

// Signup function for user registration
const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        // validation for required input fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'invalid input', message: 'please enter username, email and password'})
        }

        // check if user with the same email already exists
        const existingUser = await checkExistingUser(email)

        if (existingUser) {
            return res.status(400).json({ message: 'user already exists'})
        }

        // create a new user
        const newUser =  await User.create({
            username,
            email,
            password
        })

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: newUser
        })
    } catch (err) {
        next(err) // Pass the error to the error-handling middleware
    }
}

// Login function for user authentication
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // find user by email
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        // compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid password'})
        }

        // Generate jwt token
        const token = user.generateAuthToken()

        res.status(200).json({ success: true, token })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    signUp,
    loginUser
}