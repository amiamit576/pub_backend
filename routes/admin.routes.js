import express from 'express';
import upload from '../middleware/multer.middleware.js';
import AdminController from '../controller/admin.controller.js'; 
import { authorizeRoles,isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router();
router.get('/users',isLoggedIn, authorizeRoles('admin'), AdminController.getAllUsers); 
router.put('/users/:userId/role',isLoggedIn, authorizeRoles('admin'), AdminController.updateUserRole);  
router.delete('/users/:userId',isLoggedIn, authorizeRoles('admin'), AdminController.deleteUser); 


// Fetch all products
router.get('/products', isLoggedIn, authorizeRoles('admin'), AdminController.getAllProducts);
router.post(
  '/products',
  isLoggedIn,
  authorizeRoles('admin'),  
  upload.single('image'),   
  AdminController.createProduct 
);

router.put(
  '/products/:productId',
  isLoggedIn,
  authorizeRoles('admin'),  
  upload.single('image'),   
  AdminController.updateProduct 
);



// Delete a product
router.delete('/products/:productId', isLoggedIn, authorizeRoles('admin'), AdminController.deleteProduct);
export default router;
