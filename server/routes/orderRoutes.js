const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/place', authMiddleware, placeOrder);

module.exports = router;
