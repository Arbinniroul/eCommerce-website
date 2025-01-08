const Cart = require("../../models/Cart.js");
const Product = require("../../models/Products.js");

// Helper to populate cart items
const populateCartItems = (cart) => cart.items.map(item => ({
    productId: item.productId ? item.productId._id : null,
    image: item.productId ? item.productId.image : null,
    title: item.productId ? item.productId.title : 'Product Not Found',
    price: item.productId ? item.productId.price : null,
    salePrice: item.productId ? item.productId.salePrice : null,
    quantity: item.quantity
}));

// Helper to validate request fields
const validateFields = (fields) => {
    const { userId, productId, quantity } = fields;
    if (!userId || !productId || (quantity !== undefined && quantity <= 0)) {
        return 'User ID, product ID, and a valid quantity are required';
    }
    return null;
};

const addToCart = async (req, res) => {
    try {
        const validationError = validateFields(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }
        const { userId, productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let cartItem = await Cart.findOne({ userId });
        if (!cartItem) {
            cartItem = new Cart({ userId, items: [] });
        }

        const itemIndex = cartItem.items.findIndex(i => i.productId.toString() === productId);
        if (itemIndex > -1) {
            cartItem.items[itemIndex].quantity += quantity;
        } else {
            cartItem.items.push({ productId, quantity });
        }

        await cartItem.save();
        res.status(200).json({ success: true, message: 'Product added to cart successfully', data: cartItem });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ success: false, message: 'Failed to add product to cart' });
    }
};

const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false, 
                message: 'User ID is mandatory!'
            });
        }

        const cartItem = await Cart.findOne({ userId })
            .populate({ 
                path: 'items.productId', 
                select: 'image title price salePrice' 
            });

        if (!cartItem) {
            return res.status(404).json({
                success: false, 
                message: 'Cart not found for this user'
            });
        }

        // Filter out null or undefined products
        const validItems = cartItem.items.filter(item => item.productId);
        
        res.status(200).json({
            success: true,
            message: 'Cart fetched successfully',
            data: {
                ...cartItem._doc, 
                items: validItems
            }
        });
    } catch (error) {
        console.error('Fetch cart items error:', error);
        res.status(500).json({
            success: false, 
            message: 'Failed to fetch cart items'
        });
    }
};

const updateCartItems = async (req, res) => {
    try {
        const validationError = validateFields(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }
        const { userId, productId, quantity } = req.body;

        const cartItem = await Cart.findOne({ userId });
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart not found for this user' });
        }

        const itemIndex = cartItem.items.findIndex(i => i.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Product not found in cart' });
        }

        cartItem.items[itemIndex].quantity = quantity;
        await cartItem.save();
        await cartItem.populate({ path: 'items.productId', select: 'image title price salePrice' });

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            data: { ...cartItem._doc, items: populateCartItems(cartItem) }
        });
    } catch (error) {
        console.error('Update cart items error:', error);
        res.status(500).json({ success: false, message: 'Failed to update cart items' });
    }
};

const deleteCartItems = async (req, res) => {
    try {
        
        const { productId,userId } = req.params;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: 'User ID and product ID are required' });
        }

        const cart = await Cart.findOne({ userId }).populate({ path: 'items.productId', select: 'image title price salePrice' });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found for this user' });
        }

        // Remove the item with the given productId
        cart.items = cart.items.filter(item => item.productId && item.productId._id.toString() !== productId);

        // Save the updated cart
        await cart.save();

        // Fetch the updated cart and ensure valid items are present
        await cart.populate({ path: 'items.productId', select: 'image title price salePrice' });

        // Filter out invalid items again if any were present
        const validItems = cart.items.filter(item => item.productId);

        // Send the response with updated cart items
        res.status(200).json({
            success: true,
            message: 'Cart item deleted successfully',
            data: { ...cart._doc, items: validItems }
        });
    } catch (error) {
        console.error('Delete cart items error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete cart items' });
    }
};

module.exports = { addToCart, fetchCartItems, updateCartItems, deleteCartItems };
