import { NextFunction, Request, Response } from 'express';
import { ProductService } from './product.service';

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

    static async deleteProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const param = { productId: parseInt(request.params.productId) };
            await ProductService.deleteProduct(param);

            response.status(200).json({
                data: 'Product deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    }

    static async putProductItem(request: Request, response: Response, next: NextFunction) {
        try {
            const param = {
                productId: parseInt(request.params.productId),
                productItemId: parseInt(request.params.productItemId),
            };
            const result = await ProductService.putProductItem(request.body, param);

            response.status(200).json({
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteProductItem(request: Request, response: Response, next: NextFunction) {
        try {
            const param = {
                productId: parseInt(request.params.productId),
                productItemId: parseInt(request.params.productItemId),
            };
            await ProductService.deleteProductitem(param);

            response.status(200).json({
                data: 'Product Item deleted successfully',
            });
        } catch (err) {
            next(err);
        }
    }
}
