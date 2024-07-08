import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';

const createOrderIntoDb = async (req: Request, res: Response) => {
  // Decrement product quantity
  const productUpdateResult = await ProductServices.decrementProductQuantity(
    req.body.productId,
    req.body.quantity,
  );

  if (!productUpdateResult) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient quantity available in inventory',
    });
  }

  // Create the order
  const createdOrder = await OrderServices.createOrder(req.body);

  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: createdOrder,
  });
};

const gettAllOrderDb = async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrder();
  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
};

const findByEmailOrderDb = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email query parameter is required',
    });
  }

  try {
    const result = await OrderServices.findByEmailOrder(email);
    return res.status(200).json({
      success: true,
      message: 'Order fetched successfully for user email',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Order not found',
    });
  }
};

export const OrderController = {
  createOrderIntoDb,
  gettAllOrderDb,
  findByEmailOrderDb,
};
