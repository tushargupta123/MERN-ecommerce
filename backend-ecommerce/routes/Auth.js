const express = require('express');
const { loginUser, createUser } = require('../controllers/Auth');

const router = express.Router();

router.post('/signup',createUser);
router.post('/login',loginUser);

module.exports = router;