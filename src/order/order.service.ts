import { z } from 'zod';
import {
    GetOrderResponse,
    OrderIdParam,
    PatchOrderResponse,
    PostOrderBody,
    PostOrderResponse,
    PostOrderVal,
} from './order.model';
import { OrderRepository } from './order.repository';

export class OrderService {
    static async getOrder(): Promise<GetOrderResponse> {
        const response = await OrderRepository.getOrder();

        return response;
    }

    static async postOrder(body: PostOrderBody): Promise<PostOrderResponse> {
        // Validate request
        const requestValidated = PostOrderVal.parse(body);
        // Split request
        const { orderItems, ...orders } = requestValidated;
        // Insert orders
        const response = await OrderRepository.postOrder(orders);
        // Map orderId
        const orderItemsWithOrderId = orderItems.map((item) => ({
            orderId: response.id,
            ...item,
        }));
        // Insert orderItems
        await OrderRepository.postOrderItem(orderItemsWithOrderId);
        // Response
        return { id: response.id };
    }

    static async patchOrder(param: OrderIdParam): Promise<PatchOrderResponse> {
        // Patch orders
        const response = await OrderRepository.patchOrder(param);
        // Response
        return { id: response.id };
    }
}
