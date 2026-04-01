import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ModelModel = runtime.Types.Result.DefaultSelection<Prisma.$ModelPayload>;
export type AggregateModel = {
    _count: ModelCountAggregateOutputType | null;
    _avg: ModelAvgAggregateOutputType | null;
    _sum: ModelSumAggregateOutputType | null;
    _min: ModelMinAggregateOutputType | null;
    _max: ModelMaxAggregateOutputType | null;
};
export type ModelAvgAggregateOutputType = {
    id: number | null;
};
export type ModelSumAggregateOutputType = {
    id: number | null;
};
export type ModelMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    manufacturer: string | null;
    category: string | null;
};
export type ModelMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    manufacturer: string | null;
    category: string | null;
};
export type ModelCountAggregateOutputType = {
    id: number;
    name: number;
    manufacturer: number;
    category: number;
    _all: number;
};
export type ModelAvgAggregateInputType = {
    id?: true;
};
export type ModelSumAggregateInputType = {
    id?: true;
};
export type ModelMinAggregateInputType = {
    id?: true;
    name?: true;
    manufacturer?: true;
    category?: true;
};
export type ModelMaxAggregateInputType = {
    id?: true;
    name?: true;
    manufacturer?: true;
    category?: true;
};
export type ModelCountAggregateInputType = {
    id?: true;
    name?: true;
    manufacturer?: true;
    category?: true;
    _all?: true;
};
export type ModelAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithRelationInput | Prisma.ModelOrderByWithRelationInput[];
    cursor?: Prisma.ModelWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ModelCountAggregateInputType;
    _avg?: ModelAvgAggregateInputType;
    _sum?: ModelSumAggregateInputType;
    _min?: ModelMinAggregateInputType;
    _max?: ModelMaxAggregateInputType;
};
export type GetModelAggregateType<T extends ModelAggregateArgs> = {
    [P in keyof T & keyof AggregateModel]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateModel[P]> : Prisma.GetScalarType<T[P], AggregateModel[P]>;
};
export type ModelGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithAggregationInput | Prisma.ModelOrderByWithAggregationInput[];
    by: Prisma.ModelScalarFieldEnum[] | Prisma.ModelScalarFieldEnum;
    having?: Prisma.ModelScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ModelCountAggregateInputType | true;
    _avg?: ModelAvgAggregateInputType;
    _sum?: ModelSumAggregateInputType;
    _min?: ModelMinAggregateInputType;
    _max?: ModelMaxAggregateInputType;
};
export type ModelGroupByOutputType = {
    id: number;
    name: string;
    manufacturer: string;
    category: string;
    _count: ModelCountAggregateOutputType | null;
    _avg: ModelAvgAggregateOutputType | null;
    _sum: ModelSumAggregateOutputType | null;
    _min: ModelMinAggregateOutputType | null;
    _max: ModelMaxAggregateOutputType | null;
};
export type GetModelGroupByPayload<T extends ModelGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ModelGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ModelGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ModelGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ModelGroupByOutputType[P]>;
}>>;
export type ModelWhereInput = {
    AND?: Prisma.ModelWhereInput | Prisma.ModelWhereInput[];
    OR?: Prisma.ModelWhereInput[];
    NOT?: Prisma.ModelWhereInput | Prisma.ModelWhereInput[];
    id?: Prisma.IntFilter<"Model"> | number;
    name?: Prisma.StringFilter<"Model"> | string;
    manufacturer?: Prisma.StringFilter<"Model"> | string;
    category?: Prisma.StringFilter<"Model"> | string;
    assets?: Prisma.AssetListRelationFilter;
};
export type ModelOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    assets?: Prisma.AssetOrderByRelationAggregateInput;
};
export type ModelWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.ModelWhereInput | Prisma.ModelWhereInput[];
    OR?: Prisma.ModelWhereInput[];
    NOT?: Prisma.ModelWhereInput | Prisma.ModelWhereInput[];
    name?: Prisma.StringFilter<"Model"> | string;
    manufacturer?: Prisma.StringFilter<"Model"> | string;
    category?: Prisma.StringFilter<"Model"> | string;
    assets?: Prisma.AssetListRelationFilter;
}, "id">;
export type ModelOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    _count?: Prisma.ModelCountOrderByAggregateInput;
    _avg?: Prisma.ModelAvgOrderByAggregateInput;
    _max?: Prisma.ModelMaxOrderByAggregateInput;
    _min?: Prisma.ModelMinOrderByAggregateInput;
    _sum?: Prisma.ModelSumOrderByAggregateInput;
};
export type ModelScalarWhereWithAggregatesInput = {
    AND?: Prisma.ModelScalarWhereWithAggregatesInput | Prisma.ModelScalarWhereWithAggregatesInput[];
    OR?: Prisma.ModelScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ModelScalarWhereWithAggregatesInput | Prisma.ModelScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Model"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Model"> | string;
    manufacturer?: Prisma.StringWithAggregatesFilter<"Model"> | string;
    category?: Prisma.StringWithAggregatesFilter<"Model"> | string;
};
export type ModelCreateInput = {
    name: string;
    manufacturer: string;
    category: string;
    assets?: Prisma.AssetCreateNestedManyWithoutModelInput;
};
export type ModelUncheckedCreateInput = {
    id?: number;
    name: string;
    manufacturer: string;
    category: string;
    assets?: Prisma.AssetUncheckedCreateNestedManyWithoutModelInput;
};
export type ModelUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    assets?: Prisma.AssetUpdateManyWithoutModelNestedInput;
};
export type ModelUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    assets?: Prisma.AssetUncheckedUpdateManyWithoutModelNestedInput;
};
export type ModelCreateManyInput = {
    id?: number;
    name: string;
    manufacturer: string;
    category: string;
};
export type ModelUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ModelUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ModelScalarRelationFilter = {
    is?: Prisma.ModelWhereInput;
    isNot?: Prisma.ModelWhereInput;
};
export type ModelCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
};
export type ModelAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ModelMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
};
export type ModelMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    manufacturer?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
};
export type ModelSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type ModelCreateNestedOneWithoutAssetsInput = {
    create?: Prisma.XOR<Prisma.ModelCreateWithoutAssetsInput, Prisma.ModelUncheckedCreateWithoutAssetsInput>;
    connectOrCreate?: Prisma.ModelCreateOrConnectWithoutAssetsInput;
    connect?: Prisma.ModelWhereUniqueInput;
};
export type ModelUpdateOneRequiredWithoutAssetsNestedInput = {
    create?: Prisma.XOR<Prisma.ModelCreateWithoutAssetsInput, Prisma.ModelUncheckedCreateWithoutAssetsInput>;
    connectOrCreate?: Prisma.ModelCreateOrConnectWithoutAssetsInput;
    upsert?: Prisma.ModelUpsertWithoutAssetsInput;
    connect?: Prisma.ModelWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ModelUpdateToOneWithWhereWithoutAssetsInput, Prisma.ModelUpdateWithoutAssetsInput>, Prisma.ModelUncheckedUpdateWithoutAssetsInput>;
};
export type ModelCreateWithoutAssetsInput = {
    name: string;
    manufacturer: string;
    category: string;
};
export type ModelUncheckedCreateWithoutAssetsInput = {
    id?: number;
    name: string;
    manufacturer: string;
    category: string;
};
export type ModelCreateOrConnectWithoutAssetsInput = {
    where: Prisma.ModelWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModelCreateWithoutAssetsInput, Prisma.ModelUncheckedCreateWithoutAssetsInput>;
};
export type ModelUpsertWithoutAssetsInput = {
    update: Prisma.XOR<Prisma.ModelUpdateWithoutAssetsInput, Prisma.ModelUncheckedUpdateWithoutAssetsInput>;
    create: Prisma.XOR<Prisma.ModelCreateWithoutAssetsInput, Prisma.ModelUncheckedCreateWithoutAssetsInput>;
    where?: Prisma.ModelWhereInput;
};
export type ModelUpdateToOneWithWhereWithoutAssetsInput = {
    where?: Prisma.ModelWhereInput;
    data: Prisma.XOR<Prisma.ModelUpdateWithoutAssetsInput, Prisma.ModelUncheckedUpdateWithoutAssetsInput>;
};
export type ModelUpdateWithoutAssetsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ModelUncheckedUpdateWithoutAssetsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    manufacturer?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ModelCountOutputType = {
    assets: number;
};
export type ModelCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assets?: boolean | ModelCountOutputTypeCountAssetsArgs;
};
export type ModelCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelCountOutputTypeSelect<ExtArgs> | null;
};
export type ModelCountOutputTypeCountAssetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
};
export type ModelSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    manufacturer?: boolean;
    category?: boolean;
    assets?: boolean | Prisma.Model$assetsArgs<ExtArgs>;
    _count?: boolean | Prisma.ModelCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["model"]>;
export type ModelSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    manufacturer?: boolean;
    category?: boolean;
}, ExtArgs["result"]["model"]>;
export type ModelSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    manufacturer?: boolean;
    category?: boolean;
}, ExtArgs["result"]["model"]>;
export type ModelSelectScalar = {
    id?: boolean;
    name?: boolean;
    manufacturer?: boolean;
    category?: boolean;
};
export type ModelOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "manufacturer" | "category", ExtArgs["result"]["model"]>;
export type ModelInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assets?: boolean | Prisma.Model$assetsArgs<ExtArgs>;
    _count?: boolean | Prisma.ModelCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ModelIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ModelIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ModelPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Model";
    objects: {
        assets: Prisma.$AssetPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        manufacturer: string;
        category: string;
    }, ExtArgs["result"]["model"]>;
    composites: {};
};
export type ModelGetPayload<S extends boolean | null | undefined | ModelDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ModelPayload, S>;
export type ModelCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ModelCountAggregateInputType | true;
};
export interface ModelDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Model'];
        meta: {
            name: 'Model';
        };
    };
    findUnique<T extends ModelFindUniqueArgs>(args: Prisma.SelectSubset<T, ModelFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ModelFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ModelFindFirstArgs>(args?: Prisma.SelectSubset<T, ModelFindFirstArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ModelFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ModelFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ModelFindManyArgs>(args?: Prisma.SelectSubset<T, ModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ModelCreateArgs>(args: Prisma.SelectSubset<T, ModelCreateArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ModelCreateManyArgs>(args?: Prisma.SelectSubset<T, ModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ModelCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ModelDeleteArgs>(args: Prisma.SelectSubset<T, ModelDeleteArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ModelUpdateArgs>(args: Prisma.SelectSubset<T, ModelUpdateArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ModelDeleteManyArgs>(args?: Prisma.SelectSubset<T, ModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ModelUpdateManyArgs>(args: Prisma.SelectSubset<T, ModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ModelUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ModelUpsertArgs>(args: Prisma.SelectSubset<T, ModelUpsertArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ModelCountArgs>(args?: Prisma.Subset<T, ModelCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ModelCountAggregateOutputType> : number>;
    aggregate<T extends ModelAggregateArgs>(args: Prisma.Subset<T, ModelAggregateArgs>): Prisma.PrismaPromise<GetModelAggregateType<T>>;
    groupBy<T extends ModelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ModelGroupByArgs['orderBy'];
    } : {
        orderBy?: ModelGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ModelFieldRefs;
}
export interface Prisma__ModelClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assets<T extends Prisma.Model$assetsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Model$assetsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ModelFieldRefs {
    readonly id: Prisma.FieldRef<"Model", 'Int'>;
    readonly name: Prisma.FieldRef<"Model", 'String'>;
    readonly manufacturer: Prisma.FieldRef<"Model", 'String'>;
    readonly category: Prisma.FieldRef<"Model", 'String'>;
}
export type ModelFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where: Prisma.ModelWhereUniqueInput;
};
export type ModelFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where: Prisma.ModelWhereUniqueInput;
};
export type ModelFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithRelationInput | Prisma.ModelOrderByWithRelationInput[];
    cursor?: Prisma.ModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModelScalarFieldEnum | Prisma.ModelScalarFieldEnum[];
};
export type ModelFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithRelationInput | Prisma.ModelOrderByWithRelationInput[];
    cursor?: Prisma.ModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModelScalarFieldEnum | Prisma.ModelScalarFieldEnum[];
};
export type ModelFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where?: Prisma.ModelWhereInput;
    orderBy?: Prisma.ModelOrderByWithRelationInput | Prisma.ModelOrderByWithRelationInput[];
    cursor?: Prisma.ModelWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ModelScalarFieldEnum | Prisma.ModelScalarFieldEnum[];
};
export type ModelCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModelCreateInput, Prisma.ModelUncheckedCreateInput>;
};
export type ModelCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ModelCreateManyInput | Prisma.ModelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ModelCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    data: Prisma.ModelCreateManyInput | Prisma.ModelCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ModelUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModelUpdateInput, Prisma.ModelUncheckedUpdateInput>;
    where: Prisma.ModelWhereUniqueInput;
};
export type ModelUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ModelUpdateManyMutationInput, Prisma.ModelUncheckedUpdateManyInput>;
    where?: Prisma.ModelWhereInput;
    limit?: number;
};
export type ModelUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ModelUpdateManyMutationInput, Prisma.ModelUncheckedUpdateManyInput>;
    where?: Prisma.ModelWhereInput;
    limit?: number;
};
export type ModelUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where: Prisma.ModelWhereUniqueInput;
    create: Prisma.XOR<Prisma.ModelCreateInput, Prisma.ModelUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ModelUpdateInput, Prisma.ModelUncheckedUpdateInput>;
};
export type ModelDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
    where: Prisma.ModelWhereUniqueInput;
};
export type ModelDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ModelWhereInput;
    limit?: number;
};
export type Model$assetsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    cursor?: Prisma.AssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssetScalarFieldEnum | Prisma.AssetScalarFieldEnum[];
};
export type ModelDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ModelSelect<ExtArgs> | null;
    omit?: Prisma.ModelOmit<ExtArgs> | null;
    include?: Prisma.ModelInclude<ExtArgs> | null;
};
