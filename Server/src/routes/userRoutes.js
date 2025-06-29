const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

// Sample GET route
router.get('/', getUsers);

module.exports = router;
