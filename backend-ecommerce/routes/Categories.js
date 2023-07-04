const express = require('express');
const { fetchCategories } = require('../controllers/Category');

const router = express.Router();

router.get('/',fetchCategories);

module.exports = router;