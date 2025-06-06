import { and, asc, eq, isNull } from 'drizzle-orm';
import { database } from '../application/database';
import { products } from '../schema/products';
import {
    GetProductOutput,
    PostProductImageInput,
    PostProductImageOutput,
    PostProductInput,
    PostProductItemInput,
    PostProductItemOutput,
    PostProductOutput,
    ProductIdParam,
    ProductItemIdParam,
    PutProductInput,
    PutProductItemInput,
    PutProductItemOutput,
    PutProductOutput,
} from './product.model';
import { productItems } from '../schema/product-items';

export class ProductRepository {
    static async getProduct(): Promise<GetProductOutput[]> {
        const result = await database.query.products.findMany({
            where: isNull(products.deletedAt),
            columns: {
                id: true,
                name: true,
                type: true,
                category: true,
                image: true,
            },
            with: {
                productItems: {
                    where: isNull(productItems.deletedAt),
                    columns: {
                        id: true,
                        variant: true,
                        size: true,
                        price: true,
                    },
                },
            },
            orderBy: [asc(products.id)],
        });

        return result;
    }

    static async postProduct(input: PostProductInput): Promise<PostProductOutput> {
        const [result] = await database.insert(products).values(input).returning();

        return result;
    }

    static async getProductById(filter: Partial<ProductIdParam & ProductItemIdParam>): Promise<GetProductOutput> {
        const whereProduct = [isNull(products.deletedAt)];

        if (filter.productId) {
            whereProduct.push(eq(products.id, filter.productId));
        }

        const [result] = await database.query.products.findMany({
            where: and(...whereProduct),
            columns: {
                id: true,
                name: true,
                type: true,
                category: true,
                image: true,
            },
            with: {
                productItems: {
                    where: and(
                        isNull(productItems.deletedAt),
                        ...(filter.productItemId ? [eq(productItems.id, filter.productItemId)] : []),
                    ),
                    columns: {
                        id: true,
                        variant: true,
                        size: true,
                        price: true,
                    },
                },
            },
        });

        return result;
    }

    static async postProductItem(input: PostProductItemInput[]): Promise<PostProductItemOutput[]> {
        const result = await database.insert(productItems).values(input).returning();

        return result;
    }

    static async postProductImage(
        input: PostProductImageInput,
        filter: ProductIdParam,
    ): Promise<PostProductImageOutput> {
        const [result] = await database
            .update(products)
            .set(input)
            .where(eq(products.id, filter.productId))
            .returning();

        return result;
    }

    static async putProduct(input: PutProductInput, filter: ProductIdParam): Promise<PutProductOutput> {
        const [result] = await database
            .update(products)
            .set(input)
            .where(eq(products.id, filter.productId))
            .returning();

        return result;
    }

    static async deleteProduct(filter: ProductIdParam) {
        await database
            .update(products)
            .set({
                deletedAt: new Date(),
            })
            .where(eq(products.id, filter.productId));
    }

    static async putProductItem(
        input: PutProductItemInput,
        filter: ProductIdParam & ProductItemIdParam,
    ): Promise<PutProductItemOutput> {
        const [result] = await database
            .update(productItems)
            .set(input)
            .where(and(eq(productItems.productId, filter.productId), eq(productItems.id, filter.productItemId)))
            .returning();

        return result;
    }

    static async deleteProductItem(filter: ProductIdParam & ProductItemIdParam) {
        await database
            .update(productItems)
            .set({
                deletedAt: new Date(),
            })
            .where(and(eq(productItems.productId, filter.productId), eq(productItems.id, filter.productItemId)));
    }
}
