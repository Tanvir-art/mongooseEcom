import { ObjectId } from 'mongodb';
import { Product } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDb = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

const getAllProducts = async () => {
  const result = await productModel.find();
  return result;
};

const getSingleProducts = async (id: string) => {
  // const objectId = new ObjectId(id);
  const result = await productModel.findById({ _id: id });
  return result;
};

const updateProductInDb = async (id: string, product: Partial<Product>) => {
  const result = await productModel.findByIdAndUpdate(id, product);
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await productModel.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount > 0) {
    return { _id: id };
  } else {
    throw new Error('Product not found');
  }
};

export const ProductServices = {
  createProductIntoDb,
  getAllProducts,
  getSingleProducts,
  updateProductInDb,
  deleteProductFromDb,
};
