import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import AppError from '../utlis/appError.js';

const AdminController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  updateUserRole: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      user.role = req.body.role;
      await user.save();

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log(req.params.userId)

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      await Product.findByIdAndDelete(req.params.userId);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (req, res, next) => {
    const { name, price, category, rating = 0, isFavorite = false } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required',
      });
    }

    const imageUrl = `/assets/images/${req.file.filename}`;
    console.log(imageUrl)

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required',
      });
    }

    try {
      const newProduct = new Product({
        name,
        price,
        category,
        image: imageUrl,
        rating,
        isFavorite,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: savedProduct,
      });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    const { productId } = req.params;
    const updatedData = { ...req.body };

    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (req.file) {
        const imageUrl = `/assets/images/${req.file.filename}`;
        console.log(imageUrl)
        updatedData.image = imageUrl;
      }

      Object.assign(product, updatedData);

      await product.save();

      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product,
      });
    } catch (error) {
      next(error);
    }
  },


  // Fetch all products
  getAllProducts: async (req, res, next) => {
    try {
      console.log("fetching   products")
      const products = await Product.find(); // Fetch all products from DB
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productId);
      console.log(product)
  
      if (!product) {
        return next(new AppError('Product not found', 404));
      }
  
      await Product.findByIdAndDelete(req.params.productId); // Use findByIdAndDelete instead of product.remove()
  
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },
  

};

export default AdminController;
