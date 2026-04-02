import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NetworkInterfaceModel = runtime.Types.Result.DefaultSelection<Prisma.$NetworkInterfacePayload>;
export type AggregateNetworkInterface = {
    _count: NetworkInterfaceCountAggregateOutputType | null;
    _avg: NetworkInterfaceAvgAggregateOutputType | null;
    _sum: NetworkInterfaceSumAggregateOutputType | null;
    _min: NetworkInterfaceMinAggregateOutputType | null;
    _max: NetworkInterfaceMaxAggregateOutputType | null;
};
export type NetworkInterfaceAvgAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    computerId: number | null;
};
export type NetworkInterfaceSumAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    computerId: number | null;
};
export type NetworkInterfaceMinAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    name: string | null;
    macAddress: string | null;
    ipAddress: string | null;
    computerId: number | null;
};
export type NetworkInterfaceMaxAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    name: string | null;
    macAddress: string | null;
    ipAddress: string | null;
    computerId: number | null;
};
export type NetworkInterfaceCountAggregateOutputType = {
    id: number;
    glpiId: number;
    name: number;
    macAddress: number;
    ipAddress: number;
    computerId: number;
    _all: number;
};
export type NetworkInterfaceAvgAggregateInputType = {
    id?: true;
    glpiId?: true;
    computerId?: true;
};
export type NetworkInterfaceSumAggregateInputType = {
    id?: true;
    glpiId?: true;
    computerId?: true;
};
export type NetworkInterfaceMinAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    macAddress?: true;
    ipAddress?: true;
    computerId?: true;
};
export type NetworkInterfaceMaxAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    macAddress?: true;
    ipAddress?: true;
    computerId?: true;
};
export type NetworkInterfaceCountAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    macAddress?: true;
    ipAddress?: true;
    computerId?: true;
    _all?: true;
};
export type NetworkInterfaceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NetworkInterfaceWhereInput;
    orderBy?: Prisma.NetworkInterfaceOrderByWithRelationInput | Prisma.NetworkInterfaceOrderByWithRelationInput[];
    cursor?: Prisma.NetworkInterfaceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NetworkInterfaceCountAggregateInputType;
    _avg?: NetworkInterfaceAvgAggregateInputType;
    _sum?: NetworkInterfaceSumAggregateInputType;
    _min?: NetworkInterfaceMinAggregateInputType;
    _max?: NetworkInterfaceMaxAggregateInputType;
};
export type GetNetworkInterfaceAggregateType<T extends NetworkInterfaceAggregateArgs> = {
    [P in keyof T & keyof AggregateNetworkInterface]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNetworkInterface[P]> : Prisma.GetScalarType<T[P], AggregateNetworkInterface[P]>;
};
export type NetworkInterfaceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NetworkInterfaceWhereInput;
    orderBy?: Prisma.NetworkInterfaceOrderByWithAggregationInput | Prisma.NetworkInterfaceOrderByWithAggregationInput[];
    by: Prisma.NetworkInterfaceScalarFieldEnum[] | Prisma.NetworkInterfaceScalarFieldEnum;
    having?: Prisma.NetworkInterfaceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NetworkInterfaceCountAggregateInputType | true;
    _avg?: NetworkInterfaceAvgAggregateInputType;
    _sum?: NetworkInterfaceSumAggregateInputType;
    _min?: NetworkInterfaceMinAggregateInputType;
    _max?: NetworkInterfaceMaxAggregateInputType;
};
export type NetworkInterfaceGroupByOutputType = {
    id: number;
    glpiId: number | null;
    name: string | null;
    macAddress: string | null;
    ipAddress: string | null;
    computerId: number;
    _count: NetworkInterfaceCountAggregateOutputType | null;
    _avg: NetworkInterfaceAvgAggregateOutputType | null;
    _sum: NetworkInterfaceSumAggregateOutputType | null;
    _min: NetworkInterfaceMinAggregateOutputType | null;
    _max: NetworkInterfaceMaxAggregateOutputType | null;
};
export type GetNetworkInterfaceGroupByPayload<T extends NetworkInterfaceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NetworkInterfaceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NetworkInterfaceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NetworkInterfaceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NetworkInterfaceGroupByOutputType[P]>;
}>>;
export type NetworkInterfaceWhereInput = {
    AND?: Prisma.NetworkInterfaceWhereInput | Prisma.NetworkInterfaceWhereInput[];
    OR?: Prisma.NetworkInterfaceWhereInput[];
    NOT?: Prisma.NetworkInterfaceWhereInput | Prisma.NetworkInterfaceWhereInput[];
    id?: Prisma.IntFilter<"NetworkInterface"> | number;
    glpiId?: Prisma.IntNullableFilter<"NetworkInterface"> | number | null;
    name?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    macAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    computerId?: Prisma.IntFilter<"NetworkInterface"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
};
export type NetworkInterfaceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    macAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    computer?: Prisma.ComputerOrderByWithRelationInput;
};
export type NetworkInterfaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.NetworkInterfaceWhereInput | Prisma.NetworkInterfaceWhereInput[];
    OR?: Prisma.NetworkInterfaceWhereInput[];
    NOT?: Prisma.NetworkInterfaceWhereInput | Prisma.NetworkInterfaceWhereInput[];
    glpiId?: Prisma.IntNullableFilter<"NetworkInterface"> | number | null;
    name?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    macAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    computerId?: Prisma.IntFilter<"NetworkInterface"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
}, "id">;
export type NetworkInterfaceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    macAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    _count?: Prisma.NetworkInterfaceCountOrderByAggregateInput;
    _avg?: Prisma.NetworkInterfaceAvgOrderByAggregateInput;
    _max?: Prisma.NetworkInterfaceMaxOrderByAggregateInput;
    _min?: Prisma.NetworkInterfaceMinOrderByAggregateInput;
    _sum?: Prisma.NetworkInterfaceSumOrderByAggregateInput;
};
export type NetworkInterfaceScalarWhereWithAggregatesInput = {
    AND?: Prisma.NetworkInterfaceScalarWhereWithAggregatesInput | Prisma.NetworkInterfaceScalarWhereWithAggregatesInput[];
    OR?: Prisma.NetworkInterfaceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NetworkInterfaceScalarWhereWithAggregatesInput | Prisma.NetworkInterfaceScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"NetworkInterface"> | number;
    glpiId?: Prisma.IntNullableWithAggregatesFilter<"NetworkInterface"> | number | null;
    name?: Prisma.StringNullableWithAggregatesFilter<"NetworkInterface"> | string | null;
    macAddress?: Prisma.StringNullableWithAggregatesFilter<"NetworkInterface"> | string | null;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"NetworkInterface"> | string | null;
    computerId?: Prisma.IntWithAggregatesFilter<"NetworkInterface"> | number;
};
export type NetworkInterfaceCreateInput = {
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
    computer: Prisma.ComputerCreateNestedOneWithoutNetworkInterfacesInput;
};
export type NetworkInterfaceUncheckedCreateInput = {
    id?: number;
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
    computerId: number;
};
export type NetworkInterfaceUpdateInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computer?: Prisma.ComputerUpdateOneRequiredWithoutNetworkInterfacesNestedInput;
};
export type NetworkInterfaceUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type NetworkInterfaceCreateManyInput = {
    id?: number;
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
    computerId: number;
};
export type NetworkInterfaceUpdateManyMutationInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NetworkInterfaceUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type NetworkInterfaceListRelationFilter = {
    every?: Prisma.NetworkInterfaceWhereInput;
    some?: Prisma.NetworkInterfaceWhereInput;
    none?: Prisma.NetworkInterfaceWhereInput;
};
export type NetworkInterfaceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NetworkInterfaceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type NetworkInterfaceAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type NetworkInterfaceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type NetworkInterfaceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type NetworkInterfaceSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type NetworkInterfaceCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput> | Prisma.NetworkInterfaceCreateWithoutComputerInput[] | Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput | Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.NetworkInterfaceCreateManyComputerInputEnvelope;
    connect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
};
export type NetworkInterfaceUncheckedCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput> | Prisma.NetworkInterfaceCreateWithoutComputerInput[] | Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput | Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.NetworkInterfaceCreateManyComputerInputEnvelope;
    connect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
};
export type NetworkInterfaceUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput> | Prisma.NetworkInterfaceCreateWithoutComputerInput[] | Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput | Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.NetworkInterfaceUpsertWithWhereUniqueWithoutComputerInput | Prisma.NetworkInterfaceUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.NetworkInterfaceCreateManyComputerInputEnvelope;
    set?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    disconnect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    delete?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    connect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    update?: Prisma.NetworkInterfaceUpdateWithWhereUniqueWithoutComputerInput | Prisma.NetworkInterfaceUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.NetworkInterfaceUpdateManyWithWhereWithoutComputerInput | Prisma.NetworkInterfaceUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.NetworkInterfaceScalarWhereInput | Prisma.NetworkInterfaceScalarWhereInput[];
};
export type NetworkInterfaceUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput> | Prisma.NetworkInterfaceCreateWithoutComputerInput[] | Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput | Prisma.NetworkInterfaceCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.NetworkInterfaceUpsertWithWhereUniqueWithoutComputerInput | Prisma.NetworkInterfaceUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.NetworkInterfaceCreateManyComputerInputEnvelope;
    set?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    disconnect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    delete?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    connect?: Prisma.NetworkInterfaceWhereUniqueInput | Prisma.NetworkInterfaceWhereUniqueInput[];
    update?: Prisma.NetworkInterfaceUpdateWithWhereUniqueWithoutComputerInput | Prisma.NetworkInterfaceUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.NetworkInterfaceUpdateManyWithWhereWithoutComputerInput | Prisma.NetworkInterfaceUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.NetworkInterfaceScalarWhereInput | Prisma.NetworkInterfaceScalarWhereInput[];
};
export type NetworkInterfaceCreateWithoutComputerInput = {
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
};
export type NetworkInterfaceUncheckedCreateWithoutComputerInput = {
    id?: number;
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
};
export type NetworkInterfaceCreateOrConnectWithoutComputerInput = {
    where: Prisma.NetworkInterfaceWhereUniqueInput;
    create: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput>;
};
export type NetworkInterfaceCreateManyComputerInputEnvelope = {
    data: Prisma.NetworkInterfaceCreateManyComputerInput | Prisma.NetworkInterfaceCreateManyComputerInput[];
    skipDuplicates?: boolean;
};
export type NetworkInterfaceUpsertWithWhereUniqueWithoutComputerInput = {
    where: Prisma.NetworkInterfaceWhereUniqueInput;
    update: Prisma.XOR<Prisma.NetworkInterfaceUpdateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedUpdateWithoutComputerInput>;
    create: Prisma.XOR<Prisma.NetworkInterfaceCreateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedCreateWithoutComputerInput>;
};
export type NetworkInterfaceUpdateWithWhereUniqueWithoutComputerInput = {
    where: Prisma.NetworkInterfaceWhereUniqueInput;
    data: Prisma.XOR<Prisma.NetworkInterfaceUpdateWithoutComputerInput, Prisma.NetworkInterfaceUncheckedUpdateWithoutComputerInput>;
};
export type NetworkInterfaceUpdateManyWithWhereWithoutComputerInput = {
    where: Prisma.NetworkInterfaceScalarWhereInput;
    data: Prisma.XOR<Prisma.NetworkInterfaceUpdateManyMutationInput, Prisma.NetworkInterfaceUncheckedUpdateManyWithoutComputerInput>;
};
export type NetworkInterfaceScalarWhereInput = {
    AND?: Prisma.NetworkInterfaceScalarWhereInput | Prisma.NetworkInterfaceScalarWhereInput[];
    OR?: Prisma.NetworkInterfaceScalarWhereInput[];
    NOT?: Prisma.NetworkInterfaceScalarWhereInput | Prisma.NetworkInterfaceScalarWhereInput[];
    id?: Prisma.IntFilter<"NetworkInterface"> | number;
    glpiId?: Prisma.IntNullableFilter<"NetworkInterface"> | number | null;
    name?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    macAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    ipAddress?: Prisma.StringNullableFilter<"NetworkInterface"> | string | null;
    computerId?: Prisma.IntFilter<"NetworkInterface"> | number;
};
export type NetworkInterfaceCreateManyComputerInput = {
    id?: number;
    glpiId?: number | null;
    name?: string | null;
    macAddress?: string | null;
    ipAddress?: string | null;
};
export type NetworkInterfaceUpdateWithoutComputerInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NetworkInterfaceUncheckedUpdateWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NetworkInterfaceUncheckedUpdateManyWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type NetworkInterfaceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    macAddress?: boolean;
    ipAddress?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["networkInterface"]>;
export type NetworkInterfaceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    macAddress?: boolean;
    ipAddress?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["networkInterface"]>;
export type NetworkInterfaceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    macAddress?: boolean;
    ipAddress?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["networkInterface"]>;
export type NetworkInterfaceSelectScalar = {
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    macAddress?: boolean;
    ipAddress?: boolean;
    computerId?: boolean;
};
export type NetworkInterfaceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "glpiId" | "name" | "macAddress" | "ipAddress" | "computerId", ExtArgs["result"]["networkInterface"]>;
export type NetworkInterfaceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type NetworkInterfaceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type NetworkInterfaceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type $NetworkInterfacePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NetworkInterface";
    objects: {
        computer: Prisma.$ComputerPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        glpiId: number | null;
        name: string | null;
        macAddress: string | null;
        ipAddress: string | null;
        computerId: number;
    }, ExtArgs["result"]["networkInterface"]>;
    composites: {};
};
export type NetworkInterfaceGetPayload<S extends boolean | null | undefined | NetworkInterfaceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload, S>;
export type NetworkInterfaceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NetworkInterfaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NetworkInterfaceCountAggregateInputType | true;
};
export interface NetworkInterfaceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NetworkInterface'];
        meta: {
            name: 'NetworkInterface';
        };
    };
    findUnique<T extends NetworkInterfaceFindUniqueArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NetworkInterfaceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NetworkInterfaceFindFirstArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceFindFirstArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NetworkInterfaceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NetworkInterfaceFindManyArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NetworkInterfaceCreateArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceCreateArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NetworkInterfaceCreateManyArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NetworkInterfaceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NetworkInterfaceDeleteArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceDeleteArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NetworkInterfaceUpdateArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceUpdateArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NetworkInterfaceDeleteManyArgs>(args?: Prisma.SelectSubset<T, NetworkInterfaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NetworkInterfaceUpdateManyArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NetworkInterfaceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NetworkInterfaceUpsertArgs>(args: Prisma.SelectSubset<T, NetworkInterfaceUpsertArgs<ExtArgs>>): Prisma.Prisma__NetworkInterfaceClient<runtime.Types.Result.GetResult<Prisma.$NetworkInterfacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NetworkInterfaceCountArgs>(args?: Prisma.Subset<T, NetworkInterfaceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NetworkInterfaceCountAggregateOutputType> : number>;
    aggregate<T extends NetworkInterfaceAggregateArgs>(args: Prisma.Subset<T, NetworkInterfaceAggregateArgs>): Prisma.PrismaPromise<GetNetworkInterfaceAggregateType<T>>;
    groupBy<T extends NetworkInterfaceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NetworkInterfaceGroupByArgs['orderBy'];
    } : {
        orderBy?: NetworkInterfaceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NetworkInterfaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNetworkInterfaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NetworkInterfaceFieldRefs;
}
export interface Prisma__NetworkInterfaceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computer<T extends Prisma.ComputerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ComputerDefaultArgs<ExtArgs>>): Prisma.Prisma__ComputerClient<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NetworkInterfaceFieldRefs {
    readonly id: Prisma.FieldRef<"NetworkInterface", 'Int'>;
    readonly glpiId: Prisma.FieldRef<"NetworkInterface", 'Int'>;
    readonly name: Prisma.FieldRef<"NetworkInterface", 'String'>;
    readonly macAddress: Prisma.FieldRef<"NetworkInterface", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"NetworkInterface", 'String'>;
    readonly computerId: Prisma.FieldRef<"NetworkInterface", 'Int'>;
}
export type NetworkInterfaceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where: Prisma.NetworkInterfaceWhereUniqueInput;
};
export type NetworkInterfaceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where: Prisma.NetworkInterfaceWhereUniqueInput;
};
export type NetworkInterfaceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where?: Prisma.NetworkInterfaceWhereInput;
    orderBy?: Prisma.NetworkInterfaceOrderByWithRelationInput | Prisma.NetworkInterfaceOrderByWithRelationInput[];
    cursor?: Prisma.NetworkInterfaceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NetworkInterfaceScalarFieldEnum | Prisma.NetworkInterfaceScalarFieldEnum[];
};
export type NetworkInterfaceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where?: Prisma.NetworkInterfaceWhereInput;
    orderBy?: Prisma.NetworkInterfaceOrderByWithRelationInput | Prisma.NetworkInterfaceOrderByWithRelationInput[];
    cursor?: Prisma.NetworkInterfaceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NetworkInterfaceScalarFieldEnum | Prisma.NetworkInterfaceScalarFieldEnum[];
};
export type NetworkInterfaceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where?: Prisma.NetworkInterfaceWhereInput;
    orderBy?: Prisma.NetworkInterfaceOrderByWithRelationInput | Prisma.NetworkInterfaceOrderByWithRelationInput[];
    cursor?: Prisma.NetworkInterfaceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NetworkInterfaceScalarFieldEnum | Prisma.NetworkInterfaceScalarFieldEnum[];
};
export type NetworkInterfaceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NetworkInterfaceCreateInput, Prisma.NetworkInterfaceUncheckedCreateInput>;
};
export type NetworkInterfaceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NetworkInterfaceCreateManyInput | Prisma.NetworkInterfaceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NetworkInterfaceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    data: Prisma.NetworkInterfaceCreateManyInput | Prisma.NetworkInterfaceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.NetworkInterfaceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NetworkInterfaceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NetworkInterfaceUpdateInput, Prisma.NetworkInterfaceUncheckedUpdateInput>;
    where: Prisma.NetworkInterfaceWhereUniqueInput;
};
export type NetworkInterfaceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NetworkInterfaceUpdateManyMutationInput, Prisma.NetworkInterfaceUncheckedUpdateManyInput>;
    where?: Prisma.NetworkInterfaceWhereInput;
    limit?: number;
};
export type NetworkInterfaceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NetworkInterfaceUpdateManyMutationInput, Prisma.NetworkInterfaceUncheckedUpdateManyInput>;
    where?: Prisma.NetworkInterfaceWhereInput;
    limit?: number;
    include?: Prisma.NetworkInterfaceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NetworkInterfaceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where: Prisma.NetworkInterfaceWhereUniqueInput;
    create: Prisma.XOR<Prisma.NetworkInterfaceCreateInput, Prisma.NetworkInterfaceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NetworkInterfaceUpdateInput, Prisma.NetworkInterfaceUncheckedUpdateInput>;
};
export type NetworkInterfaceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
    where: Prisma.NetworkInterfaceWhereUniqueInput;
};
export type NetworkInterfaceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NetworkInterfaceWhereInput;
    limit?: number;
};
export type NetworkInterfaceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NetworkInterfaceSelect<ExtArgs> | null;
    omit?: Prisma.NetworkInterfaceOmit<ExtArgs> | null;
    include?: Prisma.NetworkInterfaceInclude<ExtArgs> | null;
};
