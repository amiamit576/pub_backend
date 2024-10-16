import express from 'express';
import { 
  getAllProducts, 
  getProductDetails, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controller/product.controller.js';

import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = express.Router();

// Product routes
router.get('/products', getAllProducts); 
router.get('/products/:id', getProductDetails); 
router.post('/products', isLoggedIn, createProduct); 
router.patch('/products/:id', isLoggedIn, updateProduct); 
router.delete('/products/:id', isLoggedIn, deleteProduct); 


export default router;
