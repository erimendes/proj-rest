import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StatusModel = runtime.Types.Result.DefaultSelection<Prisma.$StatusPayload>;
export type AggregateStatus = {
    _count: StatusCountAggregateOutputType | null;
    _avg: StatusAvgAggregateOutputType | null;
    _sum: StatusSumAggregateOutputType | null;
    _min: StatusMinAggregateOutputType | null;
    _max: StatusMaxAggregateOutputType | null;
};
export type StatusAvgAggregateOutputType = {
    id: number | null;
};
export type StatusSumAggregateOutputType = {
    id: number | null;
};
export type StatusMinAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type StatusMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type StatusCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
};
export type StatusAvgAggregateInputType = {
    id?: true;
};
export type StatusSumAggregateInputType = {
    id?: true;
};
export type StatusMinAggregateInputType = {
    id?: true;
    name?: true;
};
export type StatusMaxAggregateInputType = {
    id?: true;
    name?: true;
};
export type StatusCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
};
export type StatusAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput | Prisma.StatusOrderByWithRelationInput[];
    cursor?: Prisma.StatusWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StatusCountAggregateInputType;
    _avg?: StatusAvgAggregateInputType;
    _sum?: StatusSumAggregateInputType;
    _min?: StatusMinAggregateInputType;
    _max?: StatusMaxAggregateInputType;
};
export type GetStatusAggregateType<T extends StatusAggregateArgs> = {
    [P in keyof T & keyof AggregateStatus]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStatus[P]> : Prisma.GetScalarType<T[P], AggregateStatus[P]>;
};
export type StatusGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithAggregationInput | Prisma.StatusOrderByWithAggregationInput[];
    by: Prisma.StatusScalarFieldEnum[] | Prisma.StatusScalarFieldEnum;
    having?: Prisma.StatusScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StatusCountAggregateInputType | true;
    _avg?: StatusAvgAggregateInputType;
    _sum?: StatusSumAggregateInputType;
    _min?: StatusMinAggregateInputType;
    _max?: StatusMaxAggregateInputType;
};
export type StatusGroupByOutputType = {
    id: number;
    name: string;
    _count: StatusCountAggregateOutputType | null;
    _avg: StatusAvgAggregateOutputType | null;
    _sum: StatusSumAggregateOutputType | null;
    _min: StatusMinAggregateOutputType | null;
    _max: StatusMaxAggregateOutputType | null;
};
export type GetStatusGroupByPayload<T extends StatusGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StatusGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StatusGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StatusGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StatusGroupByOutputType[P]>;
}>>;
export type StatusWhereInput = {
    AND?: Prisma.StatusWhereInput | Prisma.StatusWhereInput[];
    OR?: Prisma.StatusWhereInput[];
    NOT?: Prisma.StatusWhereInput | Prisma.StatusWhereInput[];
    id?: Prisma.IntFilter<"Status"> | number;
    name?: Prisma.StringFilter<"Status"> | string;
    computers?: Prisma.ComputerListRelationFilter;
};
export type StatusOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    computers?: Prisma.ComputerOrderByRelationAggregateInput;
};
export type StatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    name?: string;
    AND?: Prisma.StatusWhereInput | Prisma.StatusWhereInput[];
    OR?: Prisma.StatusWhereInput[];
    NOT?: Prisma.StatusWhereInput | Prisma.StatusWhereInput[];
    computers?: Prisma.ComputerListRelationFilter;
}, "id" | "name">;
export type StatusOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.StatusCountOrderByAggregateInput;
    _avg?: Prisma.StatusAvgOrderByAggregateInput;
    _max?: Prisma.StatusMaxOrderByAggregateInput;
    _min?: Prisma.StatusMinOrderByAggregateInput;
    _sum?: Prisma.StatusSumOrderByAggregateInput;
};
export type StatusScalarWhereWithAggregatesInput = {
    AND?: Prisma.StatusScalarWhereWithAggregatesInput | Prisma.StatusScalarWhereWithAggregatesInput[];
    OR?: Prisma.StatusScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StatusScalarWhereWithAggregatesInput | Prisma.StatusScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Status"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Status"> | string;
};
export type StatusCreateInput = {
    name: string;
    computers?: Prisma.ComputerCreateNestedManyWithoutStatusInput;
};
export type StatusUncheckedCreateInput = {
    id?: number;
    name: string;
    computers?: Prisma.ComputerUncheckedCreateNestedManyWithoutStatusInput;
};
export type StatusUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    computers?: Prisma.ComputerUpdateManyWithoutStatusNestedInput;
};
export type StatusUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    computers?: Prisma.ComputerUncheckedUpdateManyWithoutStatusNestedInput;
};
export type StatusCreateManyInput = {
    id?: number;
    name: string;
};
export type StatusUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatusUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatusCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type StatusAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StatusMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type StatusMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type StatusSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type StatusNullableScalarRelationFilter = {
    is?: Prisma.StatusWhereInput | null;
    isNot?: Prisma.StatusWhereInput | null;
};
export type StatusCreateNestedOneWithoutComputersInput = {
    create?: Prisma.XOR<Prisma.StatusCreateWithoutComputersInput, Prisma.StatusUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.StatusCreateOrConnectWithoutComputersInput;
    connect?: Prisma.StatusWhereUniqueInput;
};
export type StatusUpdateOneWithoutComputersNestedInput = {
    create?: Prisma.XOR<Prisma.StatusCreateWithoutComputersInput, Prisma.StatusUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.StatusCreateOrConnectWithoutComputersInput;
    upsert?: Prisma.StatusUpsertWithoutComputersInput;
    disconnect?: Prisma.StatusWhereInput | boolean;
    delete?: Prisma.StatusWhereInput | boolean;
    connect?: Prisma.StatusWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StatusUpdateToOneWithWhereWithoutComputersInput, Prisma.StatusUpdateWithoutComputersInput>, Prisma.StatusUncheckedUpdateWithoutComputersInput>;
};
export type StatusCreateWithoutComputersInput = {
    name: string;
};
export type StatusUncheckedCreateWithoutComputersInput = {
    id?: number;
    name: string;
};
export type StatusCreateOrConnectWithoutComputersInput = {
    where: Prisma.StatusWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatusCreateWithoutComputersInput, Prisma.StatusUncheckedCreateWithoutComputersInput>;
};
export type StatusUpsertWithoutComputersInput = {
    update: Prisma.XOR<Prisma.StatusUpdateWithoutComputersInput, Prisma.StatusUncheckedUpdateWithoutComputersInput>;
    create: Prisma.XOR<Prisma.StatusCreateWithoutComputersInput, Prisma.StatusUncheckedCreateWithoutComputersInput>;
    where?: Prisma.StatusWhereInput;
};
export type StatusUpdateToOneWithWhereWithoutComputersInput = {
    where?: Prisma.StatusWhereInput;
    data: Prisma.XOR<Prisma.StatusUpdateWithoutComputersInput, Prisma.StatusUncheckedUpdateWithoutComputersInput>;
};
export type StatusUpdateWithoutComputersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatusUncheckedUpdateWithoutComputersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type StatusCountOutputType = {
    computers: number;
};
export type StatusCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | StatusCountOutputTypeCountComputersArgs;
};
export type StatusCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusCountOutputTypeSelect<ExtArgs> | null;
};
export type StatusCountOutputTypeCountComputersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ComputerWhereInput;
};
export type StatusSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    computers?: boolean | Prisma.Status$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.StatusCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["status"]>;
export type StatusSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["status"]>;
export type StatusSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["status"]>;
export type StatusSelectScalar = {
    id?: boolean;
    name?: boolean;
};
export type StatusOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name", ExtArgs["result"]["status"]>;
export type StatusInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | Prisma.Status$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.StatusCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StatusIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type StatusIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $StatusPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Status";
    objects: {
        computers: Prisma.$ComputerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
    }, ExtArgs["result"]["status"]>;
    composites: {};
};
export type StatusGetPayload<S extends boolean | null | undefined | StatusDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StatusPayload, S>;
export type StatusCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StatusCountAggregateInputType | true;
};
export interface StatusDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Status'];
        meta: {
            name: 'Status';
        };
    };
    findUnique<T extends StatusFindUniqueArgs>(args: Prisma.SelectSubset<T, StatusFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StatusFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StatusFindFirstArgs>(args?: Prisma.SelectSubset<T, StatusFindFirstArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StatusFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StatusFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StatusFindManyArgs>(args?: Prisma.SelectSubset<T, StatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StatusCreateArgs>(args: Prisma.SelectSubset<T, StatusCreateArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StatusCreateManyArgs>(args?: Prisma.SelectSubset<T, StatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StatusCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StatusDeleteArgs>(args: Prisma.SelectSubset<T, StatusDeleteArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StatusUpdateArgs>(args: Prisma.SelectSubset<T, StatusUpdateArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StatusDeleteManyArgs>(args?: Prisma.SelectSubset<T, StatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StatusUpdateManyArgs>(args: Prisma.SelectSubset<T, StatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StatusUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StatusUpsertArgs>(args: Prisma.SelectSubset<T, StatusUpsertArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StatusCountArgs>(args?: Prisma.Subset<T, StatusCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StatusCountAggregateOutputType> : number>;
    aggregate<T extends StatusAggregateArgs>(args: Prisma.Subset<T, StatusAggregateArgs>): Prisma.PrismaPromise<GetStatusAggregateType<T>>;
    groupBy<T extends StatusGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StatusGroupByArgs['orderBy'];
    } : {
        orderBy?: StatusGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StatusFieldRefs;
}
export interface Prisma__StatusClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computers<T extends Prisma.Status$computersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Status$computersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StatusFieldRefs {
    readonly id: Prisma.FieldRef<"Status", 'Int'>;
    readonly name: Prisma.FieldRef<"Status", 'String'>;
}
export type StatusFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where: Prisma.StatusWhereUniqueInput;
};
export type StatusFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where: Prisma.StatusWhereUniqueInput;
};
export type StatusFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput | Prisma.StatusOrderByWithRelationInput[];
    cursor?: Prisma.StatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StatusScalarFieldEnum | Prisma.StatusScalarFieldEnum[];
};
export type StatusFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput | Prisma.StatusOrderByWithRelationInput[];
    cursor?: Prisma.StatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StatusScalarFieldEnum | Prisma.StatusScalarFieldEnum[];
};
export type StatusFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where?: Prisma.StatusWhereInput;
    orderBy?: Prisma.StatusOrderByWithRelationInput | Prisma.StatusOrderByWithRelationInput[];
    cursor?: Prisma.StatusWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StatusScalarFieldEnum | Prisma.StatusScalarFieldEnum[];
};
export type StatusCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatusCreateInput, Prisma.StatusUncheckedCreateInput>;
};
export type StatusCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StatusCreateManyInput | Prisma.StatusCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StatusCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    data: Prisma.StatusCreateManyInput | Prisma.StatusCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StatusUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatusUpdateInput, Prisma.StatusUncheckedUpdateInput>;
    where: Prisma.StatusWhereUniqueInput;
};
export type StatusUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StatusUpdateManyMutationInput, Prisma.StatusUncheckedUpdateManyInput>;
    where?: Prisma.StatusWhereInput;
    limit?: number;
};
export type StatusUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StatusUpdateManyMutationInput, Prisma.StatusUncheckedUpdateManyInput>;
    where?: Prisma.StatusWhereInput;
    limit?: number;
};
export type StatusUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where: Prisma.StatusWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatusCreateInput, Prisma.StatusUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StatusUpdateInput, Prisma.StatusUncheckedUpdateInput>;
};
export type StatusDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
    where: Prisma.StatusWhereUniqueInput;
};
export type StatusDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatusWhereInput;
    limit?: number;
};
export type Status$computersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StatusDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StatusSelect<ExtArgs> | null;
    omit?: Prisma.StatusOmit<ExtArgs> | null;
    include?: Prisma.StatusInclude<ExtArgs> | null;
};
