import AppError from '../utlis/appError.js';
import Product from '../models/product.model.js';

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', results: products.length, data: { products } });
  } catch (error) {
    next(error);
  }
};

// Get product details
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    res.status(200).json({ status: 'success', data: { product } });
  } catch (error) {
    next(error);
  }
};

// Create a new product (Admin only)
export const createProduct = async (req, res, next) => {
  try {
    const { name, image, price, category, rating, isFavorite } = req.body;
    const newProduct = await Product.create({ name, image, price, category, rating, isFavorite });

    res.status(201).json({ status: 'success', data: { product: newProduct } });
  } catch (error) {
    next(error);
  }
};

// Update product details (Admin only)
export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, image, rating, isFavorite } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, image, rating, isFavorite },
      { new: true, runValidators: true }
    );

    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    res.status(200).json({ status: 'success', message: 'Product updated successfully', data: { product } });
  } catch (error) {
    next(error);
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    res.status(204).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
