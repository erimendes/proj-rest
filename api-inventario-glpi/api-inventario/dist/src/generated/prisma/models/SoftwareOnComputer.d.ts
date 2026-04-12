import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SoftwareOnComputerModel = runtime.Types.Result.DefaultSelection<Prisma.$SoftwareOnComputerPayload>;
export type AggregateSoftwareOnComputer = {
    _count: SoftwareOnComputerCountAggregateOutputType | null;
    _avg: SoftwareOnComputerAvgAggregateOutputType | null;
    _sum: SoftwareOnComputerSumAggregateOutputType | null;
    _min: SoftwareOnComputerMinAggregateOutputType | null;
    _max: SoftwareOnComputerMaxAggregateOutputType | null;
};
export type SoftwareOnComputerAvgAggregateOutputType = {
    computerId: number | null;
    softwareId: number | null;
};
export type SoftwareOnComputerSumAggregateOutputType = {
    computerId: number | null;
    softwareId: number | null;
};
export type SoftwareOnComputerMinAggregateOutputType = {
    computerId: number | null;
    softwareId: number | null;
};
export type SoftwareOnComputerMaxAggregateOutputType = {
    computerId: number | null;
    softwareId: number | null;
};
export type SoftwareOnComputerCountAggregateOutputType = {
    computerId: number;
    softwareId: number;
    _all: number;
};
export type SoftwareOnComputerAvgAggregateInputType = {
    computerId?: true;
    softwareId?: true;
};
export type SoftwareOnComputerSumAggregateInputType = {
    computerId?: true;
    softwareId?: true;
};
export type SoftwareOnComputerMinAggregateInputType = {
    computerId?: true;
    softwareId?: true;
};
export type SoftwareOnComputerMaxAggregateInputType = {
    computerId?: true;
    softwareId?: true;
};
export type SoftwareOnComputerCountAggregateInputType = {
    computerId?: true;
    softwareId?: true;
    _all?: true;
};
export type SoftwareOnComputerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareOnComputerWhereInput;
    orderBy?: Prisma.SoftwareOnComputerOrderByWithRelationInput | Prisma.SoftwareOnComputerOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareOnComputerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SoftwareOnComputerCountAggregateInputType;
    _avg?: SoftwareOnComputerAvgAggregateInputType;
    _sum?: SoftwareOnComputerSumAggregateInputType;
    _min?: SoftwareOnComputerMinAggregateInputType;
    _max?: SoftwareOnComputerMaxAggregateInputType;
};
export type GetSoftwareOnComputerAggregateType<T extends SoftwareOnComputerAggregateArgs> = {
    [P in keyof T & keyof AggregateSoftwareOnComputer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSoftwareOnComputer[P]> : Prisma.GetScalarType<T[P], AggregateSoftwareOnComputer[P]>;
};
export type SoftwareOnComputerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareOnComputerWhereInput;
    orderBy?: Prisma.SoftwareOnComputerOrderByWithAggregationInput | Prisma.SoftwareOnComputerOrderByWithAggregationInput[];
    by: Prisma.SoftwareOnComputerScalarFieldEnum[] | Prisma.SoftwareOnComputerScalarFieldEnum;
    having?: Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SoftwareOnComputerCountAggregateInputType | true;
    _avg?: SoftwareOnComputerAvgAggregateInputType;
    _sum?: SoftwareOnComputerSumAggregateInputType;
    _min?: SoftwareOnComputerMinAggregateInputType;
    _max?: SoftwareOnComputerMaxAggregateInputType;
};
export type SoftwareOnComputerGroupByOutputType = {
    computerId: number;
    softwareId: number;
    _count: SoftwareOnComputerCountAggregateOutputType | null;
    _avg: SoftwareOnComputerAvgAggregateOutputType | null;
    _sum: SoftwareOnComputerSumAggregateOutputType | null;
    _min: SoftwareOnComputerMinAggregateOutputType | null;
    _max: SoftwareOnComputerMaxAggregateOutputType | null;
};
export type GetSoftwareOnComputerGroupByPayload<T extends SoftwareOnComputerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SoftwareOnComputerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SoftwareOnComputerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SoftwareOnComputerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SoftwareOnComputerGroupByOutputType[P]>;
}>>;
export type SoftwareOnComputerWhereInput = {
    AND?: Prisma.SoftwareOnComputerWhereInput | Prisma.SoftwareOnComputerWhereInput[];
    OR?: Prisma.SoftwareOnComputerWhereInput[];
    NOT?: Prisma.SoftwareOnComputerWhereInput | Prisma.SoftwareOnComputerWhereInput[];
    computerId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
    softwareId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
    software?: Prisma.XOR<Prisma.SoftwareScalarRelationFilter, Prisma.SoftwareWhereInput>;
};
export type SoftwareOnComputerOrderByWithRelationInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
    computer?: Prisma.ComputerOrderByWithRelationInput;
    software?: Prisma.SoftwareOrderByWithRelationInput;
};
export type SoftwareOnComputerWhereUniqueInput = Prisma.AtLeast<{
    computerId_softwareId?: Prisma.SoftwareOnComputerComputerIdSoftwareIdCompoundUniqueInput;
    AND?: Prisma.SoftwareOnComputerWhereInput | Prisma.SoftwareOnComputerWhereInput[];
    OR?: Prisma.SoftwareOnComputerWhereInput[];
    NOT?: Prisma.SoftwareOnComputerWhereInput | Prisma.SoftwareOnComputerWhereInput[];
    computerId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
    softwareId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
    software?: Prisma.XOR<Prisma.SoftwareScalarRelationFilter, Prisma.SoftwareWhereInput>;
}, "computerId_softwareId">;
export type SoftwareOnComputerOrderByWithAggregationInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
    _count?: Prisma.SoftwareOnComputerCountOrderByAggregateInput;
    _avg?: Prisma.SoftwareOnComputerAvgOrderByAggregateInput;
    _max?: Prisma.SoftwareOnComputerMaxOrderByAggregateInput;
    _min?: Prisma.SoftwareOnComputerMinOrderByAggregateInput;
    _sum?: Prisma.SoftwareOnComputerSumOrderByAggregateInput;
};
export type SoftwareOnComputerScalarWhereWithAggregatesInput = {
    AND?: Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput | Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput[];
    OR?: Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput | Prisma.SoftwareOnComputerScalarWhereWithAggregatesInput[];
    computerId?: Prisma.IntWithAggregatesFilter<"SoftwareOnComputer"> | number;
    softwareId?: Prisma.IntWithAggregatesFilter<"SoftwareOnComputer"> | number;
};
export type SoftwareOnComputerCreateInput = {
    computer: Prisma.ComputerCreateNestedOneWithoutSoftwaresInput;
    software: Prisma.SoftwareCreateNestedOneWithoutComputersInput;
};
export type SoftwareOnComputerUncheckedCreateInput = {
    computerId: number;
    softwareId: number;
};
export type SoftwareOnComputerUpdateInput = {
    computer?: Prisma.ComputerUpdateOneRequiredWithoutSoftwaresNestedInput;
    software?: Prisma.SoftwareUpdateOneRequiredWithoutComputersNestedInput;
};
export type SoftwareOnComputerUncheckedUpdateInput = {
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerCreateManyInput = {
    computerId: number;
    softwareId: number;
};
export type SoftwareOnComputerUpdateManyMutationInput = {};
export type SoftwareOnComputerUncheckedUpdateManyInput = {
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerListRelationFilter = {
    every?: Prisma.SoftwareOnComputerWhereInput;
    some?: Prisma.SoftwareOnComputerWhereInput;
    none?: Prisma.SoftwareOnComputerWhereInput;
};
export type SoftwareOnComputerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SoftwareOnComputerComputerIdSoftwareIdCompoundUniqueInput = {
    computerId: number;
    softwareId: number;
};
export type SoftwareOnComputerCountOrderByAggregateInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type SoftwareOnComputerAvgOrderByAggregateInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type SoftwareOnComputerMaxOrderByAggregateInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type SoftwareOnComputerMinOrderByAggregateInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type SoftwareOnComputerSumOrderByAggregateInput = {
    computerId?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type SoftwareOnComputerCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput> | Prisma.SoftwareOnComputerCreateWithoutComputerInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManyComputerInputEnvelope;
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
};
export type SoftwareOnComputerUncheckedCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput> | Prisma.SoftwareOnComputerCreateWithoutComputerInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManyComputerInputEnvelope;
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
};
export type SoftwareOnComputerUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput> | Prisma.SoftwareOnComputerCreateWithoutComputerInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutComputerInput | Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManyComputerInputEnvelope;
    set?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    disconnect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    delete?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    update?: Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutComputerInput | Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutComputerInput | Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
};
export type SoftwareOnComputerUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput> | Prisma.SoftwareOnComputerCreateWithoutComputerInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutComputerInput | Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManyComputerInputEnvelope;
    set?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    disconnect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    delete?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    update?: Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutComputerInput | Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutComputerInput | Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
};
export type SoftwareOnComputerCreateNestedManyWithoutSoftwareInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput> | Prisma.SoftwareOnComputerCreateWithoutSoftwareInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManySoftwareInputEnvelope;
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
};
export type SoftwareOnComputerUncheckedCreateNestedManyWithoutSoftwareInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput> | Prisma.SoftwareOnComputerCreateWithoutSoftwareInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManySoftwareInputEnvelope;
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
};
export type SoftwareOnComputerUpdateManyWithoutSoftwareNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput> | Prisma.SoftwareOnComputerCreateWithoutSoftwareInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput[];
    upsert?: Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutSoftwareInput | Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutSoftwareInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManySoftwareInputEnvelope;
    set?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    disconnect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    delete?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    update?: Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutSoftwareInput | Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutSoftwareInput[];
    updateMany?: Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutSoftwareInput | Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutSoftwareInput[];
    deleteMany?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
};
export type SoftwareOnComputerUncheckedUpdateManyWithoutSoftwareNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput> | Prisma.SoftwareOnComputerCreateWithoutSoftwareInput[] | Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput | Prisma.SoftwareOnComputerCreateOrConnectWithoutSoftwareInput[];
    upsert?: Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutSoftwareInput | Prisma.SoftwareOnComputerUpsertWithWhereUniqueWithoutSoftwareInput[];
    createMany?: Prisma.SoftwareOnComputerCreateManySoftwareInputEnvelope;
    set?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    disconnect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    delete?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    connect?: Prisma.SoftwareOnComputerWhereUniqueInput | Prisma.SoftwareOnComputerWhereUniqueInput[];
    update?: Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutSoftwareInput | Prisma.SoftwareOnComputerUpdateWithWhereUniqueWithoutSoftwareInput[];
    updateMany?: Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutSoftwareInput | Prisma.SoftwareOnComputerUpdateManyWithWhereWithoutSoftwareInput[];
    deleteMany?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
};
export type SoftwareOnComputerCreateWithoutComputerInput = {
    software: Prisma.SoftwareCreateNestedOneWithoutComputersInput;
};
export type SoftwareOnComputerUncheckedCreateWithoutComputerInput = {
    softwareId: number;
};
export type SoftwareOnComputerCreateOrConnectWithoutComputerInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput>;
};
export type SoftwareOnComputerCreateManyComputerInputEnvelope = {
    data: Prisma.SoftwareOnComputerCreateManyComputerInput | Prisma.SoftwareOnComputerCreateManyComputerInput[];
    skipDuplicates?: boolean;
};
export type SoftwareOnComputerUpsertWithWhereUniqueWithoutComputerInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    update: Prisma.XOR<Prisma.SoftwareOnComputerUpdateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedUpdateWithoutComputerInput>;
    create: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutComputerInput>;
};
export type SoftwareOnComputerUpdateWithWhereUniqueWithoutComputerInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateWithoutComputerInput, Prisma.SoftwareOnComputerUncheckedUpdateWithoutComputerInput>;
};
export type SoftwareOnComputerUpdateManyWithWhereWithoutComputerInput = {
    where: Prisma.SoftwareOnComputerScalarWhereInput;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateManyMutationInput, Prisma.SoftwareOnComputerUncheckedUpdateManyWithoutComputerInput>;
};
export type SoftwareOnComputerScalarWhereInput = {
    AND?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
    OR?: Prisma.SoftwareOnComputerScalarWhereInput[];
    NOT?: Prisma.SoftwareOnComputerScalarWhereInput | Prisma.SoftwareOnComputerScalarWhereInput[];
    computerId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
    softwareId?: Prisma.IntFilter<"SoftwareOnComputer"> | number;
};
export type SoftwareOnComputerCreateWithoutSoftwareInput = {
    computer: Prisma.ComputerCreateNestedOneWithoutSoftwaresInput;
};
export type SoftwareOnComputerUncheckedCreateWithoutSoftwareInput = {
    computerId: number;
};
export type SoftwareOnComputerCreateOrConnectWithoutSoftwareInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput>;
};
export type SoftwareOnComputerCreateManySoftwareInputEnvelope = {
    data: Prisma.SoftwareOnComputerCreateManySoftwareInput | Prisma.SoftwareOnComputerCreateManySoftwareInput[];
    skipDuplicates?: boolean;
};
export type SoftwareOnComputerUpsertWithWhereUniqueWithoutSoftwareInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    update: Prisma.XOR<Prisma.SoftwareOnComputerUpdateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedUpdateWithoutSoftwareInput>;
    create: Prisma.XOR<Prisma.SoftwareOnComputerCreateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedCreateWithoutSoftwareInput>;
};
export type SoftwareOnComputerUpdateWithWhereUniqueWithoutSoftwareInput = {
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateWithoutSoftwareInput, Prisma.SoftwareOnComputerUncheckedUpdateWithoutSoftwareInput>;
};
export type SoftwareOnComputerUpdateManyWithWhereWithoutSoftwareInput = {
    where: Prisma.SoftwareOnComputerScalarWhereInput;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateManyMutationInput, Prisma.SoftwareOnComputerUncheckedUpdateManyWithoutSoftwareInput>;
};
export type SoftwareOnComputerCreateManyComputerInput = {
    softwareId: number;
};
export type SoftwareOnComputerUpdateWithoutComputerInput = {
    software?: Prisma.SoftwareUpdateOneRequiredWithoutComputersNestedInput;
};
export type SoftwareOnComputerUncheckedUpdateWithoutComputerInput = {
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerUncheckedUpdateManyWithoutComputerInput = {
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerCreateManySoftwareInput = {
    computerId: number;
};
export type SoftwareOnComputerUpdateWithoutSoftwareInput = {
    computer?: Prisma.ComputerUpdateOneRequiredWithoutSoftwaresNestedInput;
};
export type SoftwareOnComputerUncheckedUpdateWithoutSoftwareInput = {
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerUncheckedUpdateManyWithoutSoftwareInput = {
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type SoftwareOnComputerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    computerId?: boolean;
    softwareId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareOnComputer"]>;
export type SoftwareOnComputerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    computerId?: boolean;
    softwareId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareOnComputer"]>;
export type SoftwareOnComputerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    computerId?: boolean;
    softwareId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["softwareOnComputer"]>;
export type SoftwareOnComputerSelectScalar = {
    computerId?: boolean;
    softwareId?: boolean;
};
export type SoftwareOnComputerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"computerId" | "softwareId", ExtArgs["result"]["softwareOnComputer"]>;
export type SoftwareOnComputerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
};
export type SoftwareOnComputerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
};
export type SoftwareOnComputerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
};
export type $SoftwareOnComputerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SoftwareOnComputer";
    objects: {
        computer: Prisma.$ComputerPayload<ExtArgs>;
        software: Prisma.$SoftwarePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        computerId: number;
        softwareId: number;
    }, ExtArgs["result"]["softwareOnComputer"]>;
    composites: {};
};
export type SoftwareOnComputerGetPayload<S extends boolean | null | undefined | SoftwareOnComputerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload, S>;
export type SoftwareOnComputerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SoftwareOnComputerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SoftwareOnComputerCountAggregateInputType | true;
};
export interface SoftwareOnComputerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SoftwareOnComputer'];
        meta: {
            name: 'SoftwareOnComputer';
        };
    };
    findUnique<T extends SoftwareOnComputerFindUniqueArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SoftwareOnComputerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SoftwareOnComputerFindFirstArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerFindFirstArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SoftwareOnComputerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SoftwareOnComputerFindManyArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SoftwareOnComputerCreateArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerCreateArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SoftwareOnComputerCreateManyArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SoftwareOnComputerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SoftwareOnComputerDeleteArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerDeleteArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SoftwareOnComputerUpdateArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerUpdateArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SoftwareOnComputerDeleteManyArgs>(args?: Prisma.SelectSubset<T, SoftwareOnComputerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SoftwareOnComputerUpdateManyArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SoftwareOnComputerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SoftwareOnComputerUpsertArgs>(args: Prisma.SelectSubset<T, SoftwareOnComputerUpsertArgs<ExtArgs>>): Prisma.Prisma__SoftwareOnComputerClient<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SoftwareOnComputerCountArgs>(args?: Prisma.Subset<T, SoftwareOnComputerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SoftwareOnComputerCountAggregateOutputType> : number>;
    aggregate<T extends SoftwareOnComputerAggregateArgs>(args: Prisma.Subset<T, SoftwareOnComputerAggregateArgs>): Prisma.PrismaPromise<GetSoftwareOnComputerAggregateType<T>>;
    groupBy<T extends SoftwareOnComputerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SoftwareOnComputerGroupByArgs['orderBy'];
    } : {
        orderBy?: SoftwareOnComputerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SoftwareOnComputerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoftwareOnComputerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SoftwareOnComputerFieldRefs;
}
export interface Prisma__SoftwareOnComputerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computer<T extends Prisma.ComputerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ComputerDefaultArgs<ExtArgs>>): Prisma.Prisma__ComputerClient<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    software<T extends Prisma.SoftwareDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SoftwareDefaultArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SoftwareOnComputerFieldRefs {
    readonly computerId: Prisma.FieldRef<"SoftwareOnComputer", 'Int'>;
    readonly softwareId: Prisma.FieldRef<"SoftwareOnComputer", 'Int'>;
}
export type SoftwareOnComputerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
};
export type SoftwareOnComputerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
};
export type SoftwareOnComputerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where?: Prisma.SoftwareOnComputerWhereInput;
    orderBy?: Prisma.SoftwareOnComputerOrderByWithRelationInput | Prisma.SoftwareOnComputerOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareOnComputerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareOnComputerScalarFieldEnum | Prisma.SoftwareOnComputerScalarFieldEnum[];
};
export type SoftwareOnComputerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where?: Prisma.SoftwareOnComputerWhereInput;
    orderBy?: Prisma.SoftwareOnComputerOrderByWithRelationInput | Prisma.SoftwareOnComputerOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareOnComputerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareOnComputerScalarFieldEnum | Prisma.SoftwareOnComputerScalarFieldEnum[];
};
export type SoftwareOnComputerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where?: Prisma.SoftwareOnComputerWhereInput;
    orderBy?: Prisma.SoftwareOnComputerOrderByWithRelationInput | Prisma.SoftwareOnComputerOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareOnComputerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareOnComputerScalarFieldEnum | Prisma.SoftwareOnComputerScalarFieldEnum[];
};
export type SoftwareOnComputerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareOnComputerCreateInput, Prisma.SoftwareOnComputerUncheckedCreateInput>;
};
export type SoftwareOnComputerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SoftwareOnComputerCreateManyInput | Prisma.SoftwareOnComputerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SoftwareOnComputerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    data: Prisma.SoftwareOnComputerCreateManyInput | Prisma.SoftwareOnComputerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SoftwareOnComputerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SoftwareOnComputerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateInput, Prisma.SoftwareOnComputerUncheckedUpdateInput>;
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
};
export type SoftwareOnComputerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateManyMutationInput, Prisma.SoftwareOnComputerUncheckedUpdateManyInput>;
    where?: Prisma.SoftwareOnComputerWhereInput;
    limit?: number;
};
export type SoftwareOnComputerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareOnComputerUpdateManyMutationInput, Prisma.SoftwareOnComputerUncheckedUpdateManyInput>;
    where?: Prisma.SoftwareOnComputerWhereInput;
    limit?: number;
    include?: Prisma.SoftwareOnComputerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SoftwareOnComputerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareOnComputerCreateInput, Prisma.SoftwareOnComputerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SoftwareOnComputerUpdateInput, Prisma.SoftwareOnComputerUncheckedUpdateInput>;
};
export type SoftwareOnComputerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
    where: Prisma.SoftwareOnComputerWhereUniqueInput;
};
export type SoftwareOnComputerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareOnComputerWhereInput;
    limit?: number;
};
export type SoftwareOnComputerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareOnComputerSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOnComputerOmit<ExtArgs> | null;
    include?: Prisma.SoftwareOnComputerInclude<ExtArgs> | null;
};
