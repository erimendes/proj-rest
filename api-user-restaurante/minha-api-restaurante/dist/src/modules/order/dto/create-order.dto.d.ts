export declare class OrderItemDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    tableId: string;
    items: OrderItemDto[];
}
