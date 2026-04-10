"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.TableStatus = exports.Role = void 0;
exports.Role = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    WAITER: 'WAITER',
    CHEF: 'CHEF'
};
exports.TableStatus = {
    FREE: 'FREE',
    OCCUPIED: 'OCCUPIED',
    RESERVED: 'RESERVED'
};
exports.OrderStatus = {
    PENDING: 'PENDING',
    PREPARING: 'PREPARING',
    READY: 'READY',
    CLOSED: 'CLOSED',
    DELIVERED: 'DELIVERED',
    CANCELED: 'CANCELED'
};
//# sourceMappingURL=enums.js.map