import { Request, Response } from 'express';
import { OrderServices } from './order.service';
const createOrderIntoDb = async (req: Request, res: Response) => {
  const order = req.body;
  const result = OrderServices.createOrder(order);
  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: result,
  });
};

export const OrderController = {
  createOrderIntoDb,
};
