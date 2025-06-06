import { InferInsertModel } from 'drizzle-orm';
import { products } from '../schema/products';
import { productItems } from '../schema/product-items';
import { z } from 'zod';

type GetProductOutput = PostProductInput & {
    productItems: PostProductItemInput[];
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
    category: z.enum(['coffee', 'non_coffee', 'snack', 'main_course']),
    productItems: PostProductItemVal.array(),
});
type PostProductBody = z.infer<typeof PostProductVal>;
type PostProductInput = InferInsertModel<typeof products>;
type PostProductOutput = PostProductInput;
type PostProductItemInput = InferInsertModel<typeof productItems>;
type PostProductItemOutput = PostProductItemInput;
type PostProductResponse = Pick<PostProductInput, 'id'>;

type PostProductImageInput = {
    image: string;
};
type PostProductImageOutput = PostProductOutput;

const PutProductVal = PostProductVal.omit({ productItems: true });
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
    PostProductImageInput,
    PostProductImageOutput,
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
