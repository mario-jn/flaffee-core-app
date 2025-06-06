import express from 'express';
import { HealthController } from '../health/health.controller';
import { ProductController } from '../product/product.controller';
// import { OrderController } from '../order/order.controller';
import { AuthController } from '../auth/auth.controller';
import { imageUploader } from '../middleware/multer-middleware';

export const publicRouter = express.Router();

publicRouter.get('/api/health', HealthController.checkHealth);
publicRouter.get('/api/products', ProductController.getProduct);
publicRouter.post('/api/auth/register', AuthController.register);
publicRouter.post('/api/auth/login', AuthController.login);
publicRouter.post('/api/auth/logout', AuthController.logout);
publicRouter.post('/api/auth/reset-password', AuthController.resetPassword);
publicRouter.post('/api/auth/forgot-password', AuthController.forgotPassword);

publicRouter.get('/api/health', HealthController.checkHealth);
publicRouter.get('/api/products', ProductController.getProduct);
publicRouter.post('/api/products', ProductController.postProduct);
publicRouter.post('/api/products/:productId/image', imageUploader, ProductController.postProductImage);
publicRouter.put('/api/products/:productId', ProductController.putProduct);
publicRouter.delete('/api/products/:productId', ProductController.deleteProduct);
publicRouter.put('/api/products/:productId/items/:productItemId', ProductController.putProductItem);
publicRouter.delete('/api/products/:productId/items/:productItemId', ProductController.deleteProductItem);

// publicRouter.get('/api/orders', OrderController.getOrder);
