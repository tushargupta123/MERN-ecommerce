const express = require('express');
const { createOrder, fetchOrderByUser } = require('../controllers/Order');

const router = express.Router();

router.post('/',createOrder);
router.get('/',fetchOrderByUser);

module.exports = router;