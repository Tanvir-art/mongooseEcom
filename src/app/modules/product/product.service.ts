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
  const result = await productModel.findById(id);
  return result;
};

const updateProductInDb = async (id: string, product: Partial<Product>) => {
  const result = await productModel.findByIdAndUpdate(id, product, {
    new: true,
  });
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await productModel.deleteOne({ _id: new ObjectId(id) });
  return result;
};

const searchProdText = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i');
  const result = await productModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });
  return result;
};

const decrementProductQuantity = async (id: string, quantity: number) => {
  const product = await productModel.findById(id);

  if (!product) {
    throw new Error('Product not found');
  }

  // Check if sufficient quantity is available
  if (product.inventory.quantity < quantity) {
    return null;
  }
  let Updatedproduct = await productModel.findByIdAndUpdate(
    id,
    {
      $inc: { 'inventory.quantity': -quantity },
    },
    { new: true },
  );

  if (!Updatedproduct) {
    throw new Error('Product not found');
  }

  // Set instock to false if quantity is zero
  if (Updatedproduct.inventory.quantity <= 0) {
    Updatedproduct = await productModel.findByIdAndUpdate(
      id,
      { $set: { 'inventory.quantity': 0, 'inventory.inStock': false } },
      { new: true },
    );
  }

  return Updatedproduct;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProducts,
  getSingleProducts,
  updateProductInDb,
  deleteProductFromDb,
  searchProdText,
  decrementProductQuantity,
};
