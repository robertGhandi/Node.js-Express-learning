const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email : {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
});

User.beforeCreate(async (user, options) => {
    try {
        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
    } catch (err) {
        throw new Error(err);
    }
});

User.beforeUpdate(async (user, options) => {
    try {
        
        if (user.changed('password')) {
            const hashPassword = await bcrypt.hash(user.password, 10);
            user.password = hashPassword;
        }
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = User;