import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "assignment" | "status" | "deviceModel" | "department" | "location" | "computer" | "networkInterface" | "volume" | "software" | "softwareOnComputer";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Assignment: {
            payload: Prisma.$AssignmentPayload<ExtArgs>;
            fields: Prisma.AssignmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssignmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssignmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                findFirst: {
                    args: Prisma.AssignmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssignmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                findMany: {
                    args: Prisma.AssignmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>[];
                };
                create: {
                    args: Prisma.AssignmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                createMany: {
                    args: Prisma.AssignmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssignmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>[];
                };
                delete: {
                    args: Prisma.AssignmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                update: {
                    args: Prisma.AssignmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                deleteMany: {
                    args: Prisma.AssignmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssignmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssignmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>[];
                };
                upsert: {
                    args: Prisma.AssignmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssignmentPayload>;
                };
                aggregate: {
                    args: Prisma.AssignmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssignment>;
                };
                groupBy: {
                    args: Prisma.AssignmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssignmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssignmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssignmentCountAggregateOutputType> | number;
                };
            };
        };
        Status: {
            payload: Prisma.$StatusPayload<ExtArgs>;
            fields: Prisma.StatusFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StatusFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StatusFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                findFirst: {
                    args: Prisma.StatusFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StatusFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                findMany: {
                    args: Prisma.StatusFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>[];
                };
                create: {
                    args: Prisma.StatusCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                createMany: {
                    args: Prisma.StatusCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StatusCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>[];
                };
                delete: {
                    args: Prisma.StatusDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                update: {
                    args: Prisma.StatusUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                deleteMany: {
                    args: Prisma.StatusDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StatusUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StatusUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>[];
                };
                upsert: {
                    args: Prisma.StatusUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusPayload>;
                };
                aggregate: {
                    args: Prisma.StatusAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStatus>;
                };
                groupBy: {
                    args: Prisma.StatusGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StatusGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StatusCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StatusCountAggregateOutputType> | number;
                };
            };
        };
        DeviceModel: {
            payload: Prisma.$DeviceModelPayload<ExtArgs>;
            fields: Prisma.DeviceModelFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DeviceModelFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DeviceModelFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                findFirst: {
                    args: Prisma.DeviceModelFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DeviceModelFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                findMany: {
                    args: Prisma.DeviceModelFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>[];
                };
                create: {
                    args: Prisma.DeviceModelCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                createMany: {
                    args: Prisma.DeviceModelCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DeviceModelCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>[];
                };
                delete: {
                    args: Prisma.DeviceModelDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                update: {
                    args: Prisma.DeviceModelUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                deleteMany: {
                    args: Prisma.DeviceModelDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DeviceModelUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DeviceModelUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>[];
                };
                upsert: {
                    args: Prisma.DeviceModelUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DeviceModelPayload>;
                };
                aggregate: {
                    args: Prisma.DeviceModelAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDeviceModel>;
                };
                groupBy: {
                    args: Prisma.DeviceModelGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceModelGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DeviceModelCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DeviceModelCountAggregateOutputType> | number;
                };
            };
        };
        Department: {
            payload: Prisma.$DepartmentPayload<ExtArgs>;
            fields: Prisma.DepartmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DepartmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                findFirst: {
                    args: Prisma.DepartmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                findMany: {
                    args: Prisma.DepartmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                create: {
                    args: Prisma.DepartmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                createMany: {
                    args: Prisma.DepartmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                delete: {
                    args: Prisma.DepartmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                update: {
                    args: Prisma.DepartmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                deleteMany: {
                    args: Prisma.DepartmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DepartmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>[];
                };
                upsert: {
                    args: Prisma.DepartmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DepartmentPayload>;
                };
                aggregate: {
                    args: Prisma.DepartmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDepartment>;
                };
                groupBy: {
                    args: Prisma.DepartmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepartmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DepartmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DepartmentCountAggregateOutputType> | number;
                };
            };
        };
        Location: {
            payload: Prisma.$LocationPayload<ExtArgs>;
            fields: Prisma.LocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findFirst: {
                    args: Prisma.LocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                findMany: {
                    args: Prisma.LocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                create: {
                    args: Prisma.LocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                createMany: {
                    args: Prisma.LocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                delete: {
                    args: Prisma.LocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                update: {
                    args: Prisma.LocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                deleteMany: {
                    args: Prisma.LocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>[];
                };
                upsert: {
                    args: Prisma.LocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LocationPayload>;
                };
                aggregate: {
                    args: Prisma.LocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLocation>;
                };
                groupBy: {
                    args: Prisma.LocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LocationCountAggregateOutputType> | number;
                };
            };
        };
        Computer: {
            payload: Prisma.$ComputerPayload<ExtArgs>;
            fields: Prisma.ComputerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ComputerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ComputerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                findFirst: {
                    args: Prisma.ComputerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ComputerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                findMany: {
                    args: Prisma.ComputerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>[];
                };
                create: {
                    args: Prisma.ComputerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                createMany: {
                    args: Prisma.ComputerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ComputerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>[];
                };
                delete: {
                    args: Prisma.ComputerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                update: {
                    args: Prisma.ComputerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                deleteMany: {
                    args: Prisma.ComputerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ComputerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ComputerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>[];
                };
                upsert: {
                    args: Prisma.ComputerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ComputerPayload>;
                };
                aggregate: {
                    args: Prisma.ComputerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComputer>;
                };
                groupBy: {
                    args: Prisma.ComputerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComputerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ComputerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ComputerCountAggregateOutputType> | number;
                };
            };
        };
        NetworkInterface: {
            payload: Prisma.$NetworkInterfacePayload<ExtArgs>;
            fields: Prisma.NetworkInterfaceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NetworkInterfaceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NetworkInterfaceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                findFirst: {
                    args: Prisma.NetworkInterfaceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NetworkInterfaceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                findMany: {
                    args: Prisma.NetworkInterfaceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>[];
                };
                create: {
                    args: Prisma.NetworkInterfaceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                createMany: {
                    args: Prisma.NetworkInterfaceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NetworkInterfaceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>[];
                };
                delete: {
                    args: Prisma.NetworkInterfaceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                update: {
                    args: Prisma.NetworkInterfaceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                deleteMany: {
                    args: Prisma.NetworkInterfaceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NetworkInterfaceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NetworkInterfaceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>[];
                };
                upsert: {
                    args: Prisma.NetworkInterfaceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NetworkInterfacePayload>;
                };
                aggregate: {
                    args: Prisma.NetworkInterfaceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNetworkInterface>;
                };
                groupBy: {
                    args: Prisma.NetworkInterfaceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NetworkInterfaceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NetworkInterfaceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NetworkInterfaceCountAggregateOutputType> | number;
                };
            };
        };
        Volume: {
            payload: Prisma.$VolumePayload<ExtArgs>;
            fields: Prisma.VolumeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VolumeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VolumeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                findFirst: {
                    args: Prisma.VolumeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VolumeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                findMany: {
                    args: Prisma.VolumeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>[];
                };
                create: {
                    args: Prisma.VolumeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                createMany: {
                    args: Prisma.VolumeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VolumeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>[];
                };
                delete: {
                    args: Prisma.VolumeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                update: {
                    args: Prisma.VolumeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                deleteMany: {
                    args: Prisma.VolumeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VolumeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VolumeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>[];
                };
                upsert: {
                    args: Prisma.VolumeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VolumePayload>;
                };
                aggregate: {
                    args: Prisma.VolumeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVolume>;
                };
                groupBy: {
                    args: Prisma.VolumeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VolumeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VolumeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VolumeCountAggregateOutputType> | number;
                };
            };
        };
        Software: {
            payload: Prisma.$SoftwarePayload<ExtArgs>;
            fields: Prisma.SoftwareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                findMany: {
                    args: Prisma.SoftwareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                create: {
                    args: Prisma.SoftwareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                createMany: {
                    args: Prisma.SoftwareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                delete: {
                    args: Prisma.SoftwareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                update: {
                    args: Prisma.SoftwareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwarePayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftware>;
                };
                groupBy: {
                    args: Prisma.SoftwareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareCountAggregateOutputType> | number;
                };
            };
        };
        SoftwareOnComputer: {
            payload: Prisma.$SoftwareOnComputerPayload<ExtArgs>;
            fields: Prisma.SoftwareOnComputerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SoftwareOnComputerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SoftwareOnComputerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                findFirst: {
                    args: Prisma.SoftwareOnComputerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SoftwareOnComputerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                findMany: {
                    args: Prisma.SoftwareOnComputerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>[];
                };
                create: {
                    args: Prisma.SoftwareOnComputerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                createMany: {
                    args: Prisma.SoftwareOnComputerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SoftwareOnComputerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>[];
                };
                delete: {
                    args: Prisma.SoftwareOnComputerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                update: {
                    args: Prisma.SoftwareOnComputerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                deleteMany: {
                    args: Prisma.SoftwareOnComputerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SoftwareOnComputerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SoftwareOnComputerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>[];
                };
                upsert: {
                    args: Prisma.SoftwareOnComputerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SoftwareOnComputerPayload>;
                };
                aggregate: {
                    args: Prisma.SoftwareOnComputerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSoftwareOnComputer>;
                };
                groupBy: {
                    args: Prisma.SoftwareOnComputerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareOnComputerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SoftwareOnComputerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SoftwareOnComputerCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumComputerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerType'>;
export type ListEnumComputerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerType[]'>;
export type EnumComputerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerRole'>;
export type ListEnumComputerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ComputerRole[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    assignment?: Prisma.AssignmentOmit;
    status?: Prisma.StatusOmit;
    deviceModel?: Prisma.DeviceModelOmit;
    department?: Prisma.DepartmentOmit;
    location?: Prisma.LocationOmit;
    computer?: Prisma.ComputerOmit;
    networkInterface?: Prisma.NetworkInterfaceOmit;
    volume?: Prisma.VolumeOmit;
    software?: Prisma.SoftwareOmit;
    softwareOnComputer?: Prisma.SoftwareOnComputerOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
