import { Request, Response } from 'express';
import Joi from 'joi';
import { OrderServices } from './order.service';
import { ProductServices } from '../product/product.service';

const createOrderIntoDb = async (req: Request, res: Response) => {
  const orderSchema = Joi.object({
    email: Joi.string().email().required(),
    productId: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  });
  const { order } = req.body;
  const { error } = orderSchema.validate(order);
  if (error) {
    return res.status(500).json({
      success: false,
      message: error.details,
    });
  }

  try {
    // Decrement product quantity
    const productUpdateResult = await ProductServices.decrementProductQuantity(
      order.productId,
      order.quantity,
    );

    if (!productUpdateResult) {
      throw new Error(
        `Failed to decrement quantity for product ${order.productId}`,
      );
    }

    // Check if the updated product has sufficient quantity
    if (productUpdateResult.inventory.quantity < 0) {
      throw new Error(`Insufficient quantity for product ${order.productId}`);
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
