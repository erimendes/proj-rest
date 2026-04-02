import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VolumeModel = runtime.Types.Result.DefaultSelection<Prisma.$VolumePayload>;
export type AggregateVolume = {
    _count: VolumeCountAggregateOutputType | null;
    _avg: VolumeAvgAggregateOutputType | null;
    _sum: VolumeSumAggregateOutputType | null;
    _min: VolumeMinAggregateOutputType | null;
    _max: VolumeMaxAggregateOutputType | null;
};
export type VolumeAvgAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    capacityGb: number | null;
    computerId: number | null;
};
export type VolumeSumAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    capacityGb: number | null;
    computerId: number | null;
};
export type VolumeMinAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    mountPoint: string | null;
    capacityGb: number | null;
    computerId: number | null;
};
export type VolumeMaxAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    mountPoint: string | null;
    capacityGb: number | null;
    computerId: number | null;
};
export type VolumeCountAggregateOutputType = {
    id: number;
    glpiId: number;
    mountPoint: number;
    capacityGb: number;
    computerId: number;
    _all: number;
};
export type VolumeAvgAggregateInputType = {
    id?: true;
    glpiId?: true;
    capacityGb?: true;
    computerId?: true;
};
export type VolumeSumAggregateInputType = {
    id?: true;
    glpiId?: true;
    capacityGb?: true;
    computerId?: true;
};
export type VolumeMinAggregateInputType = {
    id?: true;
    glpiId?: true;
    mountPoint?: true;
    capacityGb?: true;
    computerId?: true;
};
export type VolumeMaxAggregateInputType = {
    id?: true;
    glpiId?: true;
    mountPoint?: true;
    capacityGb?: true;
    computerId?: true;
};
export type VolumeCountAggregateInputType = {
    id?: true;
    glpiId?: true;
    mountPoint?: true;
    capacityGb?: true;
    computerId?: true;
    _all?: true;
};
export type VolumeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VolumeWhereInput;
    orderBy?: Prisma.VolumeOrderByWithRelationInput | Prisma.VolumeOrderByWithRelationInput[];
    cursor?: Prisma.VolumeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VolumeCountAggregateInputType;
    _avg?: VolumeAvgAggregateInputType;
    _sum?: VolumeSumAggregateInputType;
    _min?: VolumeMinAggregateInputType;
    _max?: VolumeMaxAggregateInputType;
};
export type GetVolumeAggregateType<T extends VolumeAggregateArgs> = {
    [P in keyof T & keyof AggregateVolume]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVolume[P]> : Prisma.GetScalarType<T[P], AggregateVolume[P]>;
};
export type VolumeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VolumeWhereInput;
    orderBy?: Prisma.VolumeOrderByWithAggregationInput | Prisma.VolumeOrderByWithAggregationInput[];
    by: Prisma.VolumeScalarFieldEnum[] | Prisma.VolumeScalarFieldEnum;
    having?: Prisma.VolumeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VolumeCountAggregateInputType | true;
    _avg?: VolumeAvgAggregateInputType;
    _sum?: VolumeSumAggregateInputType;
    _min?: VolumeMinAggregateInputType;
    _max?: VolumeMaxAggregateInputType;
};
export type VolumeGroupByOutputType = {
    id: number;
    glpiId: number | null;
    mountPoint: string | null;
    capacityGb: number;
    computerId: number;
    _count: VolumeCountAggregateOutputType | null;
    _avg: VolumeAvgAggregateOutputType | null;
    _sum: VolumeSumAggregateOutputType | null;
    _min: VolumeMinAggregateOutputType | null;
    _max: VolumeMaxAggregateOutputType | null;
};
export type GetVolumeGroupByPayload<T extends VolumeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VolumeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VolumeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VolumeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VolumeGroupByOutputType[P]>;
}>>;
export type VolumeWhereInput = {
    AND?: Prisma.VolumeWhereInput | Prisma.VolumeWhereInput[];
    OR?: Prisma.VolumeWhereInput[];
    NOT?: Prisma.VolumeWhereInput | Prisma.VolumeWhereInput[];
    id?: Prisma.IntFilter<"Volume"> | number;
    glpiId?: Prisma.IntNullableFilter<"Volume"> | number | null;
    mountPoint?: Prisma.StringNullableFilter<"Volume"> | string | null;
    capacityGb?: Prisma.FloatFilter<"Volume"> | number;
    computerId?: Prisma.IntFilter<"Volume"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
};
export type VolumeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrderInput | Prisma.SortOrder;
    mountPoint?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    computer?: Prisma.ComputerOrderByWithRelationInput;
};
export type VolumeWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.VolumeWhereInput | Prisma.VolumeWhereInput[];
    OR?: Prisma.VolumeWhereInput[];
    NOT?: Prisma.VolumeWhereInput | Prisma.VolumeWhereInput[];
    glpiId?: Prisma.IntNullableFilter<"Volume"> | number | null;
    mountPoint?: Prisma.StringNullableFilter<"Volume"> | string | null;
    capacityGb?: Prisma.FloatFilter<"Volume"> | number;
    computerId?: Prisma.IntFilter<"Volume"> | number;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
}, "id">;
export type VolumeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrderInput | Prisma.SortOrder;
    mountPoint?: Prisma.SortOrderInput | Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    _count?: Prisma.VolumeCountOrderByAggregateInput;
    _avg?: Prisma.VolumeAvgOrderByAggregateInput;
    _max?: Prisma.VolumeMaxOrderByAggregateInput;
    _min?: Prisma.VolumeMinOrderByAggregateInput;
    _sum?: Prisma.VolumeSumOrderByAggregateInput;
};
export type VolumeScalarWhereWithAggregatesInput = {
    AND?: Prisma.VolumeScalarWhereWithAggregatesInput | Prisma.VolumeScalarWhereWithAggregatesInput[];
    OR?: Prisma.VolumeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VolumeScalarWhereWithAggregatesInput | Prisma.VolumeScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Volume"> | number;
    glpiId?: Prisma.IntNullableWithAggregatesFilter<"Volume"> | number | null;
    mountPoint?: Prisma.StringNullableWithAggregatesFilter<"Volume"> | string | null;
    capacityGb?: Prisma.FloatWithAggregatesFilter<"Volume"> | number;
    computerId?: Prisma.IntWithAggregatesFilter<"Volume"> | number;
};
export type VolumeCreateInput = {
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
    computer: Prisma.ComputerCreateNestedOneWithoutVolumesInput;
};
export type VolumeUncheckedCreateInput = {
    id?: number;
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
    computerId: number;
};
export type VolumeUpdateInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
    computer?: Prisma.ComputerUpdateOneRequiredWithoutVolumesNestedInput;
};
export type VolumeUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VolumeCreateManyInput = {
    id?: number;
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
    computerId: number;
};
export type VolumeUpdateManyMutationInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type VolumeUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type VolumeListRelationFilter = {
    every?: Prisma.VolumeWhereInput;
    some?: Prisma.VolumeWhereInput;
    none?: Prisma.VolumeWhereInput;
};
export type VolumeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VolumeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    mountPoint?: Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type VolumeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type VolumeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    mountPoint?: Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type VolumeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    mountPoint?: Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type VolumeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    capacityGb?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
};
export type VolumeCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput> | Prisma.VolumeCreateWithoutComputerInput[] | Prisma.VolumeUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.VolumeCreateOrConnectWithoutComputerInput | Prisma.VolumeCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.VolumeCreateManyComputerInputEnvelope;
    connect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
};
export type VolumeUncheckedCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput> | Prisma.VolumeCreateWithoutComputerInput[] | Prisma.VolumeUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.VolumeCreateOrConnectWithoutComputerInput | Prisma.VolumeCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.VolumeCreateManyComputerInputEnvelope;
    connect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
};
export type VolumeUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput> | Prisma.VolumeCreateWithoutComputerInput[] | Prisma.VolumeUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.VolumeCreateOrConnectWithoutComputerInput | Prisma.VolumeCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.VolumeUpsertWithWhereUniqueWithoutComputerInput | Prisma.VolumeUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.VolumeCreateManyComputerInputEnvelope;
    set?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    disconnect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    delete?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    connect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    update?: Prisma.VolumeUpdateWithWhereUniqueWithoutComputerInput | Prisma.VolumeUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.VolumeUpdateManyWithWhereWithoutComputerInput | Prisma.VolumeUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.VolumeScalarWhereInput | Prisma.VolumeScalarWhereInput[];
};
export type VolumeUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput> | Prisma.VolumeCreateWithoutComputerInput[] | Prisma.VolumeUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.VolumeCreateOrConnectWithoutComputerInput | Prisma.VolumeCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.VolumeUpsertWithWhereUniqueWithoutComputerInput | Prisma.VolumeUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.VolumeCreateManyComputerInputEnvelope;
    set?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    disconnect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    delete?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    connect?: Prisma.VolumeWhereUniqueInput | Prisma.VolumeWhereUniqueInput[];
    update?: Prisma.VolumeUpdateWithWhereUniqueWithoutComputerInput | Prisma.VolumeUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.VolumeUpdateManyWithWhereWithoutComputerInput | Prisma.VolumeUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.VolumeScalarWhereInput | Prisma.VolumeScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type VolumeCreateWithoutComputerInput = {
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
};
export type VolumeUncheckedCreateWithoutComputerInput = {
    id?: number;
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
};
export type VolumeCreateOrConnectWithoutComputerInput = {
    where: Prisma.VolumeWhereUniqueInput;
    create: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput>;
};
export type VolumeCreateManyComputerInputEnvelope = {
    data: Prisma.VolumeCreateManyComputerInput | Prisma.VolumeCreateManyComputerInput[];
    skipDuplicates?: boolean;
};
export type VolumeUpsertWithWhereUniqueWithoutComputerInput = {
    where: Prisma.VolumeWhereUniqueInput;
    update: Prisma.XOR<Prisma.VolumeUpdateWithoutComputerInput, Prisma.VolumeUncheckedUpdateWithoutComputerInput>;
    create: Prisma.XOR<Prisma.VolumeCreateWithoutComputerInput, Prisma.VolumeUncheckedCreateWithoutComputerInput>;
};
export type VolumeUpdateWithWhereUniqueWithoutComputerInput = {
    where: Prisma.VolumeWhereUniqueInput;
    data: Prisma.XOR<Prisma.VolumeUpdateWithoutComputerInput, Prisma.VolumeUncheckedUpdateWithoutComputerInput>;
};
export type VolumeUpdateManyWithWhereWithoutComputerInput = {
    where: Prisma.VolumeScalarWhereInput;
    data: Prisma.XOR<Prisma.VolumeUpdateManyMutationInput, Prisma.VolumeUncheckedUpdateManyWithoutComputerInput>;
};
export type VolumeScalarWhereInput = {
    AND?: Prisma.VolumeScalarWhereInput | Prisma.VolumeScalarWhereInput[];
    OR?: Prisma.VolumeScalarWhereInput[];
    NOT?: Prisma.VolumeScalarWhereInput | Prisma.VolumeScalarWhereInput[];
    id?: Prisma.IntFilter<"Volume"> | number;
    glpiId?: Prisma.IntNullableFilter<"Volume"> | number | null;
    mountPoint?: Prisma.StringNullableFilter<"Volume"> | string | null;
    capacityGb?: Prisma.FloatFilter<"Volume"> | number;
    computerId?: Prisma.IntFilter<"Volume"> | number;
};
export type VolumeCreateManyComputerInput = {
    id?: number;
    glpiId?: number | null;
    mountPoint?: string | null;
    capacityGb: number;
};
export type VolumeUpdateWithoutComputerInput = {
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type VolumeUncheckedUpdateWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type VolumeUncheckedUpdateManyWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    mountPoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    capacityGb?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type VolumeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    mountPoint?: boolean;
    capacityGb?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["volume"]>;
export type VolumeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    mountPoint?: boolean;
    capacityGb?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["volume"]>;
export type VolumeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    mountPoint?: boolean;
    capacityGb?: boolean;
    computerId?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["volume"]>;
export type VolumeSelectScalar = {
    id?: boolean;
    glpiId?: boolean;
    mountPoint?: boolean;
    capacityGb?: boolean;
    computerId?: boolean;
};
export type VolumeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "glpiId" | "mountPoint" | "capacityGb" | "computerId", ExtArgs["result"]["volume"]>;
export type VolumeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type VolumeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type VolumeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
};
export type $VolumePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Volume";
    objects: {
        computer: Prisma.$ComputerPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        glpiId: number | null;
        mountPoint: string | null;
        capacityGb: number;
        computerId: number;
    }, ExtArgs["result"]["volume"]>;
    composites: {};
};
export type VolumeGetPayload<S extends boolean | null | undefined | VolumeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VolumePayload, S>;
export type VolumeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VolumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VolumeCountAggregateInputType | true;
};
export interface VolumeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Volume'];
        meta: {
            name: 'Volume';
        };
    };
    findUnique<T extends VolumeFindUniqueArgs>(args: Prisma.SelectSubset<T, VolumeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VolumeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VolumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VolumeFindFirstArgs>(args?: Prisma.SelectSubset<T, VolumeFindFirstArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VolumeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VolumeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VolumeFindManyArgs>(args?: Prisma.SelectSubset<T, VolumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VolumeCreateArgs>(args: Prisma.SelectSubset<T, VolumeCreateArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VolumeCreateManyArgs>(args?: Prisma.SelectSubset<T, VolumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VolumeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VolumeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VolumeDeleteArgs>(args: Prisma.SelectSubset<T, VolumeDeleteArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VolumeUpdateArgs>(args: Prisma.SelectSubset<T, VolumeUpdateArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VolumeDeleteManyArgs>(args?: Prisma.SelectSubset<T, VolumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VolumeUpdateManyArgs>(args: Prisma.SelectSubset<T, VolumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VolumeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VolumeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VolumeUpsertArgs>(args: Prisma.SelectSubset<T, VolumeUpsertArgs<ExtArgs>>): Prisma.Prisma__VolumeClient<runtime.Types.Result.GetResult<Prisma.$VolumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VolumeCountArgs>(args?: Prisma.Subset<T, VolumeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VolumeCountAggregateOutputType> : number>;
    aggregate<T extends VolumeAggregateArgs>(args: Prisma.Subset<T, VolumeAggregateArgs>): Prisma.PrismaPromise<GetVolumeAggregateType<T>>;
    groupBy<T extends VolumeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VolumeGroupByArgs['orderBy'];
    } : {
        orderBy?: VolumeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VolumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVolumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VolumeFieldRefs;
}
export interface Prisma__VolumeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computer<T extends Prisma.ComputerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ComputerDefaultArgs<ExtArgs>>): Prisma.Prisma__ComputerClient<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VolumeFieldRefs {
    readonly id: Prisma.FieldRef<"Volume", 'Int'>;
    readonly glpiId: Prisma.FieldRef<"Volume", 'Int'>;
    readonly mountPoint: Prisma.FieldRef<"Volume", 'String'>;
    readonly capacityGb: Prisma.FieldRef<"Volume", 'Float'>;
    readonly computerId: Prisma.FieldRef<"Volume", 'Int'>;
}
export type VolumeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where: Prisma.VolumeWhereUniqueInput;
};
export type VolumeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where: Prisma.VolumeWhereUniqueInput;
};
export type VolumeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where?: Prisma.VolumeWhereInput;
    orderBy?: Prisma.VolumeOrderByWithRelationInput | Prisma.VolumeOrderByWithRelationInput[];
    cursor?: Prisma.VolumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VolumeScalarFieldEnum | Prisma.VolumeScalarFieldEnum[];
};
export type VolumeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where?: Prisma.VolumeWhereInput;
    orderBy?: Prisma.VolumeOrderByWithRelationInput | Prisma.VolumeOrderByWithRelationInput[];
    cursor?: Prisma.VolumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VolumeScalarFieldEnum | Prisma.VolumeScalarFieldEnum[];
};
export type VolumeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where?: Prisma.VolumeWhereInput;
    orderBy?: Prisma.VolumeOrderByWithRelationInput | Prisma.VolumeOrderByWithRelationInput[];
    cursor?: Prisma.VolumeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VolumeScalarFieldEnum | Prisma.VolumeScalarFieldEnum[];
};
export type VolumeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VolumeCreateInput, Prisma.VolumeUncheckedCreateInput>;
};
export type VolumeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VolumeCreateManyInput | Prisma.VolumeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VolumeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    data: Prisma.VolumeCreateManyInput | Prisma.VolumeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VolumeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VolumeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VolumeUpdateInput, Prisma.VolumeUncheckedUpdateInput>;
    where: Prisma.VolumeWhereUniqueInput;
};
export type VolumeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VolumeUpdateManyMutationInput, Prisma.VolumeUncheckedUpdateManyInput>;
    where?: Prisma.VolumeWhereInput;
    limit?: number;
};
export type VolumeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VolumeUpdateManyMutationInput, Prisma.VolumeUncheckedUpdateManyInput>;
    where?: Prisma.VolumeWhereInput;
    limit?: number;
    include?: Prisma.VolumeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VolumeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where: Prisma.VolumeWhereUniqueInput;
    create: Prisma.XOR<Prisma.VolumeCreateInput, Prisma.VolumeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VolumeUpdateInput, Prisma.VolumeUncheckedUpdateInput>;
};
export type VolumeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
    where: Prisma.VolumeWhereUniqueInput;
};
export type VolumeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VolumeWhereInput;
    limit?: number;
};
export type VolumeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VolumeSelect<ExtArgs> | null;
    omit?: Prisma.VolumeOmit<ExtArgs> | null;
    include?: Prisma.VolumeInclude<ExtArgs> | null;
};
