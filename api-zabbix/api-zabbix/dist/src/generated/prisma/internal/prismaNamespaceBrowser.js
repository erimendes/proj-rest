import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    UserAccountLog: 'UserAccountLog',
    Asset: 'Asset',
    Assignment: 'Assignment',
    Notification: 'Notification',
    Department: 'Department',
    Model: 'Model',
    Status: 'Status',
    Location: 'Location'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    username: 'username',
    fullName: 'fullName',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    departmentId: 'departmentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const UserAccountLogScalarFieldEnum = {
    id: 'id',
    event: 'event',
    reason: 'reason',
    adminUser: 'adminUser',
    ipAddress: 'ipAddress',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const AssetScalarFieldEnum = {
    id: 'id',
    hostname: 'hostname',
    ipAddress: 'ipAddress',
    serialNumber: 'serialNumber',
    assetTag: 'assetTag',
    purchaseDate: 'purchaseDate',
    warrantyExpiry: 'warrantyExpiry',
    statusId: 'statusId',
    modelId: 'modelId',
    locationId: 'locationId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AssignmentScalarFieldEnum = {
    id: 'id',
    assetId: 'assetId',
    userId: 'userId',
    assignedAt: 'assignedAt',
    returnedAt: 'returnedAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    eventid: 'eventid',
    host: 'host',
    ipAddress: 'ipAddress',
    triggerName: 'triggerName',
    priority: 'priority',
    status: 'status',
    message: 'message',
    acknowledged: 'acknowledged',
    assetHostname: 'assetHostname',
    createdAt: 'createdAt',
    resolvedAt: 'resolvedAt'
};
export const DepartmentScalarFieldEnum = {
    id: 'id',
    name: 'name'
};
export const ModelScalarFieldEnum = {
    id: 'id',
    name: 'name',
    manufacturer: 'manufacturer',
    category: 'category'
};
export const StatusScalarFieldEnum = {
    id: 'id',
    name: 'name'
};
export const LocationScalarFieldEnum = {
    id: 'id',
    name: 'name'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map