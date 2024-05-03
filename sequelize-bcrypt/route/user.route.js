const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

router.get('/', async (req, res) => {
    const userController = new UserController();
    await userController.getAllUsers(req, res);
});

router.get('/:id', async (req, res) => {
    const userController = new UserController();
    await userController.getUserById(req, res);
});

router.post('/', async (req, res) => {
    const userController = new UserController();
    await userController.createUser(req, res);
});

router.put('/:id', async (req, res) => {
    const userController = new UserController();
    await userController.updateUser(req, res);
});

router.delete('/:id', async (req, res) => {
    const userController = new UserController();
    await userController.deleteUser(req, res);
});

router.post('/login', async (req, res) => {
    const userController = new UserController();
    await userController.login(req, res);
});

module.exports = router;