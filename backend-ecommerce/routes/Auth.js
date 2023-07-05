const express = require('express');
const { createUser } = require('../controllers/User');
const { loginUser } = require('../controllers/Auth');

const router = express.Router();

router.post('/signup',createUser);
router.post('/login',loginUser);

module.exports = router;