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

export const OrderController = {
  createOrderIntoDb,
};
