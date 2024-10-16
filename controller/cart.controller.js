import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import AppError from '../utlis/appError.js';

// Add an item to the cart
export const addItemToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Use a session-based cart or generic cart (for unauthenticated users)
    let cart = req.session.cart || { items: [] }; 

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex >= 0) {
      // Update the quantity and total price if the item exists
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].quantity * product.price;
    } else {
      // Add a new item if not already in the cart
      cart.items.push({
        product: productId,
        quantity,
        totalPrice: product.price * quantity,
      });
    }

    // Save the cart to the session (for temporary storage, non-persistent)
    req.session.cart = cart;

    res.status(200).json({
      status: 'success',
      message: 'Item added to cart',
      data: { cart }
    });
  } catch (error) {
    next(error);
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req, res, next) => {
  const userId = req.user.id || req.user._id;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    // Remove the item from the cart
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
  const userId = req.user.id || req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    // Clear all items from the cart
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
  const userId = req.user.id || req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return next(new AppError('Quantity must be at least 1', 400));
  }

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return next(new AppError('Cart not found', 404));
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return next(new AppError('Item not found in cart', 404));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    // Update the quantity and total price
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = quantity * product.price;

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
  const userId = req.user.id || req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');

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
