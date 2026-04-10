export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly WAITER: "WAITER";
    readonly CHEF: "CHEF";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const TableStatus: {
    readonly FREE: "FREE";
    readonly OCCUPIED: "OCCUPIED";
    readonly RESERVED: "RESERVED";
};
export type TableStatus = (typeof TableStatus)[keyof typeof TableStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly CLOSED: "CLOSED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELED: "CANCELED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
