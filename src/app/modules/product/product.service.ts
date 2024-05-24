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
  try {
    const result = await productModel.findById(id);
    return result;
  } catch (error) {
    throw new Error('Error fetching single product');
  }
};

const updateProductInDb = async (id: string, product: Partial<Product>) => {
  const result = await productModel.findByIdAndUpdate(id, product, {
    new: true,
  });
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
  const result = await productModel.findByIdAndUpdate(
    id,
    {
      $inc: { 'inventory.quantity': -quantity },
    },
    { new: true },
  );
  return result;
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
