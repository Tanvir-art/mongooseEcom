import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Productroute } from './app/modules/product/product.route';
import { OrderRouter } from './app/modules/order/order.route';
import notFound from './app/middleware/notFound';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', Productroute);
app.use('/api', OrderRouter);
app.use(notFound);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
