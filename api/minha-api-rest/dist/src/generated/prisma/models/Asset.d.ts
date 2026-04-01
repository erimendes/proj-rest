import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AssetModel = runtime.Types.Result.DefaultSelection<Prisma.$AssetPayload>;
export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null;
    _avg: AssetAvgAggregateOutputType | null;
    _sum: AssetSumAggregateOutputType | null;
    _min: AssetMinAggregateOutputType | null;
    _max: AssetMaxAggregateOutputType | null;
};
export type AssetAvgAggregateOutputType = {
    id: number | null;
    statusId: number | null;
    modelId: number | null;
    locationId: number | null;
};
export type AssetSumAggregateOutputType = {
    id: number | null;
    statusId: number | null;
    modelId: number | null;
    locationId: number | null;
};
export type AssetMinAggregateOutputType = {
    id: number | null;
    hostname: string | null;
    serialNumber: string | null;
    assetTag: string | null;
    purchaseDate: Date | null;
    warrantyExpiry: Date | null;
    statusId: number | null;
    modelId: number | null;
    locationId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssetMaxAggregateOutputType = {
    id: number | null;
    hostname: string | null;
    serialNumber: string | null;
    assetTag: string | null;
    purchaseDate: Date | null;
    warrantyExpiry: Date | null;
    statusId: number | null;
    modelId: number | null;
    locationId: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AssetCountAggregateOutputType = {
    id: number;
    hostname: number;
    serialNumber: number;
    assetTag: number;
    purchaseDate: number;
    warrantyExpiry: number;
    statusId: number;
    modelId: number;
    locationId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AssetAvgAggregateInputType = {
    id?: true;
    statusId?: true;
    modelId?: true;
    locationId?: true;
};
export type AssetSumAggregateInputType = {
    id?: true;
    statusId?: true;
    modelId?: true;
    locationId?: true;
};
export type AssetMinAggregateInputType = {
    id?: true;
    hostname?: true;
    serialNumber?: true;
    assetTag?: true;
    purchaseDate?: true;
    warrantyExpiry?: true;
    statusId?: true;
    modelId?: true;
    locationId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssetMaxAggregateInputType = {
    id?: true;
    hostname?: true;
    serialNumber?: true;
    assetTag?: true;
    purchaseDate?: true;
    warrantyExpiry?: true;
    statusId?: true;
    modelId?: true;
    locationId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AssetCountAggregateInputType = {
    id?: true;
    hostname?: true;
    serialNumber?: true;
    assetTag?: true;
    purchaseDate?: true;
    warrantyExpiry?: true;
    statusId?: true;
    modelId?: true;
    locationId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithRelationInput | Prisma.AssetOrderByWithRelationInput[];
    cursor?: Prisma.AssetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AssetCountAggregateInputType;
    _avg?: AssetAvgAggregateInputType;
    _sum?: AssetSumAggregateInputType;
    _min?: AssetMinAggregateInputType;
    _max?: AssetMaxAggregateInputType;
};
export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
    [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAsset[P]> : Prisma.GetScalarType<T[P], AggregateAsset[P]>;
};
export type AssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
    orderBy?: Prisma.AssetOrderByWithAggregationInput | Prisma.AssetOrderByWithAggregationInput[];
    by: Prisma.AssetScalarFieldEnum[] | Prisma.AssetScalarFieldEnum;
    having?: Prisma.AssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssetCountAggregateInputType | true;
    _avg?: AssetAvgAggregateInputType;
    _sum?: AssetSumAggregateInputType;
    _min?: AssetMinAggregateInputType;
    _max?: AssetMaxAggregateInputType;
};
export type AssetGroupByOutputType = {
    id: number;
    hostname: string | null;
    serialNumber: string;
    assetTag: string | null;
    purchaseDate: Date | null;
    warrantyExpiry: Date | null;
    statusId: number;
    modelId: number;
    locationId: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AssetCountAggregateOutputType | null;
    _avg: AssetAvgAggregateOutputType | null;
    _sum: AssetSumAggregateOutputType | null;
    _min: AssetMinAggregateOutputType | null;
    _max: AssetMaxAggregateOutputType | null;
};
export type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssetGroupByOutputType[P]>;
}>>;
export type AssetWhereInput = {
    AND?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    OR?: Prisma.AssetWhereInput[];
    NOT?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    id?: Prisma.IntFilter<"Asset"> | number;
    hostname?: Prisma.StringNullableFilter<"Asset"> | string | null;
    serialNumber?: Prisma.StringFilter<"Asset"> | string;
    assetTag?: Prisma.StringNullableFilter<"Asset"> | string | null;
    purchaseDate?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    warrantyExpiry?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    statusId?: Prisma.IntFilter<"Asset"> | number;
    modelId?: Prisma.IntFilter<"Asset"> | number;
    locationId?: Prisma.IntNullableFilter<"Asset"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    status?: Prisma.XOR<Prisma.StatusScalarRelationFilter, Prisma.StatusWhereInput>;
    model?: Prisma.XOR<Prisma.ModelScalarRelationFilter, Prisma.ModelWhereInput>;
    location?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    assignments?: Prisma.AssignmentListRelationFilter;
};
export type AssetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hostname?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    assetTag?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    warrantyExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    status?: Prisma.StatusOrderByWithRelationInput;
    model?: Prisma.ModelOrderByWithRelationInput;
    location?: Prisma.LocationOrderByWithRelationInput;
    assignments?: Prisma.AssignmentOrderByRelationAggregateInput;
};
export type AssetWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    hostname?: string;
    serialNumber?: string;
    assetTag?: string;
    AND?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    OR?: Prisma.AssetWhereInput[];
    NOT?: Prisma.AssetWhereInput | Prisma.AssetWhereInput[];
    purchaseDate?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    warrantyExpiry?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    statusId?: Prisma.IntFilter<"Asset"> | number;
    modelId?: Prisma.IntFilter<"Asset"> | number;
    locationId?: Prisma.IntNullableFilter<"Asset"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    status?: Prisma.XOR<Prisma.StatusScalarRelationFilter, Prisma.StatusWhereInput>;
    model?: Prisma.XOR<Prisma.ModelScalarRelationFilter, Prisma.ModelWhereInput>;
    location?: Prisma.XOR<Prisma.LocationNullableScalarRelationFilter, Prisma.LocationWhereInput> | null;
    assignments?: Prisma.AssignmentListRelationFilter;
}, "id" | "hostname" | "serialNumber" | "assetTag">;
export type AssetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hostname?: Prisma.SortOrderInput | Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    assetTag?: Prisma.SortOrderInput | Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    warrantyExpiry?: Prisma.SortOrderInput | Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AssetCountOrderByAggregateInput;
    _avg?: Prisma.AssetAvgOrderByAggregateInput;
    _max?: Prisma.AssetMaxOrderByAggregateInput;
    _min?: Prisma.AssetMinOrderByAggregateInput;
    _sum?: Prisma.AssetSumOrderByAggregateInput;
};
export type AssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssetScalarWhereWithAggregatesInput | Prisma.AssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssetScalarWhereWithAggregatesInput | Prisma.AssetScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Asset"> | number;
    hostname?: Prisma.StringNullableWithAggregatesFilter<"Asset"> | string | null;
    serialNumber?: Prisma.StringWithAggregatesFilter<"Asset"> | string;
    assetTag?: Prisma.StringNullableWithAggregatesFilter<"Asset"> | string | null;
    purchaseDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Asset"> | Date | string | null;
    warrantyExpiry?: Prisma.DateTimeNullableWithAggregatesFilter<"Asset"> | Date | string | null;
    statusId?: Prisma.IntWithAggregatesFilter<"Asset"> | number;
    modelId?: Prisma.IntWithAggregatesFilter<"Asset"> | number;
    locationId?: Prisma.IntNullableWithAggregatesFilter<"Asset"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Asset"> | Date | string;
};
export type AssetCreateInput = {
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status: Prisma.StatusCreateNestedOneWithoutAssetsInput;
    model: Prisma.ModelCreateNestedOneWithoutAssetsInput;
    location?: Prisma.LocationCreateNestedOneWithoutAssetsInput;
    assignments?: Prisma.AssignmentCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    modelId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.AssignmentUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetUpdateInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StatusUpdateOneRequiredWithoutAssetsNestedInput;
    model?: Prisma.ModelUpdateOneRequiredWithoutAssetsNestedInput;
    location?: Prisma.LocationUpdateOneWithoutAssetsNestedInput;
    assignments?: Prisma.AssignmentUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.AssignmentUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetCreateManyInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    modelId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateManyMutationInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostname?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    assetTag?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    warrantyExpiry?: Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type AssetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostname?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    assetTag?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    warrantyExpiry?: Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostname?: Prisma.SortOrder;
    serialNumber?: Prisma.SortOrder;
    assetTag?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    warrantyExpiry?: Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AssetSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    statusId?: Prisma.SortOrder;
    modelId?: Prisma.SortOrder;
    locationId?: Prisma.SortOrder;
};
export type AssetScalarRelationFilter = {
    is?: Prisma.AssetWhereInput;
    isNot?: Prisma.AssetWhereInput;
};
export type AssetListRelationFilter = {
    every?: Prisma.AssetWhereInput;
    some?: Prisma.AssetWhereInput;
    none?: Prisma.AssetWhereInput;
};
export type AssetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AssetCreateNestedOneWithoutAssignmentsInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutAssignmentsInput, Prisma.AssetUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutAssignmentsInput;
    connect?: Prisma.AssetWhereUniqueInput;
};
export type AssetUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutAssignmentsInput, Prisma.AssetUncheckedCreateWithoutAssignmentsInput>;
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutAssignmentsInput;
    upsert?: Prisma.AssetUpsertWithoutAssignmentsInput;
    connect?: Prisma.AssetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssetUpdateToOneWithWhereWithoutAssignmentsInput, Prisma.AssetUpdateWithoutAssignmentsInput>, Prisma.AssetUncheckedUpdateWithoutAssignmentsInput>;
};
export type AssetCreateNestedManyWithoutModelInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput> | Prisma.AssetCreateWithoutModelInput[] | Prisma.AssetUncheckedCreateWithoutModelInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutModelInput | Prisma.AssetCreateOrConnectWithoutModelInput[];
    createMany?: Prisma.AssetCreateManyModelInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUncheckedCreateNestedManyWithoutModelInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput> | Prisma.AssetCreateWithoutModelInput[] | Prisma.AssetUncheckedCreateWithoutModelInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutModelInput | Prisma.AssetCreateOrConnectWithoutModelInput[];
    createMany?: Prisma.AssetCreateManyModelInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUpdateManyWithoutModelNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput> | Prisma.AssetCreateWithoutModelInput[] | Prisma.AssetUncheckedCreateWithoutModelInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutModelInput | Prisma.AssetCreateOrConnectWithoutModelInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutModelInput | Prisma.AssetUpsertWithWhereUniqueWithoutModelInput[];
    createMany?: Prisma.AssetCreateManyModelInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutModelInput | Prisma.AssetUpdateWithWhereUniqueWithoutModelInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutModelInput | Prisma.AssetUpdateManyWithWhereWithoutModelInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetUncheckedUpdateManyWithoutModelNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput> | Prisma.AssetCreateWithoutModelInput[] | Prisma.AssetUncheckedCreateWithoutModelInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutModelInput | Prisma.AssetCreateOrConnectWithoutModelInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutModelInput | Prisma.AssetUpsertWithWhereUniqueWithoutModelInput[];
    createMany?: Prisma.AssetCreateManyModelInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutModelInput | Prisma.AssetUpdateWithWhereUniqueWithoutModelInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutModelInput | Prisma.AssetUpdateManyWithWhereWithoutModelInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetCreateNestedManyWithoutStatusInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput> | Prisma.AssetCreateWithoutStatusInput[] | Prisma.AssetUncheckedCreateWithoutStatusInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutStatusInput | Prisma.AssetCreateOrConnectWithoutStatusInput[];
    createMany?: Prisma.AssetCreateManyStatusInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUncheckedCreateNestedManyWithoutStatusInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput> | Prisma.AssetCreateWithoutStatusInput[] | Prisma.AssetUncheckedCreateWithoutStatusInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutStatusInput | Prisma.AssetCreateOrConnectWithoutStatusInput[];
    createMany?: Prisma.AssetCreateManyStatusInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUpdateManyWithoutStatusNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput> | Prisma.AssetCreateWithoutStatusInput[] | Prisma.AssetUncheckedCreateWithoutStatusInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutStatusInput | Prisma.AssetCreateOrConnectWithoutStatusInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutStatusInput | Prisma.AssetUpsertWithWhereUniqueWithoutStatusInput[];
    createMany?: Prisma.AssetCreateManyStatusInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutStatusInput | Prisma.AssetUpdateWithWhereUniqueWithoutStatusInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutStatusInput | Prisma.AssetUpdateManyWithWhereWithoutStatusInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetUncheckedUpdateManyWithoutStatusNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput> | Prisma.AssetCreateWithoutStatusInput[] | Prisma.AssetUncheckedCreateWithoutStatusInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutStatusInput | Prisma.AssetCreateOrConnectWithoutStatusInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutStatusInput | Prisma.AssetUpsertWithWhereUniqueWithoutStatusInput[];
    createMany?: Prisma.AssetCreateManyStatusInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutStatusInput | Prisma.AssetUpdateWithWhereUniqueWithoutStatusInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutStatusInput | Prisma.AssetUpdateManyWithWhereWithoutStatusInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput> | Prisma.AssetCreateWithoutLocationInput[] | Prisma.AssetUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutLocationInput | Prisma.AssetCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.AssetCreateManyLocationInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUncheckedCreateNestedManyWithoutLocationInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput> | Prisma.AssetCreateWithoutLocationInput[] | Prisma.AssetUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutLocationInput | Prisma.AssetCreateOrConnectWithoutLocationInput[];
    createMany?: Prisma.AssetCreateManyLocationInputEnvelope;
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
};
export type AssetUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput> | Prisma.AssetCreateWithoutLocationInput[] | Prisma.AssetUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutLocationInput | Prisma.AssetCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutLocationInput | Prisma.AssetUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.AssetCreateManyLocationInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutLocationInput | Prisma.AssetUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutLocationInput | Prisma.AssetUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput> | Prisma.AssetCreateWithoutLocationInput[] | Prisma.AssetUncheckedCreateWithoutLocationInput[];
    connectOrCreate?: Prisma.AssetCreateOrConnectWithoutLocationInput | Prisma.AssetCreateOrConnectWithoutLocationInput[];
    upsert?: Prisma.AssetUpsertWithWhereUniqueWithoutLocationInput | Prisma.AssetUpsertWithWhereUniqueWithoutLocationInput[];
    createMany?: Prisma.AssetCreateManyLocationInputEnvelope;
    set?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    disconnect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    delete?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    connect?: Prisma.AssetWhereUniqueInput | Prisma.AssetWhereUniqueInput[];
    update?: Prisma.AssetUpdateWithWhereUniqueWithoutLocationInput | Prisma.AssetUpdateWithWhereUniqueWithoutLocationInput[];
    updateMany?: Prisma.AssetUpdateManyWithWhereWithoutLocationInput | Prisma.AssetUpdateManyWithWhereWithoutLocationInput[];
    deleteMany?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
};
export type AssetCreateWithoutAssignmentsInput = {
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status: Prisma.StatusCreateNestedOneWithoutAssetsInput;
    model: Prisma.ModelCreateNestedOneWithoutAssetsInput;
    location?: Prisma.LocationCreateNestedOneWithoutAssetsInput;
};
export type AssetUncheckedCreateWithoutAssignmentsInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    modelId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetCreateOrConnectWithoutAssignmentsInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutAssignmentsInput, Prisma.AssetUncheckedCreateWithoutAssignmentsInput>;
};
export type AssetUpsertWithoutAssignmentsInput = {
    update: Prisma.XOR<Prisma.AssetUpdateWithoutAssignmentsInput, Prisma.AssetUncheckedUpdateWithoutAssignmentsInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutAssignmentsInput, Prisma.AssetUncheckedCreateWithoutAssignmentsInput>;
    where?: Prisma.AssetWhereInput;
};
export type AssetUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: Prisma.AssetWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutAssignmentsInput, Prisma.AssetUncheckedUpdateWithoutAssignmentsInput>;
};
export type AssetUpdateWithoutAssignmentsInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StatusUpdateOneRequiredWithoutAssetsNestedInput;
    model?: Prisma.ModelUpdateOneRequiredWithoutAssetsNestedInput;
    location?: Prisma.LocationUpdateOneWithoutAssetsNestedInput;
};
export type AssetUncheckedUpdateWithoutAssignmentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCreateWithoutModelInput = {
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status: Prisma.StatusCreateNestedOneWithoutAssetsInput;
    location?: Prisma.LocationCreateNestedOneWithoutAssetsInput;
    assignments?: Prisma.AssignmentCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutModelInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.AssignmentUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutModelInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput>;
};
export type AssetCreateManyModelInputEnvelope = {
    data: Prisma.AssetCreateManyModelInput | Prisma.AssetCreateManyModelInput[];
    skipDuplicates?: boolean;
};
export type AssetUpsertWithWhereUniqueWithoutModelInput = {
    where: Prisma.AssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssetUpdateWithoutModelInput, Prisma.AssetUncheckedUpdateWithoutModelInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutModelInput, Prisma.AssetUncheckedCreateWithoutModelInput>;
};
export type AssetUpdateWithWhereUniqueWithoutModelInput = {
    where: Prisma.AssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutModelInput, Prisma.AssetUncheckedUpdateWithoutModelInput>;
};
export type AssetUpdateManyWithWhereWithoutModelInput = {
    where: Prisma.AssetScalarWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyWithoutModelInput>;
};
export type AssetScalarWhereInput = {
    AND?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
    OR?: Prisma.AssetScalarWhereInput[];
    NOT?: Prisma.AssetScalarWhereInput | Prisma.AssetScalarWhereInput[];
    id?: Prisma.IntFilter<"Asset"> | number;
    hostname?: Prisma.StringNullableFilter<"Asset"> | string | null;
    serialNumber?: Prisma.StringFilter<"Asset"> | string;
    assetTag?: Prisma.StringNullableFilter<"Asset"> | string | null;
    purchaseDate?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    warrantyExpiry?: Prisma.DateTimeNullableFilter<"Asset"> | Date | string | null;
    statusId?: Prisma.IntFilter<"Asset"> | number;
    modelId?: Prisma.IntFilter<"Asset"> | number;
    locationId?: Prisma.IntNullableFilter<"Asset"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Asset"> | Date | string;
};
export type AssetCreateWithoutStatusInput = {
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    model: Prisma.ModelCreateNestedOneWithoutAssetsInput;
    location?: Prisma.LocationCreateNestedOneWithoutAssetsInput;
    assignments?: Prisma.AssignmentCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutStatusInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    modelId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.AssignmentUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutStatusInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput>;
};
export type AssetCreateManyStatusInputEnvelope = {
    data: Prisma.AssetCreateManyStatusInput | Prisma.AssetCreateManyStatusInput[];
    skipDuplicates?: boolean;
};
export type AssetUpsertWithWhereUniqueWithoutStatusInput = {
    where: Prisma.AssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssetUpdateWithoutStatusInput, Prisma.AssetUncheckedUpdateWithoutStatusInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutStatusInput, Prisma.AssetUncheckedCreateWithoutStatusInput>;
};
export type AssetUpdateWithWhereUniqueWithoutStatusInput = {
    where: Prisma.AssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutStatusInput, Prisma.AssetUncheckedUpdateWithoutStatusInput>;
};
export type AssetUpdateManyWithWhereWithoutStatusInput = {
    where: Prisma.AssetScalarWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyWithoutStatusInput>;
};
export type AssetCreateWithoutLocationInput = {
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    status: Prisma.StatusCreateNestedOneWithoutAssetsInput;
    model: Prisma.ModelCreateNestedOneWithoutAssetsInput;
    assignments?: Prisma.AssignmentCreateNestedManyWithoutAssetInput;
};
export type AssetUncheckedCreateWithoutLocationInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    modelId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignments?: Prisma.AssignmentUncheckedCreateNestedManyWithoutAssetInput;
};
export type AssetCreateOrConnectWithoutLocationInput = {
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput>;
};
export type AssetCreateManyLocationInputEnvelope = {
    data: Prisma.AssetCreateManyLocationInput | Prisma.AssetCreateManyLocationInput[];
    skipDuplicates?: boolean;
};
export type AssetUpsertWithWhereUniqueWithoutLocationInput = {
    where: Prisma.AssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssetUpdateWithoutLocationInput, Prisma.AssetUncheckedUpdateWithoutLocationInput>;
    create: Prisma.XOR<Prisma.AssetCreateWithoutLocationInput, Prisma.AssetUncheckedCreateWithoutLocationInput>;
};
export type AssetUpdateWithWhereUniqueWithoutLocationInput = {
    where: Prisma.AssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssetUpdateWithoutLocationInput, Prisma.AssetUncheckedUpdateWithoutLocationInput>;
};
export type AssetUpdateManyWithWhereWithoutLocationInput = {
    where: Prisma.AssetScalarWhereInput;
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyWithoutLocationInput>;
};
export type AssetCreateManyModelInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateWithoutModelInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StatusUpdateOneRequiredWithoutAssetsNestedInput;
    location?: Prisma.LocationUpdateOneWithoutAssetsNestedInput;
    assignments?: Prisma.AssignmentUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutModelInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.AssignmentUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateManyWithoutModelInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCreateManyStatusInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    modelId: number;
    locationId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateWithoutStatusInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    model?: Prisma.ModelUpdateOneRequiredWithoutAssetsNestedInput;
    location?: Prisma.LocationUpdateOneWithoutAssetsNestedInput;
    assignments?: Prisma.AssignmentUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutStatusInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.AssignmentUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateManyWithoutStatusInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    locationId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCreateManyLocationInput = {
    id?: number;
    hostname?: string | null;
    serialNumber: string;
    assetTag?: string | null;
    purchaseDate?: Date | string | null;
    warrantyExpiry?: Date | string | null;
    statusId: number;
    modelId: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AssetUpdateWithoutLocationInput = {
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StatusUpdateOneRequiredWithoutAssetsNestedInput;
    model?: Prisma.ModelUpdateOneRequiredWithoutAssetsNestedInput;
    assignments?: Prisma.AssignmentUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateWithoutLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignments?: Prisma.AssignmentUncheckedUpdateManyWithoutAssetNestedInput;
};
export type AssetUncheckedUpdateManyWithoutLocationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    serialNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    assetTag?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    purchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warrantyExpiry?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    statusId?: Prisma.IntFieldUpdateOperationsInput | number;
    modelId?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AssetCountOutputType = {
    assignments: number;
};
export type AssetCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assignments?: boolean | AssetCountOutputTypeCountAssignmentsArgs;
};
export type AssetCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetCountOutputTypeSelect<ExtArgs> | null;
};
export type AssetCountOutputTypeCountAssignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssignmentWhereInput;
};
export type AssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostname?: boolean;
    serialNumber?: boolean;
    assetTag?: boolean;
    purchaseDate?: boolean;
    warrantyExpiry?: boolean;
    statusId?: boolean;
    modelId?: boolean;
    locationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
    assignments?: boolean | Prisma.Asset$assignmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.AssetCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostname?: boolean;
    serialNumber?: boolean;
    assetTag?: boolean;
    purchaseDate?: boolean;
    warrantyExpiry?: boolean;
    statusId?: boolean;
    modelId?: boolean;
    locationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostname?: boolean;
    serialNumber?: boolean;
    assetTag?: boolean;
    purchaseDate?: boolean;
    warrantyExpiry?: boolean;
    statusId?: boolean;
    modelId?: boolean;
    locationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
}, ExtArgs["result"]["asset"]>;
export type AssetSelectScalar = {
    id?: boolean;
    hostname?: boolean;
    serialNumber?: boolean;
    assetTag?: boolean;
    purchaseDate?: boolean;
    warrantyExpiry?: boolean;
    statusId?: boolean;
    modelId?: boolean;
    locationId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hostname" | "serialNumber" | "assetTag" | "purchaseDate" | "warrantyExpiry" | "statusId" | "modelId" | "locationId" | "createdAt" | "updatedAt", ExtArgs["result"]["asset"]>;
export type AssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
    assignments?: boolean | Prisma.Asset$assignmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.AssetCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
};
export type AssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    status?: boolean | Prisma.StatusDefaultArgs<ExtArgs>;
    model?: boolean | Prisma.ModelDefaultArgs<ExtArgs>;
    location?: boolean | Prisma.Asset$locationArgs<ExtArgs>;
};
export type $AssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Asset";
    objects: {
        status: Prisma.$StatusPayload<ExtArgs>;
        model: Prisma.$ModelPayload<ExtArgs>;
        location: Prisma.$LocationPayload<ExtArgs> | null;
        assignments: Prisma.$AssignmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        hostname: string | null;
        serialNumber: string;
        assetTag: string | null;
        purchaseDate: Date | null;
        warrantyExpiry: Date | null;
        statusId: number;
        modelId: number;
        locationId: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["asset"]>;
    composites: {};
};
export type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssetPayload, S>;
export type AssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssetCountAggregateInputType | true;
};
export interface AssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Asset'];
        meta: {
            name: 'Asset';
        };
    };
    findUnique<T extends AssetFindUniqueArgs>(args: Prisma.SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AssetFindFirstArgs>(args?: Prisma.SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AssetFindManyArgs>(args?: Prisma.SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AssetCreateArgs>(args: Prisma.SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AssetCreateManyArgs>(args?: Prisma.SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AssetDeleteArgs>(args: Prisma.SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AssetUpdateArgs>(args: Prisma.SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AssetUpdateManyArgs>(args: Prisma.SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AssetUpsertArgs>(args: Prisma.SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AssetCountArgs>(args?: Prisma.Subset<T, AssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssetCountAggregateOutputType> : number>;
    aggregate<T extends AssetAggregateArgs>(args: Prisma.Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>;
    groupBy<T extends AssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssetGroupByArgs['orderBy'];
    } : {
        orderBy?: AssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AssetFieldRefs;
}
export interface Prisma__AssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    status<T extends Prisma.StatusDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StatusDefaultArgs<ExtArgs>>): Prisma.Prisma__StatusClient<runtime.Types.Result.GetResult<Prisma.$StatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    model<T extends Prisma.ModelDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ModelDefaultArgs<ExtArgs>>): Prisma.Prisma__ModelClient<runtime.Types.Result.GetResult<Prisma.$ModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    location<T extends Prisma.Asset$locationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$locationArgs<ExtArgs>>): Prisma.Prisma__LocationClient<runtime.Types.Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    assignments<T extends Prisma.Asset$assignmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Asset$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AssetFieldRefs {
    readonly id: Prisma.FieldRef<"Asset", 'Int'>;
    readonly hostname: Prisma.FieldRef<"Asset", 'String'>;
    readonly serialNumber: Prisma.FieldRef<"Asset", 'String'>;
    readonly assetTag: Prisma.FieldRef<"Asset", 'String'>;
    readonly purchaseDate: Prisma.FieldRef<"Asset", 'DateTime'>;
    readonly warrantyExpiry: Prisma.FieldRef<"Asset", 'DateTime'>;
    readonly statusId: Prisma.FieldRef<"Asset", 'Int'>;
    readonly modelId: Prisma.FieldRef<"Asset", 'Int'>;
    readonly locationId: Prisma.FieldRef<"Asset", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Asset", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Asset", 'DateTime'>;
}
export type AssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where: Prisma.AssetWhereUniqueInput;
};
export type AssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where: Prisma.AssetWhereUniqueInput;
};
export type AssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssetCreateInput, Prisma.AssetUncheckedCreateInput>;
};
export type AssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AssetCreateManyInput | Prisma.AssetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    data: Prisma.AssetCreateManyInput | Prisma.AssetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssetUpdateInput, Prisma.AssetUncheckedUpdateInput>;
    where: Prisma.AssetWhereUniqueInput;
};
export type AssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyInput>;
    where?: Prisma.AssetWhereInput;
    limit?: number;
};
export type AssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssetUpdateManyMutationInput, Prisma.AssetUncheckedUpdateManyInput>;
    where?: Prisma.AssetWhereInput;
    limit?: number;
    include?: Prisma.AssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where: Prisma.AssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssetCreateInput, Prisma.AssetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AssetUpdateInput, Prisma.AssetUncheckedUpdateInput>;
};
export type AssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where: Prisma.AssetWhereUniqueInput;
};
export type AssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssetWhereInput;
    limit?: number;
};
export type Asset$locationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LocationSelect<ExtArgs> | null;
    omit?: Prisma.LocationOmit<ExtArgs> | null;
    include?: Prisma.LocationInclude<ExtArgs> | null;
    where?: Prisma.LocationWhereInput;
};
export type Asset$assignmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    where?: Prisma.AssignmentWhereInput;
    orderBy?: Prisma.AssignmentOrderByWithRelationInput | Prisma.AssignmentOrderByWithRelationInput[];
    cursor?: Prisma.AssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssignmentScalarFieldEnum | Prisma.AssignmentScalarFieldEnum[];
};
export type AssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
};
