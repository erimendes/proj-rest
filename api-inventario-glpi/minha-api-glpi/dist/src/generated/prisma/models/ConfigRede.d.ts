import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConfigRedeModel = runtime.Types.Result.DefaultSelection<Prisma.$ConfigRedePayload>;
export type AggregateConfigRede = {
    _count: ConfigRedeCountAggregateOutputType | null;
    _avg: ConfigRedeAvgAggregateOutputType | null;
    _sum: ConfigRedeSumAggregateOutputType | null;
    _min: ConfigRedeMinAggregateOutputType | null;
    _max: ConfigRedeMaxAggregateOutputType | null;
};
export type ConfigRedeAvgAggregateOutputType = {
    id: number | null;
    vlan: number | null;
    portasUTP: number | null;
    portasFibra: number | null;
    ativoId: number | null;
};
export type ConfigRedeSumAggregateOutputType = {
    id: number | null;
    vlan: number | null;
    portasUTP: number | null;
    portasFibra: number | null;
    ativoId: number | null;
};
export type ConfigRedeMinAggregateOutputType = {
    id: number | null;
    ipAddress: string | null;
    macAddress: string | null;
    vlan: number | null;
    portasUTP: number | null;
    portasFibra: number | null;
    storageConect: string | null;
    discoStorage: string | null;
    ativoId: number | null;
};
export type ConfigRedeMaxAggregateOutputType = {
    id: number | null;
    ipAddress: string | null;
    macAddress: string | null;
    vlan: number | null;
    portasUTP: number | null;
    portasFibra: number | null;
    storageConect: string | null;
    discoStorage: string | null;
    ativoId: number | null;
};
export type ConfigRedeCountAggregateOutputType = {
    id: number;
    ipAddress: number;
    macAddress: number;
    vlan: number;
    portasUTP: number;
    portasFibra: number;
    storageConect: number;
    discoStorage: number;
    ativoId: number;
    _all: number;
};
export type ConfigRedeAvgAggregateInputType = {
    id?: true;
    vlan?: true;
    portasUTP?: true;
    portasFibra?: true;
    ativoId?: true;
};
export type ConfigRedeSumAggregateInputType = {
    id?: true;
    vlan?: true;
    portasUTP?: true;
    portasFibra?: true;
    ativoId?: true;
};
export type ConfigRedeMinAggregateInputType = {
    id?: true;
    ipAddress?: true;
    macAddress?: true;
    vlan?: true;
    portasUTP?: true;
    portasFibra?: true;
    storageConect?: true;
    discoStorage?: true;
    ativoId?: true;
};
export type ConfigRedeMaxAggregateInputType = {
    id?: true;
    ipAddress?: true;
    macAddress?: true;
    vlan?: true;
    portasUTP?: true;
    portasFibra?: true;
    storageConect?: true;
    discoStorage?: true;
    ativoId?: true;
};
export type ConfigRedeCountAggregateInputType = {
    id?: true;
    ipAddress?: true;
    macAddress?: true;
    vlan?: true;
    portasUTP?: true;
    portasFibra?: true;
    storageConect?: true;
    discoStorage?: true;
    ativoId?: true;
    _all?: true;
};
export type ConfigRedeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfigRedeWhereInput;
    orderBy?: Prisma.ConfigRedeOrderByWithRelationInput | Prisma.ConfigRedeOrderByWithRelationInput[];
    cursor?: Prisma.ConfigRedeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConfigRedeCountAggregateInputType;
    _avg?: ConfigRedeAvgAggregateInputType;
    _sum?: ConfigRedeSumAggregateInputType;
    _min?: ConfigRedeMinAggregateInputType;
    _max?: ConfigRedeMaxAggregateInputType;
};
export type GetConfigRedeAggregateType<T extends ConfigRedeAggregateArgs> = {
    [P in keyof T & keyof AggregateConfigRede]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConfigRede[P]> : Prisma.GetScalarType<T[P], AggregateConfigRede[P]>;
};
export type ConfigRedeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfigRedeWhereInput;
    orderBy?: Prisma.ConfigRedeOrderByWithAggregationInput | Prisma.ConfigRedeOrderByWithAggregationInput[];
    by: Prisma.ConfigRedeScalarFieldEnum[] | Prisma.ConfigRedeScalarFieldEnum;
    having?: Prisma.ConfigRedeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConfigRedeCountAggregateInputType | true;
    _avg?: ConfigRedeAvgAggregateInputType;
    _sum?: ConfigRedeSumAggregateInputType;
    _min?: ConfigRedeMinAggregateInputType;
    _max?: ConfigRedeMaxAggregateInputType;
};
export type ConfigRedeGroupByOutputType = {
    id: number;
    ipAddress: string | null;
    macAddress: string;
    vlan: number | null;
    portasUTP: number | null;
    portasFibra: number | null;
    storageConect: string | null;
    discoStorage: string | null;
    ativoId: number;
    _count: ConfigRedeCountAggregateOutputType | null;
    _avg: ConfigRedeAvgAggregateOutputType | null;
    _sum: ConfigRedeSumAggregateOutputType | null;
    _min: ConfigRedeMinAggregateOutputType | null;
    _max: ConfigRedeMaxAggregateOutputType | null;
};
export type GetConfigRedeGroupByPayload<T extends ConfigRedeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConfigRedeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConfigRedeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConfigRedeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConfigRedeGroupByOutputType[P]>;
}>>;
export type ConfigRedeWhereInput = {
    AND?: Prisma.ConfigRedeWhereInput | Prisma.ConfigRedeWhereInput[];
    OR?: Prisma.ConfigRedeWhereInput[];
    NOT?: Prisma.ConfigRedeWhereInput | Prisma.ConfigRedeWhereInput[];
    id?: Prisma.IntFilter<"ConfigRede"> | number;
    ipAddress?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    macAddress?: Prisma.StringFilter<"ConfigRede"> | string;
    vlan?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    portasUTP?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    portasFibra?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    storageConect?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    discoStorage?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    ativoId?: Prisma.IntFilter<"ConfigRede"> | number;
    ativo?: Prisma.XOR<Prisma.AtivoScalarRelationFilter, Prisma.AtivoWhereInput>;
};
export type ConfigRedeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    vlan?: Prisma.SortOrderInput | Prisma.SortOrder;
    portasUTP?: Prisma.SortOrderInput | Prisma.SortOrder;
    portasFibra?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageConect?: Prisma.SortOrderInput | Prisma.SortOrder;
    discoStorage?: Prisma.SortOrderInput | Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    ativo?: Prisma.AtivoOrderByWithRelationInput;
};
export type ConfigRedeWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    macAddress?: string;
    ativoId?: number;
    AND?: Prisma.ConfigRedeWhereInput | Prisma.ConfigRedeWhereInput[];
    OR?: Prisma.ConfigRedeWhereInput[];
    NOT?: Prisma.ConfigRedeWhereInput | Prisma.ConfigRedeWhereInput[];
    ipAddress?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    vlan?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    portasUTP?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    portasFibra?: Prisma.IntNullableFilter<"ConfigRede"> | number | null;
    storageConect?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    discoStorage?: Prisma.StringNullableFilter<"ConfigRede"> | string | null;
    ativo?: Prisma.XOR<Prisma.AtivoScalarRelationFilter, Prisma.AtivoWhereInput>;
}, "id" | "macAddress" | "ativoId">;
export type ConfigRedeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    vlan?: Prisma.SortOrderInput | Prisma.SortOrder;
    portasUTP?: Prisma.SortOrderInput | Prisma.SortOrder;
    portasFibra?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageConect?: Prisma.SortOrderInput | Prisma.SortOrder;
    discoStorage?: Prisma.SortOrderInput | Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    _count?: Prisma.ConfigRedeCountOrderByAggregateInput;
    _avg?: Prisma.ConfigRedeAvgOrderByAggregateInput;
    _max?: Prisma.ConfigRedeMaxOrderByAggregateInput;
    _min?: Prisma.ConfigRedeMinOrderByAggregateInput;
    _sum?: Prisma.ConfigRedeSumOrderByAggregateInput;
};
export type ConfigRedeScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConfigRedeScalarWhereWithAggregatesInput | Prisma.ConfigRedeScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConfigRedeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConfigRedeScalarWhereWithAggregatesInput | Prisma.ConfigRedeScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"ConfigRede"> | number;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"ConfigRede"> | string | null;
    macAddress?: Prisma.StringWithAggregatesFilter<"ConfigRede"> | string;
    vlan?: Prisma.IntNullableWithAggregatesFilter<"ConfigRede"> | number | null;
    portasUTP?: Prisma.IntNullableWithAggregatesFilter<"ConfigRede"> | number | null;
    portasFibra?: Prisma.IntNullableWithAggregatesFilter<"ConfigRede"> | number | null;
    storageConect?: Prisma.StringNullableWithAggregatesFilter<"ConfigRede"> | string | null;
    discoStorage?: Prisma.StringNullableWithAggregatesFilter<"ConfigRede"> | string | null;
    ativoId?: Prisma.IntWithAggregatesFilter<"ConfigRede"> | number;
};
export type ConfigRedeCreateInput = {
    ipAddress?: string | null;
    macAddress: string;
    vlan?: number | null;
    portasUTP?: number | null;
    portasFibra?: number | null;
    storageConect?: string | null;
    discoStorage?: string | null;
    ativo: Prisma.AtivoCreateNestedOneWithoutConfigRedeInput;
};
export type ConfigRedeUncheckedCreateInput = {
    id?: number;
    ipAddress?: string | null;
    macAddress: string;
    vlan?: number | null;
    portasUTP?: number | null;
    portasFibra?: number | null;
    storageConect?: string | null;
    discoStorage?: string | null;
    ativoId: number;
};
export type ConfigRedeUpdateInput = {
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ativo?: Prisma.AtivoUpdateOneRequiredWithoutConfigRedeNestedInput;
};
export type ConfigRedeUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ConfigRedeCreateManyInput = {
    id?: number;
    ipAddress?: string | null;
    macAddress: string;
    vlan?: number | null;
    portasUTP?: number | null;
    portasFibra?: number | null;
    storageConect?: string | null;
    discoStorage?: string | null;
    ativoId: number;
};
export type ConfigRedeUpdateManyMutationInput = {
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ConfigRedeUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ConfigRedeNullableScalarRelationFilter = {
    is?: Prisma.ConfigRedeWhereInput | null;
    isNot?: Prisma.ConfigRedeWhereInput | null;
};
export type ConfigRedeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    vlan?: Prisma.SortOrder;
    portasUTP?: Prisma.SortOrder;
    portasFibra?: Prisma.SortOrder;
    storageConect?: Prisma.SortOrder;
    discoStorage?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
};
export type ConfigRedeAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vlan?: Prisma.SortOrder;
    portasUTP?: Prisma.SortOrder;
    portasFibra?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
};
export type ConfigRedeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    vlan?: Prisma.SortOrder;
    portasUTP?: Prisma.SortOrder;
    portasFibra?: Prisma.SortOrder;
    storageConect?: Prisma.SortOrder;
    discoStorage?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
};
export type ConfigRedeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    macAddress?: Prisma.SortOrder;
    vlan?: Prisma.SortOrder;
    portasUTP?: Prisma.SortOrder;
    portasFibra?: Prisma.SortOrder;
    storageConect?: Prisma.SortOrder;
    discoStorage?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
};
export type ConfigRedeSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    vlan?: Prisma.SortOrder;
    portasUTP?: Prisma.SortOrder;
    portasFibra?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
};
export type ConfigRedeCreateNestedOneWithoutAtivoInput = {
    create?: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
    connectOrCreate?: Prisma.ConfigRedeCreateOrConnectWithoutAtivoInput;
    connect?: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeUncheckedCreateNestedOneWithoutAtivoInput = {
    create?: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
    connectOrCreate?: Prisma.ConfigRedeCreateOrConnectWithoutAtivoInput;
    connect?: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeUpdateOneWithoutAtivoNestedInput = {
    create?: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
    connectOrCreate?: Prisma.ConfigRedeCreateOrConnectWithoutAtivoInput;
    upsert?: Prisma.ConfigRedeUpsertWithoutAtivoInput;
    disconnect?: Prisma.ConfigRedeWhereInput | boolean;
    delete?: Prisma.ConfigRedeWhereInput | boolean;
    connect?: Prisma.ConfigRedeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConfigRedeUpdateToOneWithWhereWithoutAtivoInput, Prisma.ConfigRedeUpdateWithoutAtivoInput>, Prisma.ConfigRedeUncheckedUpdateWithoutAtivoInput>;
};
export type ConfigRedeUncheckedUpdateOneWithoutAtivoNestedInput = {
    create?: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
    connectOrCreate?: Prisma.ConfigRedeCreateOrConnectWithoutAtivoInput;
    upsert?: Prisma.ConfigRedeUpsertWithoutAtivoInput;
    disconnect?: Prisma.ConfigRedeWhereInput | boolean;
    delete?: Prisma.ConfigRedeWhereInput | boolean;
    connect?: Prisma.ConfigRedeWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConfigRedeUpdateToOneWithWhereWithoutAtivoInput, Prisma.ConfigRedeUpdateWithoutAtivoInput>, Prisma.ConfigRedeUncheckedUpdateWithoutAtivoInput>;
};
export type ConfigRedeCreateWithoutAtivoInput = {
    ipAddress?: string | null;
    macAddress: string;
    vlan?: number | null;
    portasUTP?: number | null;
    portasFibra?: number | null;
    storageConect?: string | null;
    discoStorage?: string | null;
};
export type ConfigRedeUncheckedCreateWithoutAtivoInput = {
    id?: number;
    ipAddress?: string | null;
    macAddress: string;
    vlan?: number | null;
    portasUTP?: number | null;
    portasFibra?: number | null;
    storageConect?: string | null;
    discoStorage?: string | null;
};
export type ConfigRedeCreateOrConnectWithoutAtivoInput = {
    where: Prisma.ConfigRedeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
};
export type ConfigRedeUpsertWithoutAtivoInput = {
    update: Prisma.XOR<Prisma.ConfigRedeUpdateWithoutAtivoInput, Prisma.ConfigRedeUncheckedUpdateWithoutAtivoInput>;
    create: Prisma.XOR<Prisma.ConfigRedeCreateWithoutAtivoInput, Prisma.ConfigRedeUncheckedCreateWithoutAtivoInput>;
    where?: Prisma.ConfigRedeWhereInput;
};
export type ConfigRedeUpdateToOneWithWhereWithoutAtivoInput = {
    where?: Prisma.ConfigRedeWhereInput;
    data: Prisma.XOR<Prisma.ConfigRedeUpdateWithoutAtivoInput, Prisma.ConfigRedeUncheckedUpdateWithoutAtivoInput>;
};
export type ConfigRedeUpdateWithoutAtivoInput = {
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ConfigRedeUncheckedUpdateWithoutAtivoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    macAddress?: Prisma.StringFieldUpdateOperationsInput | string;
    vlan?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasUTP?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    portasFibra?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    storageConect?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoStorage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ConfigRedeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    vlan?: boolean;
    portasUTP?: boolean;
    portasFibra?: boolean;
    storageConect?: boolean;
    discoStorage?: boolean;
    ativoId?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["configRede"]>;
export type ConfigRedeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    vlan?: boolean;
    portasUTP?: boolean;
    portasFibra?: boolean;
    storageConect?: boolean;
    discoStorage?: boolean;
    ativoId?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["configRede"]>;
export type ConfigRedeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    vlan?: boolean;
    portasUTP?: boolean;
    portasFibra?: boolean;
    storageConect?: boolean;
    discoStorage?: boolean;
    ativoId?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["configRede"]>;
export type ConfigRedeSelectScalar = {
    id?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    vlan?: boolean;
    portasUTP?: boolean;
    portasFibra?: boolean;
    storageConect?: boolean;
    discoStorage?: boolean;
    ativoId?: boolean;
};
export type ConfigRedeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ipAddress" | "macAddress" | "vlan" | "portasUTP" | "portasFibra" | "storageConect" | "discoStorage" | "ativoId", ExtArgs["result"]["configRede"]>;
export type ConfigRedeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
};
export type ConfigRedeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
};
export type ConfigRedeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
};
export type $ConfigRedePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConfigRede";
    objects: {
        ativo: Prisma.$AtivoPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        ipAddress: string | null;
        macAddress: string;
        vlan: number | null;
        portasUTP: number | null;
        portasFibra: number | null;
        storageConect: string | null;
        discoStorage: string | null;
        ativoId: number;
    }, ExtArgs["result"]["configRede"]>;
    composites: {};
};
export type ConfigRedeGetPayload<S extends boolean | null | undefined | ConfigRedeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload, S>;
export type ConfigRedeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConfigRedeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConfigRedeCountAggregateInputType | true;
};
export interface ConfigRedeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConfigRede'];
        meta: {
            name: 'ConfigRede';
        };
    };
    findUnique<T extends ConfigRedeFindUniqueArgs>(args: Prisma.SelectSubset<T, ConfigRedeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConfigRedeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConfigRedeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConfigRedeFindFirstArgs>(args?: Prisma.SelectSubset<T, ConfigRedeFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConfigRedeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConfigRedeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConfigRedeFindManyArgs>(args?: Prisma.SelectSubset<T, ConfigRedeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConfigRedeCreateArgs>(args: Prisma.SelectSubset<T, ConfigRedeCreateArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConfigRedeCreateManyArgs>(args?: Prisma.SelectSubset<T, ConfigRedeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConfigRedeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConfigRedeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConfigRedeDeleteArgs>(args: Prisma.SelectSubset<T, ConfigRedeDeleteArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConfigRedeUpdateArgs>(args: Prisma.SelectSubset<T, ConfigRedeUpdateArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConfigRedeDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConfigRedeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConfigRedeUpdateManyArgs>(args: Prisma.SelectSubset<T, ConfigRedeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConfigRedeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConfigRedeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConfigRedeUpsertArgs>(args: Prisma.SelectSubset<T, ConfigRedeUpsertArgs<ExtArgs>>): Prisma.Prisma__ConfigRedeClient<runtime.Types.Result.GetResult<Prisma.$ConfigRedePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConfigRedeCountArgs>(args?: Prisma.Subset<T, ConfigRedeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConfigRedeCountAggregateOutputType> : number>;
    aggregate<T extends ConfigRedeAggregateArgs>(args: Prisma.Subset<T, ConfigRedeAggregateArgs>): Prisma.PrismaPromise<GetConfigRedeAggregateType<T>>;
    groupBy<T extends ConfigRedeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConfigRedeGroupByArgs['orderBy'];
    } : {
        orderBy?: ConfigRedeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConfigRedeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigRedeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConfigRedeFieldRefs;
}
export interface Prisma__ConfigRedeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ativo<T extends Prisma.AtivoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AtivoDefaultArgs<ExtArgs>>): Prisma.Prisma__AtivoClient<runtime.Types.Result.GetResult<Prisma.$AtivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConfigRedeFieldRefs {
    readonly id: Prisma.FieldRef<"ConfigRede", 'Int'>;
    readonly ipAddress: Prisma.FieldRef<"ConfigRede", 'String'>;
    readonly macAddress: Prisma.FieldRef<"ConfigRede", 'String'>;
    readonly vlan: Prisma.FieldRef<"ConfigRede", 'Int'>;
    readonly portasUTP: Prisma.FieldRef<"ConfigRede", 'Int'>;
    readonly portasFibra: Prisma.FieldRef<"ConfigRede", 'Int'>;
    readonly storageConect: Prisma.FieldRef<"ConfigRede", 'String'>;
    readonly discoStorage: Prisma.FieldRef<"ConfigRede", 'String'>;
    readonly ativoId: Prisma.FieldRef<"ConfigRede", 'Int'>;
}
export type ConfigRedeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where?: Prisma.ConfigRedeWhereInput;
    orderBy?: Prisma.ConfigRedeOrderByWithRelationInput | Prisma.ConfigRedeOrderByWithRelationInput[];
    cursor?: Prisma.ConfigRedeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConfigRedeScalarFieldEnum | Prisma.ConfigRedeScalarFieldEnum[];
};
export type ConfigRedeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where?: Prisma.ConfigRedeWhereInput;
    orderBy?: Prisma.ConfigRedeOrderByWithRelationInput | Prisma.ConfigRedeOrderByWithRelationInput[];
    cursor?: Prisma.ConfigRedeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConfigRedeScalarFieldEnum | Prisma.ConfigRedeScalarFieldEnum[];
};
export type ConfigRedeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where?: Prisma.ConfigRedeWhereInput;
    orderBy?: Prisma.ConfigRedeOrderByWithRelationInput | Prisma.ConfigRedeOrderByWithRelationInput[];
    cursor?: Prisma.ConfigRedeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConfigRedeScalarFieldEnum | Prisma.ConfigRedeScalarFieldEnum[];
};
export type ConfigRedeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConfigRedeCreateInput, Prisma.ConfigRedeUncheckedCreateInput>;
};
export type ConfigRedeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConfigRedeCreateManyInput | Prisma.ConfigRedeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConfigRedeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    data: Prisma.ConfigRedeCreateManyInput | Prisma.ConfigRedeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConfigRedeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConfigRedeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConfigRedeUpdateInput, Prisma.ConfigRedeUncheckedUpdateInput>;
    where: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConfigRedeUpdateManyMutationInput, Prisma.ConfigRedeUncheckedUpdateManyInput>;
    where?: Prisma.ConfigRedeWhereInput;
    limit?: number;
};
export type ConfigRedeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConfigRedeUpdateManyMutationInput, Prisma.ConfigRedeUncheckedUpdateManyInput>;
    where?: Prisma.ConfigRedeWhereInput;
    limit?: number;
    include?: Prisma.ConfigRedeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConfigRedeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where: Prisma.ConfigRedeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConfigRedeCreateInput, Prisma.ConfigRedeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConfigRedeUpdateInput, Prisma.ConfigRedeUncheckedUpdateInput>;
};
export type ConfigRedeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
    where: Prisma.ConfigRedeWhereUniqueInput;
};
export type ConfigRedeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConfigRedeWhereInput;
    limit?: number;
};
export type ConfigRedeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConfigRedeSelect<ExtArgs> | null;
    omit?: Prisma.ConfigRedeOmit<ExtArgs> | null;
    include?: Prisma.ConfigRedeInclude<ExtArgs> | null;
};
