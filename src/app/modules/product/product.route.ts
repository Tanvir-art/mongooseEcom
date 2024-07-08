import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidation } from './product.validation';

const router = express.Router();

router.post(
  '/products',
  validateRequest(productValidation.productCreateValidation),
  ProductController.createProduct,
);

router.get('/products/search', ProductController.searchText); // Moved up

router.get('/products/:productId', ProductController.getSingleProduct);

router.put(
  '/products/:productId',
  validateRequest(productValidation.productUpdateValidation),
  ProductController.updateProduct,
);

router.get('/products', ProductController.getAllProducts);

router.delete('/products/:productId', ProductController.deleteProduct);

export const Productroute = router;
