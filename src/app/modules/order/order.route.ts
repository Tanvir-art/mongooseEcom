import exprss from 'express';
import { OrderController } from './order.controller';

const router = exprss.Router();

router.post('/orders', OrderController.createOrderIntoDb);
router.get('/orders', OrderController.gettAllOrderDb);
router.get('/orders/email', OrderController.findByEmailOrderDb);
export const OrderRouter = router;
