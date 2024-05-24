import { Order } from './order.interface';
import { orderModel } from './order.model';

const createOrder = async (order: Order) => {
  const result = await orderModel.create(order);
  return result;
};

const getAllOrder = async () => {
  const result = orderModel.find();
  return result;
};

const findByEmailOrder = async (email: string) => {
  const result = orderModel.find({ email: email });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrder,
  findByEmailOrder,
};
