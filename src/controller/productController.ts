import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../service/productService';

export class ProductController {
    static async getProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await ProductService.getProduct();

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async postProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const result = await ProductService.postProduct(request.body);

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async putProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const param = { productId: parseInt(request.params.productId) };
            const result = await ProductService.putProduct(request.body, param);

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
    // GET PRODUCT ID
    // PUT PRODUCT
    // DELETE PRODUCT
    // PUT PRODUCTITEM
    // DELETE PRODUCTITEM
}
