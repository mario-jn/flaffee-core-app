import { asc, desc, eq, isNull } from 'drizzle-orm';
import { database } from '../application/database';
import { orders } from '../schema/orders';
import { orderItems } from '../schema/order-items';
import {
    GetOrderOutput,
    OrderIdParam,
    PatchOrderOutput,
    PostOrderInput,
    PostOrderItemInput,
    PostOrderItemOutput,
    PostOrderOutput,
} from './order.model';
import { productItems } from '../schema/product-items';

export class OrderRepository {
    static async getOrder(): Promise<GetOrderOutput[]> {
        // const result = await database
        //     .select({
        //         id: orders.id,
        //         status: orders.status,
        //         type: orders.type,
        //         customer: orders.customer,
        //         cashier: orders.cashier,
        //         price: orders.price,
        //         createdAt: orders.createdAt,
        //         orderItems: {
        //             id: orderItems.id,
        //             quantity: orderItems.quantity,
        //             note: orderItems.note,
        //         },
        //         productItems: {
        //             id: productItems.id,
        //             price: productItems.price,
        //             variant: productItems.variant,
        //             size: productItems.size,
        //         },
        //     })
        //     .from(orders)
        //     .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
        //     .leftJoin(productItems, eq(orderItems.productItemId, productItems.id))
        //     .orderBy(desc(orders.createdAt));

        const result = await database.query.orders.findMany({
            // where: isNull(orders.deletedAt),
            columns: {
                id: true,
                status: true,
                type: true,
                customer: true,
                cashier: true,
                price: true,
                createdAt: true,
            },
            with: {
                orderItems: {
                    // where: isNull(orderItems.deletedAt),
                    columns: {
                        id: true,
                        quantity: true,
                        note: true,
                    },
                    with: {
                        productItems: {
                            columns: {
                                id: true,
                                price: true,
                                variant: true,
                                size: true,
                            },
                        },
                    },
                },
            },
            orderBy: [desc(orders.createdAt)],
        });

        return result;
    }

    static async postOrder(input: PostOrderInput): Promise<PostOrderOutput> {
        const [result] = await database.insert(orders).values(input).returning();

        return result;
    }

    static async postOrderItem(input: PostOrderItemInput[]): Promise<PostOrderItemOutput[]> {
        const result = await database.insert(orderItems).values(input).returning();

        return result;
    }

    static async patchOrder(filter: OrderIdParam): Promise<PatchOrderOutput> {
        const [result] = await database
            .update(orders)
            .set({
                status: 'done',
            })
            .where(eq(orders.id, filter.orderId))
            .returning();

        return result;
    }
}
