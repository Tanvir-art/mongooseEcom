import { Request, Response } from 'express';
// import Joi from 'joi';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDb(req.body);
  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    data: result,
  });
};

const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProducts();

  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProducts(productId);
  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: result,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await ProductServices.updateProductInDb(productId, req.body);
  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDb(productId);

  if (result) {
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: null,
    });
  }
};

const searchText = async (req: Request, res: Response) => {
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
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchText,
};
