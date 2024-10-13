import express from 'express';
import { 
  getAllProducts, 
  getProductDetails, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controller/product.controller.js';

import { 
  addItemToCart, 
  removeItemFromCart, 
  clearCart, 
  updateItemQuantity, 
  getCart 
} from '../controller/cartController.js'; 

import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

// Product routes
router.get('/products', getAllProducts); 
router.get('/products/:id', getProductDetails); 
router.post('/products', isLoggedIn, createProduct); 
router.patch('/products/:id', isLoggedIn, updateProduct); 
router.delete('/products/:id', isLoggedIn, deleteProduct); 

// Cart routes
router.post('/cart', isLoggedIn, addItemToCart); 
router.get('/cart', isLoggedIn, getCart); 
router.patch('/cart/:productId', isLoggedIn, updateItemQuantity); 
router.delete('/cart/:productId', isLoggedIn, removeItemFromCart); 
router.delete('/cart', isLoggedIn, clearCart);

export default router;
