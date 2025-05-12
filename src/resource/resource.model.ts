import { z } from 'zod';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { resources } from '../schema/resources';
import { ResourceValidation } from "./resource.validation";

type SelectResource= InferSelectModel<typeof resources>;
type InsertResource = InferInsertModel<typeof resources>;
type CreateResourceRequest = z.infer<typeof ResourceValidation.CREATE>;
type ResourceResponse = Partial<SelectResource>;

export { SelectResource, InsertResource, CreateResourceRequest, ResourceResponse };
