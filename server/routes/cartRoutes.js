const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addToCart);
router.get('/get', authMiddleware, getCart)

module.exports = router;
