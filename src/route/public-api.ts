import express from 'express';
import { HealthController } from '../controller/healthController';
import { ProductController } from '../product/product.controller';
import { OrderController } from '../order/order.controller';

export const publicRouter = express.Router();

publicRouter.get('/api/health', HealthController.checkHealth);
publicRouter.get('/api/products', ProductController.getProduct);
publicRouter.post('/api/products', ProductController.postProduct);
publicRouter.put('/api/products/:productId', ProductController.putProduct);
publicRouter.delete('/api/products/:productId', ProductController.deleteProduct);
publicRouter.put('/api/products/:productId/items/:productItemId', ProductController.putProductItem);
publicRouter.delete('/api/products/:productId/items/:productItemId', ProductController.deleteProductItem);

publicRouter.get('/api/orders', OrderController.getOrder);
