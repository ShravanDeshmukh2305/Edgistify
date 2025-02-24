const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentStatus } = req.body;
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name price' // Ensure price is included
      });

    console.log("Fetched Cart:", JSON.stringify(cart, null, 2)); // Debugging log

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const products = cart.items.map(item => {
      if (!item.product) {
        console.error("Missing product in cart item:", item);
        throw new Error("Product data is missing in the cart.");
      }

      if (item.product.price === undefined) {
        console.error("Price missing for product:", item.product);
        throw new Error("Product price is missing. Check database entries.");
      }

      totalPrice += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price  // Add price explicitly
      };
    });

    console.log("Processed Products:", JSON.stringify(products, null, 2)); // Debugging log

    const order = new Order({
      user: req.user.id,
      products,  
      totalPrice,
      shippingAddress,
      paymentStatus,
      orderStatus: 'Pending'
    });

    await order.save();
    await Cart.deleteOne({ user: req.user.id });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};
