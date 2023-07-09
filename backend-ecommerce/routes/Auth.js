const express = require('express');
const { loginUser, createUser } = require('../controllers/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup',createUser);
router.post('/login',passport.authenticate('local'),loginUser);

module.exports = router;