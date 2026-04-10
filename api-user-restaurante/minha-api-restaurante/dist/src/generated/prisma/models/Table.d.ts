import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TableModel = runtime.Types.Result.DefaultSelection<Prisma.$TablePayload>;
export type AggregateTable = {
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
};
export type TableAvgAggregateOutputType = {
    number: number | null;
};
export type TableSumAggregateOutputType = {
    number: number | null;
};
export type TableMinAggregateOutputType = {
    id: string | null;
    number: number | null;
    status: $Enums.TableStatus | null;
};
export type TableMaxAggregateOutputType = {
    id: string | null;
    number: number | null;
    status: $Enums.TableStatus | null;
};
export type TableCountAggregateOutputType = {
    id: number;
    number: number;
    status: number;
    _all: number;
};
export type TableAvgAggregateInputType = {
    number?: true;
};
export type TableSumAggregateInputType = {
    number?: true;
};
export type TableMinAggregateInputType = {
    id?: true;
    number?: true;
    status?: true;
};
export type TableMaxAggregateInputType = {
    id?: true;
    number?: true;
    status?: true;
};
export type TableCountAggregateInputType = {
    id?: true;
    number?: true;
    status?: true;
    _all?: true;
};
export type TableAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput | Prisma.TableOrderByWithRelationInput[];
    cursor?: Prisma.TableWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TableCountAggregateInputType;
    _avg?: TableAvgAggregateInputType;
    _sum?: TableSumAggregateInputType;
    _min?: TableMinAggregateInputType;
    _max?: TableMaxAggregateInputType;
};
export type GetTableAggregateType<T extends TableAggregateArgs> = {
    [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTable[P]> : Prisma.GetScalarType<T[P], AggregateTable[P]>;
};
export type TableGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithAggregationInput | Prisma.TableOrderByWithAggregationInput[];
    by: Prisma.TableScalarFieldEnum[] | Prisma.TableScalarFieldEnum;
    having?: Prisma.TableScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TableCountAggregateInputType | true;
    _avg?: TableAvgAggregateInputType;
    _sum?: TableSumAggregateInputType;
    _min?: TableMinAggregateInputType;
    _max?: TableMaxAggregateInputType;
};
export type TableGroupByOutputType = {
    id: string;
    number: number;
    status: $Enums.TableStatus;
    _count: TableCountAggregateOutputType | null;
    _avg: TableAvgAggregateOutputType | null;
    _sum: TableSumAggregateOutputType | null;
    _min: TableMinAggregateOutputType | null;
    _max: TableMaxAggregateOutputType | null;
};
export type GetTableGroupByPayload<T extends TableGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TableGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TableGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TableGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TableGroupByOutputType[P]>;
}>>;
export type TableWhereInput = {
    AND?: Prisma.TableWhereInput | Prisma.TableWhereInput[];
    OR?: Prisma.TableWhereInput[];
    NOT?: Prisma.TableWhereInput | Prisma.TableWhereInput[];
    id?: Prisma.StringFilter<"Table"> | string;
    number?: Prisma.IntFilter<"Table"> | number;
    status?: Prisma.EnumTableStatusFilter<"Table"> | $Enums.TableStatus;
    orders?: Prisma.OrderListRelationFilter;
};
export type TableOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type TableWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    number?: number;
    AND?: Prisma.TableWhereInput | Prisma.TableWhereInput[];
    OR?: Prisma.TableWhereInput[];
    NOT?: Prisma.TableWhereInput | Prisma.TableWhereInput[];
    status?: Prisma.EnumTableStatusFilter<"Table"> | $Enums.TableStatus;
    orders?: Prisma.OrderListRelationFilter;
}, "id" | "number">;
export type TableOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    _count?: Prisma.TableCountOrderByAggregateInput;
    _avg?: Prisma.TableAvgOrderByAggregateInput;
    _max?: Prisma.TableMaxOrderByAggregateInput;
    _min?: Prisma.TableMinOrderByAggregateInput;
    _sum?: Prisma.TableSumOrderByAggregateInput;
};
export type TableScalarWhereWithAggregatesInput = {
    AND?: Prisma.TableScalarWhereWithAggregatesInput | Prisma.TableScalarWhereWithAggregatesInput[];
    OR?: Prisma.TableScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TableScalarWhereWithAggregatesInput | Prisma.TableScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Table"> | string;
    number?: Prisma.IntWithAggregatesFilter<"Table"> | number;
    status?: Prisma.EnumTableStatusWithAggregatesFilter<"Table"> | $Enums.TableStatus;
};
export type TableCreateInput = {
    id?: string;
    number: number;
    status?: $Enums.TableStatus;
    orders?: Prisma.OrderCreateNestedManyWithoutTableInput;
};
export type TableUncheckedCreateInput = {
    id?: string;
    number: number;
    status?: $Enums.TableStatus;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutTableInput;
};
export type TableUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
    orders?: Prisma.OrderUpdateManyWithoutTableNestedInput;
};
export type TableUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutTableNestedInput;
};
export type TableCreateManyInput = {
    id?: string;
    number: number;
    status?: $Enums.TableStatus;
};
export type TableUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
};
export type TableUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
};
export type TableCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TableAvgOrderByAggregateInput = {
    number?: Prisma.SortOrder;
};
export type TableMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TableMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
};
export type TableSumOrderByAggregateInput = {
    number?: Prisma.SortOrder;
};
export type TableScalarRelationFilter = {
    is?: Prisma.TableWhereInput;
    isNot?: Prisma.TableWhereInput;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumTableStatusFieldUpdateOperationsInput = {
    set?: $Enums.TableStatus;
};
export type TableCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.TableCreateWithoutOrdersInput, Prisma.TableUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.TableCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.TableWhereUniqueInput;
};
export type TableUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.TableCreateWithoutOrdersInput, Prisma.TableUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.TableCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.TableUpsertWithoutOrdersInput;
    connect?: Prisma.TableWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TableUpdateToOneWithWhereWithoutOrdersInput, Prisma.TableUpdateWithoutOrdersInput>, Prisma.TableUncheckedUpdateWithoutOrdersInput>;
};
export type TableCreateWithoutOrdersInput = {
    id?: string;
    number: number;
    status?: $Enums.TableStatus;
};
export type TableUncheckedCreateWithoutOrdersInput = {
    id?: string;
    number: number;
    status?: $Enums.TableStatus;
};
export type TableCreateOrConnectWithoutOrdersInput = {
    where: Prisma.TableWhereUniqueInput;
    create: Prisma.XOR<Prisma.TableCreateWithoutOrdersInput, Prisma.TableUncheckedCreateWithoutOrdersInput>;
};
export type TableUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.TableUpdateWithoutOrdersInput, Prisma.TableUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.TableCreateWithoutOrdersInput, Prisma.TableUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.TableWhereInput;
};
export type TableUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.TableWhereInput;
    data: Prisma.XOR<Prisma.TableUpdateWithoutOrdersInput, Prisma.TableUncheckedUpdateWithoutOrdersInput>;
};
export type TableUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
};
export type TableUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumTableStatusFieldUpdateOperationsInput | $Enums.TableStatus;
};
export type TableCountOutputType = {
    orders: number;
};
export type TableCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | TableCountOutputTypeCountOrdersArgs;
};
export type TableCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableCountOutputTypeSelect<ExtArgs> | null;
};
export type TableCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type TableSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    number?: boolean;
    status?: boolean;
    orders?: boolean | Prisma.Table$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.TableCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["table"]>;
export type TableSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    number?: boolean;
    status?: boolean;
}, ExtArgs["result"]["table"]>;
export type TableSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    number?: boolean;
    status?: boolean;
}, ExtArgs["result"]["table"]>;
export type TableSelectScalar = {
    id?: boolean;
    number?: boolean;
    status?: boolean;
};
export type TableOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "number" | "status", ExtArgs["result"]["table"]>;
export type TableInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    orders?: boolean | Prisma.Table$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.TableCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TableIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TableIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TablePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Table";
    objects: {
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        number: number;
        status: $Enums.TableStatus;
    }, ExtArgs["result"]["table"]>;
    composites: {};
};
export type TableGetPayload<S extends boolean | null | undefined | TableDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TablePayload, S>;
export type TableCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TableCountAggregateInputType | true;
};
export interface TableDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Table'];
        meta: {
            name: 'Table';
        };
    };
    findUnique<T extends TableFindUniqueArgs>(args: Prisma.SelectSubset<T, TableFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TableFindFirstArgs>(args?: Prisma.SelectSubset<T, TableFindFirstArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TableFindManyArgs>(args?: Prisma.SelectSubset<T, TableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TableCreateArgs>(args: Prisma.SelectSubset<T, TableCreateArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TableCreateManyArgs>(args?: Prisma.SelectSubset<T, TableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TableDeleteArgs>(args: Prisma.SelectSubset<T, TableDeleteArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TableUpdateArgs>(args: Prisma.SelectSubset<T, TableUpdateArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TableDeleteManyArgs>(args?: Prisma.SelectSubset<T, TableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TableUpdateManyArgs>(args: Prisma.SelectSubset<T, TableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TableUpsertArgs>(args: Prisma.SelectSubset<T, TableUpsertArgs<ExtArgs>>): Prisma.Prisma__TableClient<runtime.Types.Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TableCountArgs>(args?: Prisma.Subset<T, TableCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TableCountAggregateOutputType> : number>;
    aggregate<T extends TableAggregateArgs>(args: Prisma.Subset<T, TableAggregateArgs>): Prisma.PrismaPromise<GetTableAggregateType<T>>;
    groupBy<T extends TableGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TableGroupByArgs['orderBy'];
    } : {
        orderBy?: TableGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TableFieldRefs;
}
export interface Prisma__TableClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    orders<T extends Prisma.Table$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Table$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TableFieldRefs {
    readonly id: Prisma.FieldRef<"Table", 'String'>;
    readonly number: Prisma.FieldRef<"Table", 'Int'>;
    readonly status: Prisma.FieldRef<"Table", 'TableStatus'>;
}
export type TableFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where: Prisma.TableWhereUniqueInput;
};
export type TableFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where: Prisma.TableWhereUniqueInput;
};
export type TableFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput | Prisma.TableOrderByWithRelationInput[];
    cursor?: Prisma.TableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TableScalarFieldEnum | Prisma.TableScalarFieldEnum[];
};
export type TableFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput | Prisma.TableOrderByWithRelationInput[];
    cursor?: Prisma.TableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TableScalarFieldEnum | Prisma.TableScalarFieldEnum[];
};
export type TableFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where?: Prisma.TableWhereInput;
    orderBy?: Prisma.TableOrderByWithRelationInput | Prisma.TableOrderByWithRelationInput[];
    cursor?: Prisma.TableWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TableScalarFieldEnum | Prisma.TableScalarFieldEnum[];
};
export type TableCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TableCreateInput, Prisma.TableUncheckedCreateInput>;
};
export type TableCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TableCreateManyInput | Prisma.TableCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TableCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    data: Prisma.TableCreateManyInput | Prisma.TableCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TableUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TableUpdateInput, Prisma.TableUncheckedUpdateInput>;
    where: Prisma.TableWhereUniqueInput;
};
export type TableUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TableUpdateManyMutationInput, Prisma.TableUncheckedUpdateManyInput>;
    where?: Prisma.TableWhereInput;
    limit?: number;
};
export type TableUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TableUpdateManyMutationInput, Prisma.TableUncheckedUpdateManyInput>;
    where?: Prisma.TableWhereInput;
    limit?: number;
};
export type TableUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where: Prisma.TableWhereUniqueInput;
    create: Prisma.XOR<Prisma.TableCreateInput, Prisma.TableUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TableUpdateInput, Prisma.TableUncheckedUpdateInput>;
};
export type TableDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
    where: Prisma.TableWhereUniqueInput;
};
export type TableDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TableWhereInput;
    limit?: number;
};
export type Table$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type TableDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TableSelect<ExtArgs> | null;
    omit?: Prisma.TableOmit<ExtArgs> | null;
    include?: Prisma.TableInclude<ExtArgs> | null;
};
