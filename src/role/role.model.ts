import { z } from 'zod';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { roles } from '../schema/roles';
import {RoleValidation} from "./role.validation";

type SelectRole = InferSelectModel<typeof roles>;
type InsertRole = InferInsertModel<typeof roles>;
type CreateRoleRequest = z.infer<typeof RoleValidation.CREATE>;
type RoleResponse = Partial<SelectRole>;

export { SelectRole, InsertRole, CreateRoleRequest, RoleResponse };
