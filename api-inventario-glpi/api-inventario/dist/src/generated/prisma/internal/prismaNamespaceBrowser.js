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
    Assignment: 'Assignment',
    Status: 'Status',
    DeviceModel: 'DeviceModel',
    Department: 'Department',
    Location: 'Location',
    Computer: 'Computer',
    NetworkInterface: 'NetworkInterface',
    Volume: 'Volume',
    Software: 'Software',
    SoftwareOnComputer: 'SoftwareOnComputer'
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
    role: 'role',
    departmentId: 'departmentId',
    createdAt: 'createdAt'
};
export const AssignmentScalarFieldEnum = {
    id: 'id',
    computerId: 'computerId',
    userId: 'userId',
    assignedAt: 'assignedAt',
    returnedAt: 'returnedAt'
};
export const StatusScalarFieldEnum = {
    id: 'id',
    name: 'name'
};
export const DeviceModelScalarFieldEnum = {
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
export const ComputerScalarFieldEnum = {
    id: 'id',
    glpiId: 'glpiId',
    hostname: 'hostname',
    hostFisico: 'hostFisico',
    nameHaperv: 'nameHaperv',
    mainIp: 'mainIp',
    alternateUser: 'alternateUser',
    user: 'user',
    type: 'type',
    role: 'role',
    manufacturer: 'manufacturer',
    modelName: 'modelName',
    serial: 'serial',
    osName: 'osName',
    osVersion: 'osVersion',
    osArch: 'osArch',
    cpu: 'cpu',
    ram: 'ram',
    hd: 'hd',
    statusId: 'statusId',
    locationId: 'locationId',
    deviceModelId: 'deviceModelId',
    lastSync: 'lastSync'
};
export const NetworkInterfaceScalarFieldEnum = {
    id: 'id',
    glpiId: 'glpiId',
    name: 'name',
    macAddress: 'macAddress',
    ipAddress: 'ipAddress',
    computerId: 'computerId'
};
export const VolumeScalarFieldEnum = {
    id: 'id',
    glpiId: 'glpiId',
    mountPoint: 'mountPoint',
    capacityGb: 'capacityGb',
    computerId: 'computerId'
};
export const SoftwareScalarFieldEnum = {
    id: 'id',
    glpiId: 'glpiId',
    name: 'name',
    version: 'version',
    publisher: 'publisher'
};
export const SoftwareOnComputerScalarFieldEnum = {
    computerId: 'computerId',
    softwareId: 'softwareId'
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