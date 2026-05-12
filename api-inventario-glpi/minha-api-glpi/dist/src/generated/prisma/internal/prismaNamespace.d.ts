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
    readonly Session: "Session";
    readonly Ativo: "Ativo";
    readonly Aplicacao: "Aplicacao";
    readonly ConfigRede: "ConfigRede";
    readonly Software: "Software";
    readonly Licenca: "Licenca";
    readonly LicencaAtivo: "LicencaAtivo";
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
        modelProps: "user" | "session" | "ativo" | "aplicacao" | "configRede" | "software" | "licenca" | "licencaAtivo";
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
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        Ativo: {
            payload: Prisma.$AtivoPayload<ExtArgs>;
            fields: Prisma.AtivoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AtivoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AtivoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                findFirst: {
                    args: Prisma.AtivoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AtivoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                findMany: {
                    args: Prisma.AtivoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>[];
                };
                create: {
                    args: Prisma.AtivoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                createMany: {
                    args: Prisma.AtivoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AtivoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>[];
                };
                delete: {
                    args: Prisma.AtivoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                update: {
                    args: Prisma.AtivoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                deleteMany: {
                    args: Prisma.AtivoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AtivoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AtivoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>[];
                };
                upsert: {
                    args: Prisma.AtivoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AtivoPayload>;
                };
                aggregate: {
                    args: Prisma.AtivoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAtivo>;
                };
                groupBy: {
                    args: Prisma.AtivoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AtivoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AtivoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AtivoCountAggregateOutputType> | number;
                };
            };
        };
        Aplicacao: {
            payload: Prisma.$AplicacaoPayload<ExtArgs>;
            fields: Prisma.AplicacaoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AplicacaoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AplicacaoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                findFirst: {
                    args: Prisma.AplicacaoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AplicacaoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                findMany: {
                    args: Prisma.AplicacaoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>[];
                };
                create: {
                    args: Prisma.AplicacaoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                createMany: {
                    args: Prisma.AplicacaoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AplicacaoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>[];
                };
                delete: {
                    args: Prisma.AplicacaoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                update: {
                    args: Prisma.AplicacaoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                deleteMany: {
                    args: Prisma.AplicacaoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AplicacaoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AplicacaoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>[];
                };
                upsert: {
                    args: Prisma.AplicacaoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AplicacaoPayload>;
                };
                aggregate: {
                    args: Prisma.AplicacaoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAplicacao>;
                };
                groupBy: {
                    args: Prisma.AplicacaoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AplicacaoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AplicacaoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AplicacaoCountAggregateOutputType> | number;
                };
            };
        };
        ConfigRede: {
            payload: Prisma.$ConfigRedePayload<ExtArgs>;
            fields: Prisma.ConfigRedeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConfigRedeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConfigRedeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                findFirst: {
                    args: Prisma.ConfigRedeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConfigRedeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                findMany: {
                    args: Prisma.ConfigRedeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>[];
                };
                create: {
                    args: Prisma.ConfigRedeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                createMany: {
                    args: Prisma.ConfigRedeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConfigRedeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>[];
                };
                delete: {
                    args: Prisma.ConfigRedeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                update: {
                    args: Prisma.ConfigRedeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                deleteMany: {
                    args: Prisma.ConfigRedeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConfigRedeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConfigRedeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>[];
                };
                upsert: {
                    args: Prisma.ConfigRedeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigRedePayload>;
                };
                aggregate: {
                    args: Prisma.ConfigRedeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConfigRede>;
                };
                groupBy: {
                    args: Prisma.ConfigRedeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfigRedeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConfigRedeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConfigRedeCountAggregateOutputType> | number;
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
        Licenca: {
            payload: Prisma.$LicencaPayload<ExtArgs>;
            fields: Prisma.LicencaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LicencaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LicencaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                findFirst: {
                    args: Prisma.LicencaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LicencaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                findMany: {
                    args: Prisma.LicencaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>[];
                };
                create: {
                    args: Prisma.LicencaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                createMany: {
                    args: Prisma.LicencaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LicencaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>[];
                };
                delete: {
                    args: Prisma.LicencaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                update: {
                    args: Prisma.LicencaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                deleteMany: {
                    args: Prisma.LicencaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LicencaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LicencaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>[];
                };
                upsert: {
                    args: Prisma.LicencaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaPayload>;
                };
                aggregate: {
                    args: Prisma.LicencaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLicenca>;
                };
                groupBy: {
                    args: Prisma.LicencaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicencaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LicencaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicencaCountAggregateOutputType> | number;
                };
            };
        };
        LicencaAtivo: {
            payload: Prisma.$LicencaAtivoPayload<ExtArgs>;
            fields: Prisma.LicencaAtivoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LicencaAtivoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LicencaAtivoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                findFirst: {
                    args: Prisma.LicencaAtivoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LicencaAtivoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                findMany: {
                    args: Prisma.LicencaAtivoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>[];
                };
                create: {
                    args: Prisma.LicencaAtivoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                createMany: {
                    args: Prisma.LicencaAtivoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LicencaAtivoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>[];
                };
                delete: {
                    args: Prisma.LicencaAtivoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                update: {
                    args: Prisma.LicencaAtivoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                deleteMany: {
                    args: Prisma.LicencaAtivoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LicencaAtivoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LicencaAtivoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>[];
                };
                upsert: {
                    args: Prisma.LicencaAtivoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LicencaAtivoPayload>;
                };
                aggregate: {
                    args: Prisma.LicencaAtivoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLicencaAtivo>;
                };
                groupBy: {
                    args: Prisma.LicencaAtivoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicencaAtivoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LicencaAtivoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LicencaAtivoCountAggregateOutputType> | number;
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
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly departamento: "departamento";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly refreshToken: "refreshToken";
    readonly userId: "userId";
    readonly userAgent: "userAgent";
    readonly ip: "ip";
    readonly revoked: "revoked";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AtivoScalarFieldEnum: {
    readonly id: "id";
    readonly tagPatrimonial: "tagPatrimonial";
    readonly tipo: "tipo";
    readonly fabricante: "fabricante";
    readonly modelo: "modelo";
    readonly numSerie: "numSerie";
    readonly hostname: "hostname";
    readonly cpu: "cpu";
    readonly ram: "ram";
    readonly discoFisico: "discoFisico";
    readonly status: "status";
    readonly emUso: "emUso";
    readonly dataCompra: "dataCompra";
    readonly valor: "valor";
    readonly isVirtualizado: "isVirtualizado";
    readonly hyperVName: "hyperVName";
    readonly hostFisicoId: "hostFisicoId";
    readonly userId: "userId";
    readonly observacoes: "observacoes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AtivoScalarFieldEnum = (typeof AtivoScalarFieldEnum)[keyof typeof AtivoScalarFieldEnum];
export declare const AplicacaoScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly sigla: "sigla";
    readonly descricao: "descricao";
    readonly categoria: "categoria";
    readonly criticidade: "criticidade";
    readonly businessOwner: "businessOwner";
    readonly responsavelTecnico: "responsavelTecnico";
    readonly contatoFuncional: "contatoFuncional";
    readonly fornecedor: "fornecedor";
    readonly janelaOperacao: "janelaOperacao";
    readonly backupInfo: "backupInfo";
    readonly procedimentoRecup: "procedimentoRecup";
    readonly pontoUnicoFalha: "pontoUnicoFalha";
    readonly tecnologiaPrincipal: "tecnologiaPrincipal";
    readonly databaseInfo: "databaseInfo";
    readonly integracoes: "integracoes";
};
export type AplicacaoScalarFieldEnum = (typeof AplicacaoScalarFieldEnum)[keyof typeof AplicacaoScalarFieldEnum];
export declare const ConfigRedeScalarFieldEnum: {
    readonly id: "id";
    readonly ipAddress: "ipAddress";
    readonly macAddress: "macAddress";
    readonly vlan: "vlan";
    readonly portasUTP: "portasUTP";
    readonly portasFibra: "portasFibra";
    readonly storageConect: "storageConect";
    readonly discoStorage: "discoStorage";
    readonly ativoId: "ativoId";
};
export type ConfigRedeScalarFieldEnum = (typeof ConfigRedeScalarFieldEnum)[keyof typeof ConfigRedeScalarFieldEnum];
export declare const SoftwareScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly versao: "versao";
    readonly fabricante: "fabricante";
};
export type SoftwareScalarFieldEnum = (typeof SoftwareScalarFieldEnum)[keyof typeof SoftwareScalarFieldEnum];
export declare const LicencaScalarFieldEnum: {
    readonly id: "id";
    readonly chaveAtivacao: "chaveAtivacao";
    readonly dataExpiracao: "dataExpiracao";
    readonly softwareId: "softwareId";
};
export type LicencaScalarFieldEnum = (typeof LicencaScalarFieldEnum)[keyof typeof LicencaScalarFieldEnum];
export declare const LicencaAtivoScalarFieldEnum: {
    readonly id: "id";
    readonly ativoId: "ativoId";
    readonly licencaId: "licencaId";
    readonly dataInstalacao: "dataInstalacao";
};
export type LicencaAtivoScalarFieldEnum = (typeof LicencaAtivoScalarFieldEnum)[keyof typeof LicencaAtivoScalarFieldEnum];
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumAtivoTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AtivoTipo'>;
export type ListEnumAtivoTipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AtivoTipo[]'>;
export type EnumAtivoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AtivoStatus'>;
export type ListEnumAtivoStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AtivoStatus[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumSistemaCategoriaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SistemaCategoria'>;
export type ListEnumSistemaCategoriaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SistemaCategoria[]'>;
export type EnumCriticidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Criticidade'>;
export type ListEnumCriticidadeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Criticidade[]'>;
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
    session?: Prisma.SessionOmit;
    ativo?: Prisma.AtivoOmit;
    aplicacao?: Prisma.AplicacaoOmit;
    configRede?: Prisma.ConfigRedeOmit;
    software?: Prisma.SoftwareOmit;
    licenca?: Prisma.LicencaOmit;
    licencaAtivo?: Prisma.LicencaAtivoOmit;
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
