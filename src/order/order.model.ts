import { InferInsertModel } from 'drizzle-orm';
import { orders } from '../schema/orders';
import { orderItems } from '../schema/order-items';
import { z } from 'zod';

type GetOrderOutput = PostOrderInput & {
    orderItems: PostOrderItemInput[];
};
type GetOrderResponse = GetOrderOutput[];

const PostOrderItemVal = z.object({
    quantity: z.number().min(1),
    note: z.string().max(50).nullable(),
    productItemId: z.number(),
});
const PostOrderVal = z.object({
    status: z.enum(['ongoing', 'done']),
    price: z.number().min(0),
    customer: z.string().max(32),
    type: z.enum(['dine_in', 'takeaway']),
    cashier: z.string().max(32),
    orderItems: PostOrderItemVal.array(),
});
type PostOrderBody = z.infer<typeof PostOrderVal>;
type PostOrderInput = InferInsertModel<typeof orders>;
type PostOrderOutput = PostOrderInput;
type PostOrderItemInput = InferInsertModel<typeof orderItems>;
type PostOrderItemOutput = PostOrderItemInput;
type PostOrderResponse = Pick<PostOrderInput, 'id'>;

type OrderIdParam = {
    orderId: number;
};
type PatchOrderOutput = PostOrderOutput;
type PatchOrderResponse = Pick<PatchOrderOutput, 'id'>;

export {
    GetOrderOutput,
    GetOrderResponse,
    PostOrderVal,
    PostOrderItemVal,
    PostOrderBody,
    PostOrderInput,
    PostOrderOutput,
    PostOrderItemInput,
    PostOrderItemOutput,
    PostOrderResponse,
    OrderIdParam,
    PatchOrderOutput,
    PatchOrderResponse,
};
