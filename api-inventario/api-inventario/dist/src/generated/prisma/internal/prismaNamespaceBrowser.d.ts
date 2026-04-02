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
    readonly Assignment: "Assignment";
    readonly Status: "Status";
    readonly DeviceModel: "DeviceModel";
    readonly Department: "Department";
    readonly Location: "Location";
    readonly Computer: "Computer";
    readonly NetworkInterface: "NetworkInterface";
    readonly Volume: "Volume";
    readonly Software: "Software";
    readonly SoftwareOnComputer: "SoftwareOnComputer";
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
    readonly role: "role";
    readonly departmentId: "departmentId";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AssignmentScalarFieldEnum: {
    readonly id: "id";
    readonly computerId: "computerId";
    readonly userId: "userId";
    readonly assignedAt: "assignedAt";
    readonly returnedAt: "returnedAt";
};
export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum];
export declare const StatusScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type StatusScalarFieldEnum = (typeof StatusScalarFieldEnum)[keyof typeof StatusScalarFieldEnum];
export declare const DeviceModelScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type DeviceModelScalarFieldEnum = (typeof DeviceModelScalarFieldEnum)[keyof typeof DeviceModelScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const LocationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum];
export declare const ComputerScalarFieldEnum: {
    readonly id: "id";
    readonly glpiId: "glpiId";
    readonly hostname: "hostname";
    readonly hostFisico: "hostFisico";
    readonly nameHaperv: "nameHaperv";
    readonly mainIp: "mainIp";
    readonly alternateUser: "alternateUser";
    readonly user: "user";
    readonly type: "type";
    readonly role: "role";
    readonly manufacturer: "manufacturer";
    readonly modelName: "modelName";
    readonly serial: "serial";
    readonly osName: "osName";
    readonly osVersion: "osVersion";
    readonly osArch: "osArch";
    readonly cpu: "cpu";
    readonly ram: "ram";
    readonly hd: "hd";
    readonly statusId: "statusId";
    readonly locationId: "locationId";
    readonly deviceModelId: "deviceModelId";
    readonly lastSync: "lastSync";
};
export type ComputerScalarFieldEnum = (typeof ComputerScalarFieldEnum)[keyof typeof ComputerScalarFieldEnum];
export declare const NetworkInterfaceScalarFieldEnum: {
    readonly id: "id";
    readonly glpiId: "glpiId";
    readonly name: "name";
    readonly macAddress: "macAddress";
    readonly ipAddress: "ipAddress";
    readonly computerId: "computerId";
};
export type NetworkInterfaceScalarFieldEnum = (typeof NetworkInterfaceScalarFieldEnum)[keyof typeof NetworkInterfaceScalarFieldEnum];
export declare const VolumeScalarFieldEnum: {
    readonly id: "id";
    readonly glpiId: "glpiId";
    readonly mountPoint: "mountPoint";
    readonly capacityGb: "capacityGb";
    readonly computerId: "computerId";
};
export type VolumeScalarFieldEnum = (typeof VolumeScalarFieldEnum)[keyof typeof VolumeScalarFieldEnum];
export declare const SoftwareScalarFieldEnum: {
    readonly id: "id";
    readonly glpiId: "glpiId";
    readonly name: "name";
    readonly version: "version";
    readonly publisher: "publisher";
};
export type SoftwareScalarFieldEnum = (typeof SoftwareScalarFieldEnum)[keyof typeof SoftwareScalarFieldEnum];
export declare const SoftwareOnComputerScalarFieldEnum: {
    readonly computerId: "computerId";
    readonly softwareId: "softwareId";
};
export type SoftwareOnComputerScalarFieldEnum = (typeof SoftwareOnComputerScalarFieldEnum)[keyof typeof SoftwareOnComputerScalarFieldEnum];
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
