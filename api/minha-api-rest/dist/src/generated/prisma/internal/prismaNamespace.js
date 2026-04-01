import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.6.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Asset: 'Asset',
    User: 'User',
    Assignment: 'Assignment',
    Model: 'Model',
    Status: 'Status',
    Department: 'Department',
    Location: 'Location'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const AssetScalarFieldEnum = {
    id: 'id',
    hostname: 'hostname',
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
export const UserScalarFieldEnum = {
    id: 'id',
    username: 'username',
    fullName: 'fullName',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    departmentId: 'departmentId',
    createdAt: 'createdAt'
};
export const AssignmentScalarFieldEnum = {
    id: 'id',
    assetId: 'assetId',
    userId: 'userId',
    assignedAt: 'assignedAt',
    returnedAt: 'returnedAt'
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
export const DepartmentScalarFieldEnum = {
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
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map