import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';

export class OrderController {
    static async getOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await OrderService.getOrder();

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async postOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await OrderService.getOrder();

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async patchOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const param = { orderId: parseInt(request.params.orderId) };
            const result = await OrderService.patchOrder(param);

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}
