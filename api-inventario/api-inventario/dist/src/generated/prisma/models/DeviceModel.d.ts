import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DeviceModelModel = runtime.Types.Result.DefaultSelection<Prisma.$DeviceModelPayload>;
export type AggregateDeviceModel = {
    _count: DeviceModelCountAggregateOutputType | null;
    _avg: DeviceModelAvgAggregateOutputType | null;
    _sum: DeviceModelSumAggregateOutputType | null;
    _min: DeviceModelMinAggregateOutputType | null;
    _max: DeviceModelMaxAggregateOutputType | null;
};
export type DeviceModelAvgAggregateOutputType = {
    id: number | null;
};
export type DeviceModelSumAggregateOutputType = {
    id: number | null;
};
export type DeviceModelMinAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type DeviceModelMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type DeviceModelCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
};
export type DeviceModelAvgAggregateInputType = {
    id?: true;
};
export type DeviceModelSumAggregateInputType = {
    id?: true;
};
export type DeviceModelMinAggregateInputType = {
    id?: true;
    name?: true;
};
export type DeviceModelMaxAggregateInputType = {
    id?: true;
    name?: true;
};
export type DeviceModelCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
};
export type DeviceModelAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceModelWhereInput;
    orderBy?: Prisma.DeviceModelOrderByWithRelationInput | Prisma.DeviceModelOrderByWithRelationInput[];
    cursor?: Prisma.DeviceModelWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DeviceModelCountAggregateInputType;
    _avg?: DeviceModelAvgAggregateInputType;
    _sum?: DeviceModelSumAggregateInputType;
    _min?: DeviceModelMinAggregateInputType;
    _max?: DeviceModelMaxAggregateInputType;
};
export type GetDeviceModelAggregateType<T extends DeviceModelAggregateArgs> = {
    [P in keyof T & keyof AggregateDeviceModel]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDeviceModel[P]> : Prisma.GetScalarType<T[P], AggregateDeviceModel[P]>;
};
export type DeviceModelGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceModelWhereInput;
    orderBy?: Prisma.DeviceModelOrderByWithAggregationInput | Prisma.DeviceModelOrderByWithAggregationInput[];
    by: Prisma.DeviceModelScalarFieldEnum[] | Prisma.DeviceModelScalarFieldEnum;
    having?: Prisma.DeviceModelScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DeviceModelCountAggregateInputType | true;
    _avg?: DeviceModelAvgAggregateInputType;
    _sum?: DeviceModelSumAggregateInputType;
    _min?: DeviceModelMinAggregateInputType;
    _max?: DeviceModelMaxAggregateInputType;
};
export type DeviceModelGroupByOutputType = {
    id: number;
    name: string;
    _count: DeviceModelCountAggregateOutputType | null;
    _avg: DeviceModelAvgAggregateOutputType | null;
    _sum: DeviceModelSumAggregateOutputType | null;
    _min: DeviceModelMinAggregateOutputType | null;
    _max: DeviceModelMaxAggregateOutputType | null;
};
export type GetDeviceModelGroupByPayload<T extends DeviceModelGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DeviceModelGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DeviceModelGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DeviceModelGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DeviceModelGroupByOutputType[P]>;
}>>;
export type DeviceModelWhereInput = {
    AND?: Prisma.DeviceModelWhereInput | Prisma.DeviceModelWhereInput[];
    OR?: Prisma.DeviceModelWhereInput[];
    NOT?: Prisma.DeviceModelWhereInput | Prisma.DeviceModelWhereInput[];
    id?: Prisma.IntFilter<"DeviceModel"> | number;
    name?: Prisma.StringFilter<"DeviceModel"> | string;
    computers?: Prisma.ComputerListRelationFilter;
};
export type DeviceModelOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    computers?: Prisma.ComputerOrderByRelationAggregateInput;
};
export type DeviceModelWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    name?: string;
    AND?: Prisma.DeviceModelWhereInput | Prisma.DeviceModelWhereInput[];
    OR?: Prisma.DeviceModelWhereInput[];
    NOT?: Prisma.DeviceModelWhereInput | Prisma.DeviceModelWhereInput[];
    computers?: Prisma.ComputerListRelationFilter;
}, "id" | "name">;
export type DeviceModelOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.DeviceModelCountOrderByAggregateInput;
    _avg?: Prisma.DeviceModelAvgOrderByAggregateInput;
    _max?: Prisma.DeviceModelMaxOrderByAggregateInput;
    _min?: Prisma.DeviceModelMinOrderByAggregateInput;
    _sum?: Prisma.DeviceModelSumOrderByAggregateInput;
};
export type DeviceModelScalarWhereWithAggregatesInput = {
    AND?: Prisma.DeviceModelScalarWhereWithAggregatesInput | Prisma.DeviceModelScalarWhereWithAggregatesInput[];
    OR?: Prisma.DeviceModelScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DeviceModelScalarWhereWithAggregatesInput | Prisma.DeviceModelScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"DeviceModel"> | number;
    name?: Prisma.StringWithAggregatesFilter<"DeviceModel"> | string;
};
export type DeviceModelCreateInput = {
    name: string;
    computers?: Prisma.ComputerCreateNestedManyWithoutDeviceModelInput;
};
export type DeviceModelUncheckedCreateInput = {
    id?: number;
    name: string;
    computers?: Prisma.ComputerUncheckedCreateNestedManyWithoutDeviceModelInput;
};
export type DeviceModelUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    computers?: Prisma.ComputerUpdateManyWithoutDeviceModelNestedInput;
};
export type DeviceModelUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    computers?: Prisma.ComputerUncheckedUpdateManyWithoutDeviceModelNestedInput;
};
export type DeviceModelCreateManyInput = {
    id?: number;
    name: string;
};
export type DeviceModelUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DeviceModelUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DeviceModelCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DeviceModelAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type DeviceModelMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DeviceModelMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type DeviceModelSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type DeviceModelNullableScalarRelationFilter = {
    is?: Prisma.DeviceModelWhereInput | null;
    isNot?: Prisma.DeviceModelWhereInput | null;
};
export type DeviceModelCreateNestedOneWithoutComputersInput = {
    create?: Prisma.XOR<Prisma.DeviceModelCreateWithoutComputersInput, Prisma.DeviceModelUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.DeviceModelCreateOrConnectWithoutComputersInput;
    connect?: Prisma.DeviceModelWhereUniqueInput;
};
export type DeviceModelUpdateOneWithoutComputersNestedInput = {
    create?: Prisma.XOR<Prisma.DeviceModelCreateWithoutComputersInput, Prisma.DeviceModelUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.DeviceModelCreateOrConnectWithoutComputersInput;
    upsert?: Prisma.DeviceModelUpsertWithoutComputersInput;
    disconnect?: Prisma.DeviceModelWhereInput | boolean;
    delete?: Prisma.DeviceModelWhereInput | boolean;
    connect?: Prisma.DeviceModelWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DeviceModelUpdateToOneWithWhereWithoutComputersInput, Prisma.DeviceModelUpdateWithoutComputersInput>, Prisma.DeviceModelUncheckedUpdateWithoutComputersInput>;
};
export type DeviceModelCreateWithoutComputersInput = {
    name: string;
};
export type DeviceModelUncheckedCreateWithoutComputersInput = {
    id?: number;
    name: string;
};
export type DeviceModelCreateOrConnectWithoutComputersInput = {
    where: Prisma.DeviceModelWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceModelCreateWithoutComputersInput, Prisma.DeviceModelUncheckedCreateWithoutComputersInput>;
};
export type DeviceModelUpsertWithoutComputersInput = {
    update: Prisma.XOR<Prisma.DeviceModelUpdateWithoutComputersInput, Prisma.DeviceModelUncheckedUpdateWithoutComputersInput>;
    create: Prisma.XOR<Prisma.DeviceModelCreateWithoutComputersInput, Prisma.DeviceModelUncheckedCreateWithoutComputersInput>;
    where?: Prisma.DeviceModelWhereInput;
};
export type DeviceModelUpdateToOneWithWhereWithoutComputersInput = {
    where?: Prisma.DeviceModelWhereInput;
    data: Prisma.XOR<Prisma.DeviceModelUpdateWithoutComputersInput, Prisma.DeviceModelUncheckedUpdateWithoutComputersInput>;
};
export type DeviceModelUpdateWithoutComputersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DeviceModelUncheckedUpdateWithoutComputersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DeviceModelCountOutputType = {
    computers: number;
};
export type DeviceModelCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | DeviceModelCountOutputTypeCountComputersArgs;
};
export type DeviceModelCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelCountOutputTypeSelect<ExtArgs> | null;
};
export type DeviceModelCountOutputTypeCountComputersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComputerWhereInput;
};
export type DeviceModelSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    computers?: boolean | Prisma.DeviceModel$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeviceModelCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["deviceModel"]>;
export type DeviceModelSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["deviceModel"]>;
export type DeviceModelSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["deviceModel"]>;
export type DeviceModelSelectScalar = {
    id?: boolean;
    name?: boolean;
};
export type DeviceModelOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name", ExtArgs["result"]["deviceModel"]>;
export type DeviceModelInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | Prisma.DeviceModel$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.DeviceModelCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DeviceModelIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DeviceModelIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DeviceModelPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DeviceModel";
    objects: {
        computers: Prisma.$ComputerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
    }, ExtArgs["result"]["deviceModel"]>;
    composites: {};
};
export type DeviceModelGetPayload<S extends boolean | null | undefined | DeviceModelDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload, S>;
export type DeviceModelCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DeviceModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DeviceModelCountAggregateInputType | true;
};
export interface DeviceModelDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DeviceModel'];
        meta: {
            name: 'DeviceModel';
        };
    };
    findUnique<T extends DeviceModelFindUniqueArgs>(args: Prisma.SelectSubset<T, DeviceModelFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DeviceModelFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DeviceModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DeviceModelFindFirstArgs>(args?: Prisma.SelectSubset<T, DeviceModelFindFirstArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DeviceModelFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DeviceModelFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DeviceModelFindManyArgs>(args?: Prisma.SelectSubset<T, DeviceModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DeviceModelCreateArgs>(args: Prisma.SelectSubset<T, DeviceModelCreateArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DeviceModelCreateManyArgs>(args?: Prisma.SelectSubset<T, DeviceModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DeviceModelCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DeviceModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DeviceModelDeleteArgs>(args: Prisma.SelectSubset<T, DeviceModelDeleteArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DeviceModelUpdateArgs>(args: Prisma.SelectSubset<T, DeviceModelUpdateArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DeviceModelDeleteManyArgs>(args?: Prisma.SelectSubset<T, DeviceModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DeviceModelUpdateManyArgs>(args: Prisma.SelectSubset<T, DeviceModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DeviceModelUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DeviceModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DeviceModelUpsertArgs>(args: Prisma.SelectSubset<T, DeviceModelUpsertArgs<ExtArgs>>): Prisma.Prisma__DeviceModelClient<runtime.Types.Result.GetResult<Prisma.$DeviceModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DeviceModelCountArgs>(args?: Prisma.Subset<T, DeviceModelCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DeviceModelCountAggregateOutputType> : number>;
    aggregate<T extends DeviceModelAggregateArgs>(args: Prisma.Subset<T, DeviceModelAggregateArgs>): Prisma.PrismaPromise<GetDeviceModelAggregateType<T>>;
    groupBy<T extends DeviceModelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DeviceModelGroupByArgs['orderBy'];
    } : {
        orderBy?: DeviceModelGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DeviceModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DeviceModelFieldRefs;
}
export interface Prisma__DeviceModelClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computers<T extends Prisma.DeviceModel$computersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DeviceModel$computersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DeviceModelFieldRefs {
    readonly id: Prisma.FieldRef<"DeviceModel", 'Int'>;
    readonly name: Prisma.FieldRef<"DeviceModel", 'String'>;
}
export type DeviceModelFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where: Prisma.DeviceModelWhereUniqueInput;
};
export type DeviceModelFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where: Prisma.DeviceModelWhereUniqueInput;
};
export type DeviceModelFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where?: Prisma.DeviceModelWhereInput;
    orderBy?: Prisma.DeviceModelOrderByWithRelationInput | Prisma.DeviceModelOrderByWithRelationInput[];
    cursor?: Prisma.DeviceModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceModelScalarFieldEnum | Prisma.DeviceModelScalarFieldEnum[];
};
export type DeviceModelFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where?: Prisma.DeviceModelWhereInput;
    orderBy?: Prisma.DeviceModelOrderByWithRelationInput | Prisma.DeviceModelOrderByWithRelationInput[];
    cursor?: Prisma.DeviceModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceModelScalarFieldEnum | Prisma.DeviceModelScalarFieldEnum[];
};
export type DeviceModelFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where?: Prisma.DeviceModelWhereInput;
    orderBy?: Prisma.DeviceModelOrderByWithRelationInput | Prisma.DeviceModelOrderByWithRelationInput[];
    cursor?: Prisma.DeviceModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DeviceModelScalarFieldEnum | Prisma.DeviceModelScalarFieldEnum[];
};
export type DeviceModelCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceModelCreateInput, Prisma.DeviceModelUncheckedCreateInput>;
};
export type DeviceModelCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DeviceModelCreateManyInput | Prisma.DeviceModelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeviceModelCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    data: Prisma.DeviceModelCreateManyInput | Prisma.DeviceModelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DeviceModelUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceModelUpdateInput, Prisma.DeviceModelUncheckedUpdateInput>;
    where: Prisma.DeviceModelWhereUniqueInput;
};
export type DeviceModelUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DeviceModelUpdateManyMutationInput, Prisma.DeviceModelUncheckedUpdateManyInput>;
    where?: Prisma.DeviceModelWhereInput;
    limit?: number;
};
export type DeviceModelUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DeviceModelUpdateManyMutationInput, Prisma.DeviceModelUncheckedUpdateManyInput>;
    where?: Prisma.DeviceModelWhereInput;
    limit?: number;
};
export type DeviceModelUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where: Prisma.DeviceModelWhereUniqueInput;
    create: Prisma.XOR<Prisma.DeviceModelCreateInput, Prisma.DeviceModelUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DeviceModelUpdateInput, Prisma.DeviceModelUncheckedUpdateInput>;
};
export type DeviceModelDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
    where: Prisma.DeviceModelWhereUniqueInput;
};
export type DeviceModelDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DeviceModelWhereInput;
    limit?: number;
};
export type DeviceModel$computersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ComputerSelect<ExtArgs> | null;
    omit?: Prisma.ComputerOmit<ExtArgs> | null;
    include?: Prisma.ComputerInclude<ExtArgs> | null;
    where?: Prisma.ComputerWhereInput;
    orderBy?: Prisma.ComputerOrderByWithRelationInput | Prisma.ComputerOrderByWithRelationInput[];
    cursor?: Prisma.ComputerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ComputerScalarFieldEnum | Prisma.ComputerScalarFieldEnum[];
};
export type DeviceModelDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DeviceModelSelect<ExtArgs> | null;
    omit?: Prisma.DeviceModelOmit<ExtArgs> | null;
    include?: Prisma.DeviceModelInclude<ExtArgs> | null;
};
