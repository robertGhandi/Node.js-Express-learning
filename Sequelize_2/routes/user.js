const express = require('express');
const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser} = require('../controller/user');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;