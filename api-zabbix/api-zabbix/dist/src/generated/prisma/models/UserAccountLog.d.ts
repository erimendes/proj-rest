import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserAccountLogModel = runtime.Types.Result.DefaultSelection<Prisma.$UserAccountLogPayload>;
export type AggregateUserAccountLog = {
    _count: UserAccountLogCountAggregateOutputType | null;
    _avg: UserAccountLogAvgAggregateOutputType | null;
    _sum: UserAccountLogSumAggregateOutputType | null;
    _min: UserAccountLogMinAggregateOutputType | null;
    _max: UserAccountLogMaxAggregateOutputType | null;
};
export type UserAccountLogAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type UserAccountLogSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type UserAccountLogMinAggregateOutputType = {
    id: number | null;
    event: $Enums.AccountStatusEvent | null;
    reason: string | null;
    adminUser: string | null;
    ipAddress: string | null;
    userId: number | null;
    createdAt: Date | null;
};
export type UserAccountLogMaxAggregateOutputType = {
    id: number | null;
    event: $Enums.AccountStatusEvent | null;
    reason: string | null;
    adminUser: string | null;
    ipAddress: string | null;
    userId: number | null;
    createdAt: Date | null;
};
export type UserAccountLogCountAggregateOutputType = {
    id: number;
    event: number;
    reason: number;
    adminUser: number;
    ipAddress: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type UserAccountLogAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type UserAccountLogSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type UserAccountLogMinAggregateInputType = {
    id?: true;
    event?: true;
    reason?: true;
    adminUser?: true;
    ipAddress?: true;
    userId?: true;
    createdAt?: true;
};
export type UserAccountLogMaxAggregateInputType = {
    id?: true;
    event?: true;
    reason?: true;
    adminUser?: true;
    ipAddress?: true;
    userId?: true;
    createdAt?: true;
};
export type UserAccountLogCountAggregateInputType = {
    id?: true;
    event?: true;
    reason?: true;
    adminUser?: true;
    ipAddress?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type UserAccountLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAccountLogWhereInput;
    orderBy?: Prisma.UserAccountLogOrderByWithRelationInput | Prisma.UserAccountLogOrderByWithRelationInput[];
    cursor?: Prisma.UserAccountLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserAccountLogCountAggregateInputType;
    _avg?: UserAccountLogAvgAggregateInputType;
    _sum?: UserAccountLogSumAggregateInputType;
    _min?: UserAccountLogMinAggregateInputType;
    _max?: UserAccountLogMaxAggregateInputType;
};
export type GetUserAccountLogAggregateType<T extends UserAccountLogAggregateArgs> = {
    [P in keyof T & keyof AggregateUserAccountLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserAccountLog[P]> : Prisma.GetScalarType<T[P], AggregateUserAccountLog[P]>;
};
export type UserAccountLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAccountLogWhereInput;
    orderBy?: Prisma.UserAccountLogOrderByWithAggregationInput | Prisma.UserAccountLogOrderByWithAggregationInput[];
    by: Prisma.UserAccountLogScalarFieldEnum[] | Prisma.UserAccountLogScalarFieldEnum;
    having?: Prisma.UserAccountLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserAccountLogCountAggregateInputType | true;
    _avg?: UserAccountLogAvgAggregateInputType;
    _sum?: UserAccountLogSumAggregateInputType;
    _min?: UserAccountLogMinAggregateInputType;
    _max?: UserAccountLogMaxAggregateInputType;
};
export type UserAccountLogGroupByOutputType = {
    id: number;
    event: $Enums.AccountStatusEvent;
    reason: string | null;
    adminUser: string | null;
    ipAddress: string | null;
    userId: number;
    createdAt: Date;
    _count: UserAccountLogCountAggregateOutputType | null;
    _avg: UserAccountLogAvgAggregateOutputType | null;
    _sum: UserAccountLogSumAggregateOutputType | null;
    _min: UserAccountLogMinAggregateOutputType | null;
    _max: UserAccountLogMaxAggregateOutputType | null;
};
export type GetUserAccountLogGroupByPayload<T extends UserAccountLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserAccountLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserAccountLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserAccountLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserAccountLogGroupByOutputType[P]>;
}>>;
export type UserAccountLogWhereInput = {
    AND?: Prisma.UserAccountLogWhereInput | Prisma.UserAccountLogWhereInput[];
    OR?: Prisma.UserAccountLogWhereInput[];
    NOT?: Prisma.UserAccountLogWhereInput | Prisma.UserAccountLogWhereInput[];
    id?: Prisma.IntFilter<"UserAccountLog"> | number;
    event?: Prisma.EnumAccountStatusEventFilter<"UserAccountLog"> | $Enums.AccountStatusEvent;
    reason?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    adminUser?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    userId?: Prisma.IntFilter<"UserAccountLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserAccountLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserAccountLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserAccountLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.UserAccountLogWhereInput | Prisma.UserAccountLogWhereInput[];
    OR?: Prisma.UserAccountLogWhereInput[];
    NOT?: Prisma.UserAccountLogWhereInput | Prisma.UserAccountLogWhereInput[];
    event?: Prisma.EnumAccountStatusEventFilter<"UserAccountLog"> | $Enums.AccountStatusEvent;
    reason?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    adminUser?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    userId?: Prisma.IntFilter<"UserAccountLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserAccountLog"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type UserAccountLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    adminUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserAccountLogCountOrderByAggregateInput;
    _avg?: Prisma.UserAccountLogAvgOrderByAggregateInput;
    _max?: Prisma.UserAccountLogMaxOrderByAggregateInput;
    _min?: Prisma.UserAccountLogMinOrderByAggregateInput;
    _sum?: Prisma.UserAccountLogSumOrderByAggregateInput;
};
export type UserAccountLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserAccountLogScalarWhereWithAggregatesInput | Prisma.UserAccountLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserAccountLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserAccountLogScalarWhereWithAggregatesInput | Prisma.UserAccountLogScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"UserAccountLog"> | number;
    event?: Prisma.EnumAccountStatusEventWithAggregatesFilter<"UserAccountLog"> | $Enums.AccountStatusEvent;
    reason?: Prisma.StringNullableWithAggregatesFilter<"UserAccountLog"> | string | null;
    adminUser?: Prisma.StringNullableWithAggregatesFilter<"UserAccountLog"> | string | null;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"UserAccountLog"> | string | null;
    userId?: Prisma.IntWithAggregatesFilter<"UserAccountLog"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserAccountLog"> | Date | string;
};
export type UserAccountLogCreateInput = {
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutAccountLogsInput;
};
export type UserAccountLogUncheckedCreateInput = {
    id?: number;
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    userId: number;
    createdAt?: Date | string;
};
export type UserAccountLogUpdateInput = {
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutAccountLogsNestedInput;
};
export type UserAccountLogUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogCreateManyInput = {
    id?: number;
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    userId: number;
    createdAt?: Date | string;
};
export type UserAccountLogUpdateManyMutationInput = {
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogListRelationFilter = {
    every?: Prisma.UserAccountLogWhereInput;
    some?: Prisma.UserAccountLogWhereInput;
    none?: Prisma.UserAccountLogWhereInput;
};
export type UserAccountLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserAccountLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adminUser?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAccountLogAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type UserAccountLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adminUser?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAccountLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    event?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adminUser?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserAccountLogSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type UserAccountLogCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput> | Prisma.UserAccountLogCreateWithoutUserInput[] | Prisma.UserAccountLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAccountLogCreateOrConnectWithoutUserInput | Prisma.UserAccountLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserAccountLogCreateManyUserInputEnvelope;
    connect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
};
export type UserAccountLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput> | Prisma.UserAccountLogCreateWithoutUserInput[] | Prisma.UserAccountLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAccountLogCreateOrConnectWithoutUserInput | Prisma.UserAccountLogCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserAccountLogCreateManyUserInputEnvelope;
    connect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
};
export type UserAccountLogUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput> | Prisma.UserAccountLogCreateWithoutUserInput[] | Prisma.UserAccountLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAccountLogCreateOrConnectWithoutUserInput | Prisma.UserAccountLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserAccountLogUpsertWithWhereUniqueWithoutUserInput | Prisma.UserAccountLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserAccountLogCreateManyUserInputEnvelope;
    set?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    disconnect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    delete?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    connect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    update?: Prisma.UserAccountLogUpdateWithWhereUniqueWithoutUserInput | Prisma.UserAccountLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserAccountLogUpdateManyWithWhereWithoutUserInput | Prisma.UserAccountLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserAccountLogScalarWhereInput | Prisma.UserAccountLogScalarWhereInput[];
};
export type UserAccountLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput> | Prisma.UserAccountLogCreateWithoutUserInput[] | Prisma.UserAccountLogUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserAccountLogCreateOrConnectWithoutUserInput | Prisma.UserAccountLogCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserAccountLogUpsertWithWhereUniqueWithoutUserInput | Prisma.UserAccountLogUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserAccountLogCreateManyUserInputEnvelope;
    set?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    disconnect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    delete?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    connect?: Prisma.UserAccountLogWhereUniqueInput | Prisma.UserAccountLogWhereUniqueInput[];
    update?: Prisma.UserAccountLogUpdateWithWhereUniqueWithoutUserInput | Prisma.UserAccountLogUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserAccountLogUpdateManyWithWhereWithoutUserInput | Prisma.UserAccountLogUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserAccountLogScalarWhereInput | Prisma.UserAccountLogScalarWhereInput[];
};
export type EnumAccountStatusEventFieldUpdateOperationsInput = {
    set?: $Enums.AccountStatusEvent;
};
export type UserAccountLogCreateWithoutUserInput = {
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type UserAccountLogUncheckedCreateWithoutUserInput = {
    id?: number;
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type UserAccountLogCreateOrConnectWithoutUserInput = {
    where: Prisma.UserAccountLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput>;
};
export type UserAccountLogCreateManyUserInputEnvelope = {
    data: Prisma.UserAccountLogCreateManyUserInput | Prisma.UserAccountLogCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserAccountLogUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserAccountLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserAccountLogUpdateWithoutUserInput, Prisma.UserAccountLogUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserAccountLogCreateWithoutUserInput, Prisma.UserAccountLogUncheckedCreateWithoutUserInput>;
};
export type UserAccountLogUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserAccountLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserAccountLogUpdateWithoutUserInput, Prisma.UserAccountLogUncheckedUpdateWithoutUserInput>;
};
export type UserAccountLogUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserAccountLogScalarWhereInput;
    data: Prisma.XOR<Prisma.UserAccountLogUpdateManyMutationInput, Prisma.UserAccountLogUncheckedUpdateManyWithoutUserInput>;
};
export type UserAccountLogScalarWhereInput = {
    AND?: Prisma.UserAccountLogScalarWhereInput | Prisma.UserAccountLogScalarWhereInput[];
    OR?: Prisma.UserAccountLogScalarWhereInput[];
    NOT?: Prisma.UserAccountLogScalarWhereInput | Prisma.UserAccountLogScalarWhereInput[];
    id?: Prisma.IntFilter<"UserAccountLog"> | number;
    event?: Prisma.EnumAccountStatusEventFilter<"UserAccountLog"> | $Enums.AccountStatusEvent;
    reason?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    adminUser?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"UserAccountLog"> | string | null;
    userId?: Prisma.IntFilter<"UserAccountLog"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserAccountLog"> | Date | string;
};
export type UserAccountLogCreateManyUserInput = {
    id?: number;
    event?: $Enums.AccountStatusEvent;
    reason?: string | null;
    adminUser?: string | null;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type UserAccountLogUpdateWithoutUserInput = {
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    event?: Prisma.EnumAccountStatusEventFieldUpdateOperationsInput | $Enums.AccountStatusEvent;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adminUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserAccountLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    event?: boolean;
    reason?: boolean;
    adminUser?: boolean;
    ipAddress?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userAccountLog"]>;
export type UserAccountLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    event?: boolean;
    reason?: boolean;
    adminUser?: boolean;
    ipAddress?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userAccountLog"]>;
export type UserAccountLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    event?: boolean;
    reason?: boolean;
    adminUser?: boolean;
    ipAddress?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userAccountLog"]>;
export type UserAccountLogSelectScalar = {
    id?: boolean;
    event?: boolean;
    reason?: boolean;
    adminUser?: boolean;
    ipAddress?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type UserAccountLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "event" | "reason" | "adminUser" | "ipAddress" | "userId" | "createdAt", ExtArgs["result"]["userAccountLog"]>;
export type UserAccountLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserAccountLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserAccountLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserAccountLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserAccountLog";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        event: $Enums.AccountStatusEvent;
        reason: string | null;
        adminUser: string | null;
        ipAddress: string | null;
        userId: number;
        createdAt: Date;
    }, ExtArgs["result"]["userAccountLog"]>;
    composites: {};
};
export type UserAccountLogGetPayload<S extends boolean | null | undefined | UserAccountLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload, S>;
export type UserAccountLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserAccountLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserAccountLogCountAggregateInputType | true;
};
export interface UserAccountLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserAccountLog'];
        meta: {
            name: 'UserAccountLog';
        };
    };
    findUnique<T extends UserAccountLogFindUniqueArgs>(args: Prisma.SelectSubset<T, UserAccountLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserAccountLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserAccountLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserAccountLogFindFirstArgs>(args?: Prisma.SelectSubset<T, UserAccountLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserAccountLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserAccountLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserAccountLogFindManyArgs>(args?: Prisma.SelectSubset<T, UserAccountLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserAccountLogCreateArgs>(args: Prisma.SelectSubset<T, UserAccountLogCreateArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserAccountLogCreateManyArgs>(args?: Prisma.SelectSubset<T, UserAccountLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserAccountLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserAccountLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserAccountLogDeleteArgs>(args: Prisma.SelectSubset<T, UserAccountLogDeleteArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserAccountLogUpdateArgs>(args: Prisma.SelectSubset<T, UserAccountLogUpdateArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserAccountLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserAccountLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserAccountLogUpdateManyArgs>(args: Prisma.SelectSubset<T, UserAccountLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserAccountLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserAccountLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserAccountLogUpsertArgs>(args: Prisma.SelectSubset<T, UserAccountLogUpsertArgs<ExtArgs>>): Prisma.Prisma__UserAccountLogClient<runtime.Types.Result.GetResult<Prisma.$UserAccountLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserAccountLogCountArgs>(args?: Prisma.Subset<T, UserAccountLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserAccountLogCountAggregateOutputType> : number>;
    aggregate<T extends UserAccountLogAggregateArgs>(args: Prisma.Subset<T, UserAccountLogAggregateArgs>): Prisma.PrismaPromise<GetUserAccountLogAggregateType<T>>;
    groupBy<T extends UserAccountLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserAccountLogGroupByArgs['orderBy'];
    } : {
        orderBy?: UserAccountLogGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserAccountLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccountLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserAccountLogFieldRefs;
}
export interface Prisma__UserAccountLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserAccountLogFieldRefs {
    readonly id: Prisma.FieldRef<"UserAccountLog", 'Int'>;
    readonly event: Prisma.FieldRef<"UserAccountLog", 'AccountStatusEvent'>;
    readonly reason: Prisma.FieldRef<"UserAccountLog", 'String'>;
    readonly adminUser: Prisma.FieldRef<"UserAccountLog", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"UserAccountLog", 'String'>;
    readonly userId: Prisma.FieldRef<"UserAccountLog", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"UserAccountLog", 'DateTime'>;
}
export type UserAccountLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where: Prisma.UserAccountLogWhereUniqueInput;
};
export type UserAccountLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where: Prisma.UserAccountLogWhereUniqueInput;
};
export type UserAccountLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where?: Prisma.UserAccountLogWhereInput;
    orderBy?: Prisma.UserAccountLogOrderByWithRelationInput | Prisma.UserAccountLogOrderByWithRelationInput[];
    cursor?: Prisma.UserAccountLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAccountLogScalarFieldEnum | Prisma.UserAccountLogScalarFieldEnum[];
};
export type UserAccountLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where?: Prisma.UserAccountLogWhereInput;
    orderBy?: Prisma.UserAccountLogOrderByWithRelationInput | Prisma.UserAccountLogOrderByWithRelationInput[];
    cursor?: Prisma.UserAccountLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAccountLogScalarFieldEnum | Prisma.UserAccountLogScalarFieldEnum[];
};
export type UserAccountLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where?: Prisma.UserAccountLogWhereInput;
    orderBy?: Prisma.UserAccountLogOrderByWithRelationInput | Prisma.UserAccountLogOrderByWithRelationInput[];
    cursor?: Prisma.UserAccountLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserAccountLogScalarFieldEnum | Prisma.UserAccountLogScalarFieldEnum[];
};
export type UserAccountLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAccountLogCreateInput, Prisma.UserAccountLogUncheckedCreateInput>;
};
export type UserAccountLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserAccountLogCreateManyInput | Prisma.UserAccountLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserAccountLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    data: Prisma.UserAccountLogCreateManyInput | Prisma.UserAccountLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserAccountLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserAccountLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAccountLogUpdateInput, Prisma.UserAccountLogUncheckedUpdateInput>;
    where: Prisma.UserAccountLogWhereUniqueInput;
};
export type UserAccountLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserAccountLogUpdateManyMutationInput, Prisma.UserAccountLogUncheckedUpdateManyInput>;
    where?: Prisma.UserAccountLogWhereInput;
    limit?: number;
};
export type UserAccountLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserAccountLogUpdateManyMutationInput, Prisma.UserAccountLogUncheckedUpdateManyInput>;
    where?: Prisma.UserAccountLogWhereInput;
    limit?: number;
    include?: Prisma.UserAccountLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserAccountLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where: Prisma.UserAccountLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserAccountLogCreateInput, Prisma.UserAccountLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserAccountLogUpdateInput, Prisma.UserAccountLogUncheckedUpdateInput>;
};
export type UserAccountLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
    where: Prisma.UserAccountLogWhereUniqueInput;
};
export type UserAccountLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserAccountLogWhereInput;
    limit?: number;
};
export type UserAccountLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserAccountLogSelect<ExtArgs> | null;
    omit?: Prisma.UserAccountLogOmit<ExtArgs> | null;
    include?: Prisma.UserAccountLogInclude<ExtArgs> | null;
};
