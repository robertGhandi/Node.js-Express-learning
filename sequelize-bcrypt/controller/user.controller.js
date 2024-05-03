const bcrypt = require('bcrypt');
const User = require('../model/user');

class UserController {
    async getAllUsers(req, res) {
        const users = await User.findAll({});
        res.json(users);
    }

    async getUserById(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (user) {
            res.json(user);
        } else {
            res.status(404).send('user not found');
        }
    }

    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            res.json(user);
        } catch (error) {
            res.status(400).send(error.errors[0].message);
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const user = await User.findByPk(id)

        if (user) {
            try {
                await user.update(req.body)
                res.json(user)
            } catch (error) {
                res.status(400).send('user not found')
            }
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        await User.destroy({ where: { id }});
        res.send('user deleted')
    }

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }});

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                res.json(user);
            } else {
                res.status(401).send('Invalid password');
            }
        } else {
            res.status(404).send('User not found');
        }
    }
}

module.exports = UserController;