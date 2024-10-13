import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import AppError from '../utils/appError.js'; // Assuming you have an AppError utility for handling errors

// Add an item to the cart or update its quantity
export const addItemToCart = async (req, res, next) => {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    let cart = await Cart.findOne({ user: userId });

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
      // Update the quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add a new item if not in the cart
      cart.items.push({
        product: productId,
        quantity,
        totalPrice: product.price * quantity,
      });
    }

    await cart.save();
    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      data: { cart }
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req, res, next) => {
  const { userId } = req.user;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    // Remove item
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Item removed from cart',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// Clear the cart
export const clearCart = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    // Clear all items
    cart.items = [];
    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Cart cleared',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// Update the quantity of an item in the cart
export const updateItemQuantity = async (req, res, next) => {
  const { userId } = req.user;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return next(new AppError('Quantity must be at least 1', 400));
  }

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    // Update the quantity and total price
    cart.items[existingItemIndex].quantity = quantity;
    cart.items[existingItemIndex].totalPrice = quantity * cart.items[existingItemIndex].product.price;

    await cart.save();

    res.status(200).json({
      status: 'success',
      message: 'Quantity updated',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// Get the current cart for the user
export const getCart = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};
