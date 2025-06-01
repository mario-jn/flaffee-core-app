import {
    GetProductResponse,
    PostProductBody,
    PostProductVal,
    PostProductResponse,
    ProductIdParam,
    PutProductBody,
    PutProductResponse,
    PutProductVal,
    PutProductItemBody,
    PutProductItemVal,
    ProductItemIdParam,
    PutProductItemResponse,
} from './product.model';
import { ProductRepository } from './product.repository';

export class ProductService {
    static async getProduct(): Promise<GetProductResponse> {
        const response = await ProductRepository.getProduct();

        return response;
    }

    static async postProduct(body: PostProductBody): Promise<PostProductResponse> {
        // Validate request with zod
        const requestValidated = PostProductVal.parse(body);
        // Split request into product and productItem
        const { productItems, ...products } = requestValidated;
        // Insert product
        const response = await ProductRepository.postProduct(products);
        // Map productId to productItem
        const productItemWithProductId = productItems.map((item) => ({
            productId: response.id,
            ...item,
        }));
        // Insert productItem
        await ProductRepository.postProductItem(productItemWithProductId);
        // Response
        return { id: response.id };
    }

    static async postProductImage(file: Express.Multer.File, param: ProductIdParam): Promise<PostProductResponse> {
        // Check productId
        const check = await ProductRepository.getProductById(param);
        if (!check) {
            throw new ResponseError(404, 'Product not found', 'Produk tidak ditemukan');
        }

        // Validate file
        if (!file) {
            throw new ResponseError(400, 'File is required', 'File tidak boleh kosong');
        }
        const input = {
            image: file.filename,
        };

        // Update table product
        const result = await ProductRepository.postProductImage(input, param);

        return result;
    }

    static async putProduct(body: PutProductBody, param: ProductIdParam): Promise<PutProductResponse> {
        // Validate request with zod
        const requestValidated = PutProductVal.parse(body);
        // Update table product
        const response = await ProductRepository.putProduct(requestValidated, param);
        // Response
        return { id: response.id };
    }

    static async deleteProduct(param: ProductIdParam) {
        // Update table product
        await ProductRepository.deleteProduct(param);
    }

    static async putProductItem(
        body: PutProductItemBody,
        param: ProductIdParam & ProductItemIdParam,
    ): Promise<PutProductItemResponse> {
        // Validate request with zod
        const requestValidated = PutProductItemVal.parse(body);
        // Update table productItem
        const response = await ProductRepository.putProductItem(requestValidated, param);

        return { id: response.id };
    }

    static async deleteProductitem(param: ProductIdParam & ProductItemIdParam) {
        // Update table productItem
        await ProductRepository.deleteProductItem(param);
    }
}
