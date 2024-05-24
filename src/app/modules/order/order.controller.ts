import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';
const createOrderIntoDb = async (req: Request, res: Response) => {
  //   const { email, productId, price, quantity } = req.body;
  const { order } = req.body; // Destructure the nested order object

  try {
    // Decrement product quantity
    const result = await ProductServices.decrementProductQuantity(
      order.productId,
      order.quantity,
    );
    if (!result) {
      throw new Error(
        `Failed to decrement quantity for product ${order.productId}`,
      );
    }

    // Create the order

    const createdOrder = await OrderServices.createOrder(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order creation failed',
      error: error,
    });
  }
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
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const OrderController = {
  createOrderIntoDb,
  gettAllOrderDb,
  findByEmailOrderDb,
};
