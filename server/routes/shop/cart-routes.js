const express = require('express');
const {
    deleteCartItems,
    addToCart,
    fetchCartItems,
    updateCartItems
} = require('../../controllers/shop/cartController.js');
const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems);
router.put('/update-cart', updateCartItems);
router.delete('/delete/:userId/:productId', deleteCartItems);

module.exports = router;
