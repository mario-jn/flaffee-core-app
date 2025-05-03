import { asc, eq, isNull } from 'drizzle-orm';
import { database } from '../application/database';
import { product } from '../schema/product';
import {
    GetProductOutput,
    PostProductInput,
    PostProductItemInput,
    PostProductItemOutput,
    PostProductOutput,
    PutProductInput,
    PutProductOutput,
    PutProductParam,
} from '../model/productModel';
import { productItem } from '../schema/productItem';

export class ProductRepository {
    static async getProduct(): Promise<GetProductOutput[]> {
        const result = await database.query.product.findMany({
            where: isNull(product.deletedAt),
            columns: {
                id: true,
                name: true,
                type: true,
                category: true,
            },
            with: {
                productItem: {
                    columns: {
                        id: true,
                        variant: true,
                        size: true,
                        price: true,
                    },
                },
            },
            orderBy: [asc(product.id)],
        });

        return result;
    }

    static async postProduct(input: PostProductInput): Promise<PostProductOutput> {
        const [result] = await database.insert(product).values(input).returning();

        return result;
    }

    static async postProductItem(input: PostProductItemInput[]): Promise<PostProductItemOutput[]> {
        const result = await database.insert(productItem).values(input).returning();

        return result;
    }

    static async putProduct(input: PutProductInput, filter: PutProductParam): Promise<PutProductOutput> {
        const [result] = await database.update(product).set(input).where(eq(product.id, filter.productId)).returning();

        return result;
    }
}
