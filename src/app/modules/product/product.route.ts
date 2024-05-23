import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/products', ProductController.createProduct);

router.get('/products/:productId', ProductController.getSingleProduct);

router.put('/products/:productId', ProductController.updateProduct);

router.get('/products', ProductController.getAllProducts);

router.delete('/products/:productId', ProductController.deleteProduct);

router.get('/products/search', ProductController.searchProducts);

export const Productroute = router;
