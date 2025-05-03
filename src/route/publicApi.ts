import express from 'express';
import { HealthController } from '../controller/healthController';
import { ProductController } from '../controller/productController';

export const publicRouter = express.Router();

publicRouter.get('/api/health', HealthController.checkHealth);
publicRouter.get('/api/products', ProductController.getProduct);
publicRouter.post('/api/products', ProductController.postProduct);
publicRouter.put('/api/products/:productId', ProductController.putProduct);
