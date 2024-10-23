import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import AppError from '../utlis/appError.js';

// Fetch cart for authenticated user
export const getCart = async (req, res, next) => {
  const userId = req.user.id || req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price image');
  
    if (!cart) {
      return res.status(200).json({ success: true, data: { cart: [] } });
    }
    res.status(200).json({ success: true, data: { cart } });
  } catch (error) {
    next(new AppError('Failed to fetch cart', 500));
  }
};

// Add item to cart
export const addItemToCart = async (req, res, next) => {

  const userId = req.user.id || req.user._id;
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    console.log("product",product)
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    let cart = await Cart.findOne({ user: userId });
    console.log(cart)
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

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

    await cart.save();
 

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      data: { cart }
    });
  } catch (error) {
    next(new AppError('Failed to add item to cart', 500));
  }
};

// Remove item from cart
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
      success: true,
      message: 'Item removed from cart',
      data: { cart }
    });
  } catch (error) {
    next(new AppError('Failed to remove item from cart', 500));
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
      success: true,
      message: 'Cart cleared',
      data: { cart }
    });
  } catch (error) {
    next(new AppError('Failed to clear cart', 500));
  }
};

// Update item quantity in cart
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
      success: true,
      message: 'Quantity updated',
      data: { cart }
    });
  } catch (error) {
    next(new AppError('Failed to update item quantity', 500));
  }
};
