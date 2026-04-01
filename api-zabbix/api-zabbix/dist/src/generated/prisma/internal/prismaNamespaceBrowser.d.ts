import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly UserAccountLog: "UserAccountLog";
    readonly Asset: "Asset";
    readonly Assignment: "Assignment";
    readonly Notification: "Notification";
    readonly Department: "Department";
    readonly Model: "Model";
    readonly Status: "Status";
    readonly Location: "Location";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly username: "username";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly departmentId: "departmentId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserAccountLogScalarFieldEnum: {
    readonly id: "id";
    readonly event: "event";
    readonly reason: "reason";
    readonly adminUser: "adminUser";
    readonly ipAddress: "ipAddress";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type UserAccountLogScalarFieldEnum = (typeof UserAccountLogScalarFieldEnum)[keyof typeof UserAccountLogScalarFieldEnum];
export declare const AssetScalarFieldEnum: {
    readonly id: "id";
    readonly hostname: "hostname";
    readonly ipAddress: "ipAddress";
    readonly serialNumber: "serialNumber";
    readonly assetTag: "assetTag";
    readonly purchaseDate: "purchaseDate";
    readonly warrantyExpiry: "warrantyExpiry";
    readonly statusId: "statusId";
    readonly modelId: "modelId";
    readonly locationId: "locationId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum];
export declare const AssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly assetId: "assetId";
    readonly userId: "userId";
    readonly assignedAt: "assignedAt";
    readonly returnedAt: "returnedAt";
};
export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly eventid: "eventid";
    readonly host: "host";
    readonly ipAddress: "ipAddress";
    readonly triggerName: "triggerName";
    readonly priority: "priority";
    readonly status: "status";
    readonly message: "message";
    readonly acknowledged: "acknowledged";
    readonly assetHostname: "assetHostname";
    readonly createdAt: "createdAt";
    readonly resolvedAt: "resolvedAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const ModelScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly manufacturer: "manufacturer";
    readonly category: "category";
};
export type ModelScalarFieldEnum = (typeof ModelScalarFieldEnum)[keyof typeof ModelScalarFieldEnum];
export declare const StatusScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type StatusScalarFieldEnum = (typeof StatusScalarFieldEnum)[keyof typeof StatusScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
