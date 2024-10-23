import express from 'express';
import { isLoggedIn } from '../middleware/auth.middleware.js';
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from '../controller/cart.controller.js';

const router = express.Router();

// Route to get the current cart
router.get('/cart', isLoggedIn, getCart);

// Route to add an item to the cart
router.post('/addcart', isLoggedIn, addItemToCart); // Changed to /addcart

// Route to update the quantity of an item in the cart
router.put('/update/:productId', isLoggedIn, updateItemQuantity); // Kept as /cart/:productId

// Route to remove an item from the cart
router.delete('/remove/:productId', isLoggedIn, removeItemFromCart);

// Route to clear the cart
router.delete('/clear', isLoggedIn, clearCart);

export default router;
