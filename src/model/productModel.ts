import { InferInsertModel } from 'drizzle-orm';
import { product } from '../schema/product';
import { productItem } from '../schema/productItem';
import { z } from 'zod';

type GetProductOutput = PostProductInput & {
    productItem: PostProductItemInput[];
};
type GetProductResponse = GetProductOutput[];

const PostProductItemVal = z.object({
    variant: z.enum(['ice', 'hot', 'regular']),
    size: z.enum(['regular', 'large', 'extra_large']),
    price: z.number().min(0),
});
const PostProductVal = z.object({
    name: z.string().max(25),
    type: z.enum(['beverage', 'food']),
    category: z.enum(['coffee', 'tea', 'snack', 'main_course']),
    productItem: PostProductItemVal.array(),
});
type PostProductBody = z.infer<typeof PostProductVal>;
type PostProductInput = InferInsertModel<typeof product>;
type PostProductOutput = PostProductInput;
type PostProductItemInput = InferInsertModel<typeof productItem>;
type PostProductItemOutput = PostProductItemInput;
type PostProductResponse = Pick<PostProductInput, 'id'>;

const PutProductVal = PostProductVal.omit({ productItem: true });
type PutProductBody = z.infer<typeof PutProductVal>;
type ProductIdParam = {
    productId: number;
};
type PutProductInput = PostProductInput;
type PutProductOutput = PutProductInput;
type PutProductResponse = PostProductResponse;

const PutProductItemVal = PostProductItemVal;
type PutProductItemBody = z.infer<typeof PostProductItemVal>;
type PutProductItemInput = PostProductItemInput;
type ProductItemIdParam = {
    productItemId: number;
};
type PutProductItemOutput = PutProductItemInput;
type PutProductItemResponse = Pick<PostProductItemInput, 'id'>;

export {
    GetProductOutput,
    GetProductResponse,
    PostProductBody,
    PostProductVal,
    PostProductItemVal,
    PostProductInput,
    PostProductOutput,
    PostProductItemInput,
    PostProductItemOutput,
    PostProductResponse,
    ProductIdParam,
    ProductItemIdParam,
    PutProductBody,
    PutProductVal,
    PutProductInput,
    PutProductOutput,
    PutProductResponse,
    PutProductItemVal,
    PutProductItemBody,
    PutProductItemInput,
    PutProductItemOutput,
    PutProductItemResponse,
};
