import express from 'express';
import { 
    addItemToCart, 
    removeItemFromCart, 
    clearCart, 
    updateItemQuantity, 
    getCart 
  } from '../controller/cart.controller.js'; 
  
  import { isLoggedIn } from '../middleware/auth.middleware.js';

  const router = express.Router();


  
// Cart routes
router.post('/cart',isLoggedIn,addItemToCart); 
router.get('/cart', isLoggedIn, getCart); 
router.patch('/cart/:productId', isLoggedIn, updateItemQuantity); 
router.delete('/cart/:productId', isLoggedIn, removeItemFromCart); 
router.delete('/cart', isLoggedIn, clearCart);

export default router;