const express = require('express');
const router = express.Router();
const User = require('../controller/userController')

router.post('/login',User.addUser);

module.exports = router;