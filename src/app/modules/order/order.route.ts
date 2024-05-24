import exprss from 'express';
import { OrderController } from './order.controller';

const router = exprss.Router();

router.post('/orders', OrderController.createOrderIntoDb);
router.get('/orders', OrderController.gettAllOrderDb);
export const OrderRouter = router;
