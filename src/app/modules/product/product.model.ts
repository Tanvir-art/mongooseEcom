import { Schema, model, connect } from 'mongoose';
import { Product } from './product.interface';

// Define the sub-schema for variants
const variantSchema = new Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Define the sub-schema for inventory
const inventorySchema = new Schema({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define the main product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const productModel = model<Product>('Product', productSchema);
