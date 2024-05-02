const User = require('../model/user');

const createUser = async (req, res) => {
    
    try {
        const { name, email } = req.body;

        if (!name) {
            console.log('name is needed to create user');
        } else {
            const user = await User.create({ name, email });
            res.status(201).json({ 
            message: 'user successfully created',
            data: user
        });
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'unable to create user',
            error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: 'unable to retrieve Users info',
            error: error.message
        });
    }
};

const getSingleUser = async (req, res) => {
   
    try {
        const { id } = req.params
        const user = await User.findByPk(id)

        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).send(`no user with id:${id}`)
        }
       
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    
    try {
        const { id } = req.params;
        const user = await User.findByPk(id)

        if (user) {
            await user.update(req.body)
            res.json(user);
        } else {
            res.status(404).send('user not found');
        }
    } catch (error) {
        res.json(error.message);
    }
};

const deleteUser = async (req, res) => {
    
    try {
        const { id } = req.params;
        const user = await User.findByPk(id)

        if (user) {
            await user.destroy({ where: { id: id } });
            res.status(200).send('user deleted successfully')
        } else {
            res.status(404).send('user not found')
        }
        
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};