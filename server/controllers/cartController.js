const Cart = require('../models/Cart');
const Product = require('../models/Product');


exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
   

    if (!product) return res.status(400).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [{ product: productId, quantity }]
      });
      await cart.save();
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price');

    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
