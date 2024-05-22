import { Schema, model, connect } from 'mongoose';
import { Product } from './product.interface';

const productShema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [Object], required: true },
  inventory: { type: Object, required: true },
});

export const productModel = model<Product>('Product', productShema);
