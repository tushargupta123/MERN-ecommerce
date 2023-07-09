const express = require('express');
const { loginUser, createUser, checkAuth } = require('../controllers/Auth');
const passport = require('passport');

const router = express.Router();

router.post('/signup',createUser);
router.post('/login',passport.authenticate('local'),loginUser);
router.get('/check',passport.authenticate('jwt'),checkAuth);

module.exports = router;