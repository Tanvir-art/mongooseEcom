import exprss from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middleware/validateRequest';
import { orderValidation } from './order.validation';

const router = exprss.Router();

router.post(
  '/orders',
  validateRequest(orderValidation.createOrderValidation),
  OrderController.createOrderIntoDb,
);
router.get('/orders', OrderController.gettAllOrderDb);
router.get('/orders/email', OrderController.findByEmailOrderDb);
export const OrderRouter = router;
