require('dotenv').config();
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'registration completed', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'user not found or incorrect username' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password'});
        } 

        const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
        res.status(200).json({ message: 'login successful', token })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { register, login };