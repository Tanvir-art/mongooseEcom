import { Request, Response } from 'express';
import { ProductServices } from './product.service';
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await ProductServices.createProductIntoDb(product);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProducts(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { product } = req.body;
    const result = await ProductServices.updateProductInDb(productId, product);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDb(productId);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const searchText = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const products = await ProductServices.searchProdText(searchTerm as string);
    res.status(200).json({
      success: true,
      message: 'Products matching search term  fetched successfully!',
      data: products,
    });
  } catch (error) {
    console.error('Error searching products:', error);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchText,
};
