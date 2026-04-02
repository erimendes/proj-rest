import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SoftwareModel = runtime.Types.Result.DefaultSelection<Prisma.$SoftwarePayload>;
export type AggregateSoftware = {
    _count: SoftwareCountAggregateOutputType | null;
    _avg: SoftwareAvgAggregateOutputType | null;
    _sum: SoftwareSumAggregateOutputType | null;
    _min: SoftwareMinAggregateOutputType | null;
    _max: SoftwareMaxAggregateOutputType | null;
};
export type SoftwareAvgAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
};
export type SoftwareSumAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
};
export type SoftwareMinAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    name: string | null;
    version: string | null;
    publisher: string | null;
};
export type SoftwareMaxAggregateOutputType = {
    id: number | null;
    glpiId: number | null;
    name: string | null;
    version: string | null;
    publisher: string | null;
};
export type SoftwareCountAggregateOutputType = {
    id: number;
    glpiId: number;
    name: number;
    version: number;
    publisher: number;
    _all: number;
};
export type SoftwareAvgAggregateInputType = {
    id?: true;
    glpiId?: true;
};
export type SoftwareSumAggregateInputType = {
    id?: true;
    glpiId?: true;
};
export type SoftwareMinAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    version?: true;
    publisher?: true;
};
export type SoftwareMaxAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    version?: true;
    publisher?: true;
};
export type SoftwareCountAggregateInputType = {
    id?: true;
    glpiId?: true;
    name?: true;
    version?: true;
    publisher?: true;
    _all?: true;
};
export type SoftwareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareWhereInput;
    orderBy?: Prisma.SoftwareOrderByWithRelationInput | Prisma.SoftwareOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SoftwareCountAggregateInputType;
    _avg?: SoftwareAvgAggregateInputType;
    _sum?: SoftwareSumAggregateInputType;
    _min?: SoftwareMinAggregateInputType;
    _max?: SoftwareMaxAggregateInputType;
};
export type GetSoftwareAggregateType<T extends SoftwareAggregateArgs> = {
    [P in keyof T & keyof AggregateSoftware]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSoftware[P]> : Prisma.GetScalarType<T[P], AggregateSoftware[P]>;
};
export type SoftwareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareWhereInput;
    orderBy?: Prisma.SoftwareOrderByWithAggregationInput | Prisma.SoftwareOrderByWithAggregationInput[];
    by: Prisma.SoftwareScalarFieldEnum[] | Prisma.SoftwareScalarFieldEnum;
    having?: Prisma.SoftwareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SoftwareCountAggregateInputType | true;
    _avg?: SoftwareAvgAggregateInputType;
    _sum?: SoftwareSumAggregateInputType;
    _min?: SoftwareMinAggregateInputType;
    _max?: SoftwareMaxAggregateInputType;
};
export type SoftwareGroupByOutputType = {
    id: number;
    glpiId: number;
    name: string;
    version: string | null;
    publisher: string | null;
    _count: SoftwareCountAggregateOutputType | null;
    _avg: SoftwareAvgAggregateOutputType | null;
    _sum: SoftwareSumAggregateOutputType | null;
    _min: SoftwareMinAggregateOutputType | null;
    _max: SoftwareMaxAggregateOutputType | null;
};
export type GetSoftwareGroupByPayload<T extends SoftwareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SoftwareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SoftwareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SoftwareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SoftwareGroupByOutputType[P]>;
}>>;
export type SoftwareWhereInput = {
    AND?: Prisma.SoftwareWhereInput | Prisma.SoftwareWhereInput[];
    OR?: Prisma.SoftwareWhereInput[];
    NOT?: Prisma.SoftwareWhereInput | Prisma.SoftwareWhereInput[];
    id?: Prisma.IntFilter<"Software"> | number;
    glpiId?: Prisma.IntFilter<"Software"> | number;
    name?: Prisma.StringFilter<"Software"> | string;
    version?: Prisma.StringNullableFilter<"Software"> | string | null;
    publisher?: Prisma.StringNullableFilter<"Software"> | string | null;
    computers?: Prisma.SoftwareOnComputerListRelationFilter;
};
export type SoftwareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    version?: Prisma.SortOrderInput | Prisma.SortOrder;
    publisher?: Prisma.SortOrderInput | Prisma.SortOrder;
    computers?: Prisma.SoftwareOnComputerOrderByRelationAggregateInput;
};
export type SoftwareWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    glpiId?: number;
    AND?: Prisma.SoftwareWhereInput | Prisma.SoftwareWhereInput[];
    OR?: Prisma.SoftwareWhereInput[];
    NOT?: Prisma.SoftwareWhereInput | Prisma.SoftwareWhereInput[];
    name?: Prisma.StringFilter<"Software"> | string;
    version?: Prisma.StringNullableFilter<"Software"> | string | null;
    publisher?: Prisma.StringNullableFilter<"Software"> | string | null;
    computers?: Prisma.SoftwareOnComputerListRelationFilter;
}, "id" | "glpiId">;
export type SoftwareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    version?: Prisma.SortOrderInput | Prisma.SortOrder;
    publisher?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.SoftwareCountOrderByAggregateInput;
    _avg?: Prisma.SoftwareAvgOrderByAggregateInput;
    _max?: Prisma.SoftwareMaxOrderByAggregateInput;
    _min?: Prisma.SoftwareMinOrderByAggregateInput;
    _sum?: Prisma.SoftwareSumOrderByAggregateInput;
};
export type SoftwareScalarWhereWithAggregatesInput = {
    AND?: Prisma.SoftwareScalarWhereWithAggregatesInput | Prisma.SoftwareScalarWhereWithAggregatesInput[];
    OR?: Prisma.SoftwareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SoftwareScalarWhereWithAggregatesInput | Prisma.SoftwareScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Software"> | number;
    glpiId?: Prisma.IntWithAggregatesFilter<"Software"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Software"> | string;
    version?: Prisma.StringNullableWithAggregatesFilter<"Software"> | string | null;
    publisher?: Prisma.StringNullableWithAggregatesFilter<"Software"> | string | null;
};
export type SoftwareCreateInput = {
    glpiId: number;
    name: string;
    version?: string | null;
    publisher?: string | null;
    computers?: Prisma.SoftwareOnComputerCreateNestedManyWithoutSoftwareInput;
};
export type SoftwareUncheckedCreateInput = {
    id?: number;
    glpiId: number;
    name: string;
    version?: string | null;
    publisher?: string | null;
    computers?: Prisma.SoftwareOnComputerUncheckedCreateNestedManyWithoutSoftwareInput;
};
export type SoftwareUpdateInput = {
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computers?: Prisma.SoftwareOnComputerUpdateManyWithoutSoftwareNestedInput;
};
export type SoftwareUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    computers?: Prisma.SoftwareOnComputerUncheckedUpdateManyWithoutSoftwareNestedInput;
};
export type SoftwareCreateManyInput = {
    id?: number;
    glpiId: number;
    name: string;
    version?: string | null;
    publisher?: string | null;
};
export type SoftwareUpdateManyMutationInput = {
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SoftwareUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SoftwareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    publisher?: Prisma.SortOrder;
};
export type SoftwareAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
};
export type SoftwareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    publisher?: Prisma.SortOrder;
};
export type SoftwareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    publisher?: Prisma.SortOrder;
};
export type SoftwareSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    glpiId?: Prisma.SortOrder;
};
export type SoftwareScalarRelationFilter = {
    is?: Prisma.SoftwareWhereInput;
    isNot?: Prisma.SoftwareWhereInput;
};
export type SoftwareCreateNestedOneWithoutComputersInput = {
    create?: Prisma.XOR<Prisma.SoftwareCreateWithoutComputersInput, Prisma.SoftwareUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.SoftwareCreateOrConnectWithoutComputersInput;
    connect?: Prisma.SoftwareWhereUniqueInput;
};
export type SoftwareUpdateOneRequiredWithoutComputersNestedInput = {
    create?: Prisma.XOR<Prisma.SoftwareCreateWithoutComputersInput, Prisma.SoftwareUncheckedCreateWithoutComputersInput>;
    connectOrCreate?: Prisma.SoftwareCreateOrConnectWithoutComputersInput;
    upsert?: Prisma.SoftwareUpsertWithoutComputersInput;
    connect?: Prisma.SoftwareWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SoftwareUpdateToOneWithWhereWithoutComputersInput, Prisma.SoftwareUpdateWithoutComputersInput>, Prisma.SoftwareUncheckedUpdateWithoutComputersInput>;
};
export type SoftwareCreateWithoutComputersInput = {
    glpiId: number;
    name: string;
    version?: string | null;
    publisher?: string | null;
};
export type SoftwareUncheckedCreateWithoutComputersInput = {
    id?: number;
    glpiId: number;
    name: string;
    version?: string | null;
    publisher?: string | null;
};
export type SoftwareCreateOrConnectWithoutComputersInput = {
    where: Prisma.SoftwareWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareCreateWithoutComputersInput, Prisma.SoftwareUncheckedCreateWithoutComputersInput>;
};
export type SoftwareUpsertWithoutComputersInput = {
    update: Prisma.XOR<Prisma.SoftwareUpdateWithoutComputersInput, Prisma.SoftwareUncheckedUpdateWithoutComputersInput>;
    create: Prisma.XOR<Prisma.SoftwareCreateWithoutComputersInput, Prisma.SoftwareUncheckedCreateWithoutComputersInput>;
    where?: Prisma.SoftwareWhereInput;
};
export type SoftwareUpdateToOneWithWhereWithoutComputersInput = {
    where?: Prisma.SoftwareWhereInput;
    data: Prisma.XOR<Prisma.SoftwareUpdateWithoutComputersInput, Prisma.SoftwareUncheckedUpdateWithoutComputersInput>;
};
export type SoftwareUpdateWithoutComputersInput = {
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SoftwareUncheckedUpdateWithoutComputersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    glpiId?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publisher?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type SoftwareCountOutputType = {
    computers: number;
};
export type SoftwareCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | SoftwareCountOutputTypeCountComputersArgs;
};
export type SoftwareCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareCountOutputTypeSelect<ExtArgs> | null;
};
export type SoftwareCountOutputTypeCountComputersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareOnComputerWhereInput;
};
export type SoftwareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    version?: boolean;
    publisher?: boolean;
    computers?: boolean | Prisma.Software$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.SoftwareCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["software"]>;
export type SoftwareSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    version?: boolean;
    publisher?: boolean;
}, ExtArgs["result"]["software"]>;
export type SoftwareSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    version?: boolean;
    publisher?: boolean;
}, ExtArgs["result"]["software"]>;
export type SoftwareSelectScalar = {
    id?: boolean;
    glpiId?: boolean;
    name?: boolean;
    version?: boolean;
    publisher?: boolean;
};
export type SoftwareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "glpiId" | "name" | "version" | "publisher", ExtArgs["result"]["software"]>;
export type SoftwareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computers?: boolean | Prisma.Software$computersArgs<ExtArgs>;
    _count?: boolean | Prisma.SoftwareCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SoftwareIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type SoftwareIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $SoftwarePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Software";
    objects: {
        computers: Prisma.$SoftwareOnComputerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        glpiId: number;
        name: string;
        version: string | null;
        publisher: string | null;
    }, ExtArgs["result"]["software"]>;
    composites: {};
};
export type SoftwareGetPayload<S extends boolean | null | undefined | SoftwareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SoftwarePayload, S>;
export type SoftwareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SoftwareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SoftwareCountAggregateInputType | true;
};
export interface SoftwareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Software'];
        meta: {
            name: 'Software';
        };
    };
    findUnique<T extends SoftwareFindUniqueArgs>(args: Prisma.SelectSubset<T, SoftwareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SoftwareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SoftwareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SoftwareFindFirstArgs>(args?: Prisma.SelectSubset<T, SoftwareFindFirstArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SoftwareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SoftwareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SoftwareFindManyArgs>(args?: Prisma.SelectSubset<T, SoftwareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SoftwareCreateArgs>(args: Prisma.SelectSubset<T, SoftwareCreateArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SoftwareCreateManyArgs>(args?: Prisma.SelectSubset<T, SoftwareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SoftwareCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SoftwareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SoftwareDeleteArgs>(args: Prisma.SelectSubset<T, SoftwareDeleteArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SoftwareUpdateArgs>(args: Prisma.SelectSubset<T, SoftwareUpdateArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SoftwareDeleteManyArgs>(args?: Prisma.SelectSubset<T, SoftwareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SoftwareUpdateManyArgs>(args: Prisma.SelectSubset<T, SoftwareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SoftwareUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SoftwareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SoftwareUpsertArgs>(args: Prisma.SelectSubset<T, SoftwareUpsertArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SoftwareCountArgs>(args?: Prisma.Subset<T, SoftwareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SoftwareCountAggregateOutputType> : number>;
    aggregate<T extends SoftwareAggregateArgs>(args: Prisma.Subset<T, SoftwareAggregateArgs>): Prisma.PrismaPromise<GetSoftwareAggregateType<T>>;
    groupBy<T extends SoftwareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SoftwareGroupByArgs['orderBy'];
    } : {
        orderBy?: SoftwareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SoftwareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSoftwareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SoftwareFieldRefs;
}
export interface Prisma__SoftwareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computers<T extends Prisma.Software$computersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Software$computersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SoftwareOnComputerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SoftwareFieldRefs {
    readonly id: Prisma.FieldRef<"Software", 'Int'>;
    readonly glpiId: Prisma.FieldRef<"Software", 'Int'>;
    readonly name: Prisma.FieldRef<"Software", 'String'>;
    readonly version: Prisma.FieldRef<"Software", 'String'>;
    readonly publisher: Prisma.FieldRef<"Software", 'String'>;
}
export type SoftwareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where: Prisma.SoftwareWhereUniqueInput;
};
export type SoftwareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where: Prisma.SoftwareWhereUniqueInput;
};
export type SoftwareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where?: Prisma.SoftwareWhereInput;
    orderBy?: Prisma.SoftwareOrderByWithRelationInput | Prisma.SoftwareOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareScalarFieldEnum | Prisma.SoftwareScalarFieldEnum[];
};
export type SoftwareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where?: Prisma.SoftwareWhereInput;
    orderBy?: Prisma.SoftwareOrderByWithRelationInput | Prisma.SoftwareOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareScalarFieldEnum | Prisma.SoftwareScalarFieldEnum[];
};
export type SoftwareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where?: Prisma.SoftwareWhereInput;
    orderBy?: Prisma.SoftwareOrderByWithRelationInput | Prisma.SoftwareOrderByWithRelationInput[];
    cursor?: Prisma.SoftwareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SoftwareScalarFieldEnum | Prisma.SoftwareScalarFieldEnum[];
};
export type SoftwareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareCreateInput, Prisma.SoftwareUncheckedCreateInput>;
};
export type SoftwareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SoftwareCreateManyInput | Prisma.SoftwareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SoftwareCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    data: Prisma.SoftwareCreateManyInput | Prisma.SoftwareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SoftwareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareUpdateInput, Prisma.SoftwareUncheckedUpdateInput>;
    where: Prisma.SoftwareWhereUniqueInput;
};
export type SoftwareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SoftwareUpdateManyMutationInput, Prisma.SoftwareUncheckedUpdateManyInput>;
    where?: Prisma.SoftwareWhereInput;
    limit?: number;
};
export type SoftwareUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SoftwareUpdateManyMutationInput, Prisma.SoftwareUncheckedUpdateManyInput>;
    where?: Prisma.SoftwareWhereInput;
    limit?: number;
};
export type SoftwareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where: Prisma.SoftwareWhereUniqueInput;
    create: Prisma.XOR<Prisma.SoftwareCreateInput, Prisma.SoftwareUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SoftwareUpdateInput, Prisma.SoftwareUncheckedUpdateInput>;
};
export type SoftwareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
    where: Prisma.SoftwareWhereUniqueInput;
};
export type SoftwareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SoftwareWhereInput;
    limit?: number;
};
export type Software$computersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SoftwareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SoftwareSelect<ExtArgs> | null;
    omit?: Prisma.SoftwareOmit<ExtArgs> | null;
    include?: Prisma.SoftwareInclude<ExtArgs> | null;
};
