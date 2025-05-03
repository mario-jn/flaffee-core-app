import {
    GetProductResponse,
    PostProductBody,
    PostProductVal,
    PostProductResponse,
    PutProductParam,
    PutProductBody,
    PutProductResponse,
    PutProductVal,
} from '../model/productModel';
import { ProductRepository } from '../repository/productRepository';

export class ProductService {
    static async getProduct(): Promise<GetProductResponse> {
        const response = await ProductRepository.getProduct();

        return response;
    }

    static async postProduct(body: PostProductBody): Promise<PostProductResponse> {
        // Validate request with zod
        const requestValidated = PostProductVal.parse(body);
        // Split request into product and productItem
        const { productItem, ...product } = requestValidated;
        // Insert product
        const response = await ProductRepository.postProduct(product);
        // Map productId to productItem
        const productItemWithProductId = productItem.map((item) => ({
            productId: response.id,
            ...item,
        }));
        // Insert productItem
        await ProductRepository.postProductItem(productItemWithProductId);
        // Response
        return { id: response.id };
    }

    static async putProduct(body: PutProductBody, param: PutProductParam): Promise<PutProductResponse> {
        // Validate request with zod
        const requestValidated = PutProductVal.parse(body);
        // Update table product
        const response = await ProductRepository.putProduct(requestValidated, param);
        // Response
        return { id: response.id };
    }
}
