const express = require('express');
const { fetchBrands } = require('../controllers/Brand');

const router = express.Router();

router.get('/',fetchBrands);

module.exports = router;