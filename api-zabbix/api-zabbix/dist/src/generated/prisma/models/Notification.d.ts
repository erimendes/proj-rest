import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type NotificationModel = runtime.Types.Result.DefaultSelection<Prisma.$NotificationPayload>;
export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null;
    _avg: NotificationAvgAggregateOutputType | null;
    _sum: NotificationSumAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type NotificationAvgAggregateOutputType = {
    id: number | null;
};
export type NotificationSumAggregateOutputType = {
    id: number | null;
};
export type NotificationMinAggregateOutputType = {
    id: number | null;
    eventid: string | null;
    host: string | null;
    ipAddress: string | null;
    triggerName: string | null;
    priority: $Enums.NotificationPriority | null;
    status: string | null;
    message: string | null;
    acknowledged: boolean | null;
    assetHostname: string | null;
    createdAt: Date | null;
    resolvedAt: Date | null;
};
export type NotificationMaxAggregateOutputType = {
    id: number | null;
    eventid: string | null;
    host: string | null;
    ipAddress: string | null;
    triggerName: string | null;
    priority: $Enums.NotificationPriority | null;
    status: string | null;
    message: string | null;
    acknowledged: boolean | null;
    assetHostname: string | null;
    createdAt: Date | null;
    resolvedAt: Date | null;
};
export type NotificationCountAggregateOutputType = {
    id: number;
    eventid: number;
    host: number;
    ipAddress: number;
    triggerName: number;
    priority: number;
    status: number;
    message: number;
    acknowledged: number;
    assetHostname: number;
    createdAt: number;
    resolvedAt: number;
    _all: number;
};
export type NotificationAvgAggregateInputType = {
    id?: true;
};
export type NotificationSumAggregateInputType = {
    id?: true;
};
export type NotificationMinAggregateInputType = {
    id?: true;
    eventid?: true;
    host?: true;
    ipAddress?: true;
    triggerName?: true;
    priority?: true;
    status?: true;
    message?: true;
    acknowledged?: true;
    assetHostname?: true;
    createdAt?: true;
    resolvedAt?: true;
};
export type NotificationMaxAggregateInputType = {
    id?: true;
    eventid?: true;
    host?: true;
    ipAddress?: true;
    triggerName?: true;
    priority?: true;
    status?: true;
    message?: true;
    acknowledged?: true;
    assetHostname?: true;
    createdAt?: true;
    resolvedAt?: true;
};
export type NotificationCountAggregateInputType = {
    id?: true;
    eventid?: true;
    host?: true;
    ipAddress?: true;
    triggerName?: true;
    priority?: true;
    status?: true;
    message?: true;
    acknowledged?: true;
    assetHostname?: true;
    createdAt?: true;
    resolvedAt?: true;
    _all?: true;
};
export type NotificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | NotificationCountAggregateInputType;
    _avg?: NotificationAvgAggregateInputType;
    _sum?: NotificationSumAggregateInputType;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
    [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotification[P]> : Prisma.GetScalarType<T[P], AggregateNotification[P]>;
};
export type NotificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithAggregationInput | Prisma.NotificationOrderByWithAggregationInput[];
    by: Prisma.NotificationScalarFieldEnum[] | Prisma.NotificationScalarFieldEnum;
    having?: Prisma.NotificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotificationCountAggregateInputType | true;
    _avg?: NotificationAvgAggregateInputType;
    _sum?: NotificationSumAggregateInputType;
    _min?: NotificationMinAggregateInputType;
    _max?: NotificationMaxAggregateInputType;
};
export type NotificationGroupByOutputType = {
    id: number;
    eventid: string | null;
    host: string;
    ipAddress: string | null;
    triggerName: string;
    priority: $Enums.NotificationPriority;
    status: string;
    message: string | null;
    acknowledged: boolean;
    assetHostname: string | null;
    createdAt: Date;
    resolvedAt: Date | null;
    _count: NotificationCountAggregateOutputType | null;
    _avg: NotificationAvgAggregateOutputType | null;
    _sum: NotificationSumAggregateOutputType | null;
    _min: NotificationMinAggregateOutputType | null;
    _max: NotificationMaxAggregateOutputType | null;
};
export type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotificationGroupByOutputType[P]>;
}>>;
export type NotificationWhereInput = {
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    id?: Prisma.IntFilter<"Notification"> | number;
    eventid?: Prisma.StringNullableFilter<"Notification"> | string | null;
    host?: Prisma.StringFilter<"Notification"> | string;
    ipAddress?: Prisma.StringNullableFilter<"Notification"> | string | null;
    triggerName?: Prisma.StringFilter<"Notification"> | string;
    priority?: Prisma.EnumNotificationPriorityFilter<"Notification"> | $Enums.NotificationPriority;
    status?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringNullableFilter<"Notification"> | string | null;
    acknowledged?: Prisma.BoolFilter<"Notification"> | boolean;
    assetHostname?: Prisma.StringNullableFilter<"Notification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null;
    asset?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
};
export type NotificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    eventid?: Prisma.SortOrderInput | Prisma.SortOrder;
    host?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggerName?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    acknowledged?: Prisma.SortOrder;
    assetHostname?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    asset?: Prisma.AssetOrderByWithRelationInput;
};
export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    eventid?: string;
    AND?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    OR?: Prisma.NotificationWhereInput[];
    NOT?: Prisma.NotificationWhereInput | Prisma.NotificationWhereInput[];
    host?: Prisma.StringFilter<"Notification"> | string;
    ipAddress?: Prisma.StringNullableFilter<"Notification"> | string | null;
    triggerName?: Prisma.StringFilter<"Notification"> | string;
    priority?: Prisma.EnumNotificationPriorityFilter<"Notification"> | $Enums.NotificationPriority;
    status?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringNullableFilter<"Notification"> | string | null;
    acknowledged?: Prisma.BoolFilter<"Notification"> | boolean;
    assetHostname?: Prisma.StringNullableFilter<"Notification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null;
    asset?: Prisma.XOR<Prisma.AssetNullableScalarRelationFilter, Prisma.AssetWhereInput> | null;
}, "id" | "eventid">;
export type NotificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    eventid?: Prisma.SortOrderInput | Prisma.SortOrder;
    host?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    triggerName?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    message?: Prisma.SortOrderInput | Prisma.SortOrder;
    acknowledged?: Prisma.SortOrder;
    assetHostname?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.NotificationCountOrderByAggregateInput;
    _avg?: Prisma.NotificationAvgOrderByAggregateInput;
    _max?: Prisma.NotificationMaxOrderByAggregateInput;
    _min?: Prisma.NotificationMinOrderByAggregateInput;
    _sum?: Prisma.NotificationSumOrderByAggregateInput;
};
export type NotificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotificationScalarWhereWithAggregatesInput | Prisma.NotificationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Notification"> | number;
    eventid?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
    host?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
    triggerName?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    priority?: Prisma.EnumNotificationPriorityWithAggregatesFilter<"Notification"> | $Enums.NotificationPriority;
    status?: Prisma.StringWithAggregatesFilter<"Notification"> | string;
    message?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
    acknowledged?: Prisma.BoolWithAggregatesFilter<"Notification"> | boolean;
    assetHostname?: Prisma.StringNullableWithAggregatesFilter<"Notification"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Notification"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null;
};
export type NotificationCreateInput = {
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
    asset?: Prisma.AssetCreateNestedOneWithoutNotificationsInput;
};
export type NotificationUncheckedCreateInput = {
    id?: number;
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    assetHostname?: string | null;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
};
export type NotificationUpdateInput = {
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    asset?: Prisma.AssetUpdateOneWithoutNotificationsNestedInput;
};
export type NotificationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    assetHostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationCreateManyInput = {
    id?: number;
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    assetHostname?: string | null;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
};
export type NotificationUpdateManyMutationInput = {
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    assetHostname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationListRelationFilter = {
    every?: Prisma.NotificationWhereInput;
    some?: Prisma.NotificationWhereInput;
    none?: Prisma.NotificationWhereInput;
};
export type NotificationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventid?: Prisma.SortOrder;
    host?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    triggerName?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    acknowledged?: Prisma.SortOrder;
    assetHostname?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
};
export type NotificationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type NotificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventid?: Prisma.SortOrder;
    host?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    triggerName?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    acknowledged?: Prisma.SortOrder;
    assetHostname?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
};
export type NotificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventid?: Prisma.SortOrder;
    host?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    triggerName?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    message?: Prisma.SortOrder;
    acknowledged?: Prisma.SortOrder;
    assetHostname?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    resolvedAt?: Prisma.SortOrder;
};
export type NotificationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type NotificationCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput> | Prisma.NotificationCreateWithoutAssetInput[] | Prisma.NotificationUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutAssetInput | Prisma.NotificationCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.NotificationCreateManyAssetInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUncheckedCreateNestedManyWithoutAssetInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput> | Prisma.NotificationCreateWithoutAssetInput[] | Prisma.NotificationUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutAssetInput | Prisma.NotificationCreateOrConnectWithoutAssetInput[];
    createMany?: Prisma.NotificationCreateManyAssetInputEnvelope;
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
};
export type NotificationUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput> | Prisma.NotificationCreateWithoutAssetInput[] | Prisma.NotificationUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutAssetInput | Prisma.NotificationCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutAssetInput | Prisma.NotificationUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.NotificationCreateManyAssetInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutAssetInput | Prisma.NotificationUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutAssetInput | Prisma.NotificationUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type NotificationUncheckedUpdateManyWithoutAssetNestedInput = {
    create?: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput> | Prisma.NotificationCreateWithoutAssetInput[] | Prisma.NotificationUncheckedCreateWithoutAssetInput[];
    connectOrCreate?: Prisma.NotificationCreateOrConnectWithoutAssetInput | Prisma.NotificationCreateOrConnectWithoutAssetInput[];
    upsert?: Prisma.NotificationUpsertWithWhereUniqueWithoutAssetInput | Prisma.NotificationUpsertWithWhereUniqueWithoutAssetInput[];
    createMany?: Prisma.NotificationCreateManyAssetInputEnvelope;
    set?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    disconnect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    delete?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    connect?: Prisma.NotificationWhereUniqueInput | Prisma.NotificationWhereUniqueInput[];
    update?: Prisma.NotificationUpdateWithWhereUniqueWithoutAssetInput | Prisma.NotificationUpdateWithWhereUniqueWithoutAssetInput[];
    updateMany?: Prisma.NotificationUpdateManyWithWhereWithoutAssetInput | Prisma.NotificationUpdateManyWithWhereWithoutAssetInput[];
    deleteMany?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
};
export type EnumNotificationPriorityFieldUpdateOperationsInput = {
    set?: $Enums.NotificationPriority;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NotificationCreateWithoutAssetInput = {
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
};
export type NotificationUncheckedCreateWithoutAssetInput = {
    id?: number;
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
};
export type NotificationCreateOrConnectWithoutAssetInput = {
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput>;
};
export type NotificationCreateManyAssetInputEnvelope = {
    data: Prisma.NotificationCreateManyAssetInput | Prisma.NotificationCreateManyAssetInput[];
    skipDuplicates?: boolean;
};
export type NotificationUpsertWithWhereUniqueWithoutAssetInput = {
    where: Prisma.NotificationWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotificationUpdateWithoutAssetInput, Prisma.NotificationUncheckedUpdateWithoutAssetInput>;
    create: Prisma.XOR<Prisma.NotificationCreateWithoutAssetInput, Prisma.NotificationUncheckedCreateWithoutAssetInput>;
};
export type NotificationUpdateWithWhereUniqueWithoutAssetInput = {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotificationUpdateWithoutAssetInput, Prisma.NotificationUncheckedUpdateWithoutAssetInput>;
};
export type NotificationUpdateManyWithWhereWithoutAssetInput = {
    where: Prisma.NotificationScalarWhereInput;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyWithoutAssetInput>;
};
export type NotificationScalarWhereInput = {
    AND?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    OR?: Prisma.NotificationScalarWhereInput[];
    NOT?: Prisma.NotificationScalarWhereInput | Prisma.NotificationScalarWhereInput[];
    id?: Prisma.IntFilter<"Notification"> | number;
    eventid?: Prisma.StringNullableFilter<"Notification"> | string | null;
    host?: Prisma.StringFilter<"Notification"> | string;
    ipAddress?: Prisma.StringNullableFilter<"Notification"> | string | null;
    triggerName?: Prisma.StringFilter<"Notification"> | string;
    priority?: Prisma.EnumNotificationPriorityFilter<"Notification"> | $Enums.NotificationPriority;
    status?: Prisma.StringFilter<"Notification"> | string;
    message?: Prisma.StringNullableFilter<"Notification"> | string | null;
    acknowledged?: Prisma.BoolFilter<"Notification"> | boolean;
    assetHostname?: Prisma.StringNullableFilter<"Notification"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Notification"> | Date | string;
    resolvedAt?: Prisma.DateTimeNullableFilter<"Notification"> | Date | string | null;
};
export type NotificationCreateManyAssetInput = {
    id?: number;
    eventid?: string | null;
    host: string;
    ipAddress?: string | null;
    triggerName: string;
    priority?: $Enums.NotificationPriority;
    status: string;
    message?: string | null;
    acknowledged?: boolean;
    createdAt?: Date | string;
    resolvedAt?: Date | string | null;
};
export type NotificationUpdateWithoutAssetInput = {
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationUncheckedUpdateWithoutAssetInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationUncheckedUpdateManyWithoutAssetInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    eventid?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    host?: Prisma.StringFieldUpdateOperationsInput | string;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    triggerName?: Prisma.StringFieldUpdateOperationsInput | string;
    priority?: Prisma.EnumNotificationPriorityFieldUpdateOperationsInput | $Enums.NotificationPriority;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    message?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    acknowledged?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resolvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NotificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventid?: boolean;
    host?: boolean;
    ipAddress?: boolean;
    triggerName?: boolean;
    priority?: boolean;
    status?: boolean;
    message?: boolean;
    acknowledged?: boolean;
    assetHostname?: boolean;
    createdAt?: boolean;
    resolvedAt?: boolean;
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventid?: boolean;
    host?: boolean;
    ipAddress?: boolean;
    triggerName?: boolean;
    priority?: boolean;
    status?: boolean;
    message?: boolean;
    acknowledged?: boolean;
    assetHostname?: boolean;
    createdAt?: boolean;
    resolvedAt?: boolean;
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventid?: boolean;
    host?: boolean;
    ipAddress?: boolean;
    triggerName?: boolean;
    priority?: boolean;
    status?: boolean;
    message?: boolean;
    acknowledged?: boolean;
    assetHostname?: boolean;
    createdAt?: boolean;
    resolvedAt?: boolean;
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
}, ExtArgs["result"]["notification"]>;
export type NotificationSelectScalar = {
    id?: boolean;
    eventid?: boolean;
    host?: boolean;
    ipAddress?: boolean;
    triggerName?: boolean;
    priority?: boolean;
    status?: boolean;
    message?: boolean;
    acknowledged?: boolean;
    assetHostname?: boolean;
    createdAt?: boolean;
    resolvedAt?: boolean;
};
export type NotificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "eventid" | "host" | "ipAddress" | "triggerName" | "priority" | "status" | "message" | "acknowledged" | "assetHostname" | "createdAt" | "resolvedAt", ExtArgs["result"]["notification"]>;
export type NotificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
};
export type NotificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
};
export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    asset?: boolean | Prisma.Notification$assetArgs<ExtArgs>;
};
export type $NotificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Notification";
    objects: {
        asset: Prisma.$AssetPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        eventid: string | null;
        host: string;
        ipAddress: string | null;
        triggerName: string;
        priority: $Enums.NotificationPriority;
        status: string;
        message: string | null;
        acknowledged: boolean;
        assetHostname: string | null;
        createdAt: Date;
        resolvedAt: Date | null;
    }, ExtArgs["result"]["notification"]>;
    composites: {};
};
export type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotificationPayload, S>;
export type NotificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotificationCountAggregateInputType | true;
};
export interface NotificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Notification'];
        meta: {
            name: 'Notification';
        };
    };
    findUnique<T extends NotificationFindUniqueArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends NotificationFindFirstArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends NotificationFindManyArgs>(args?: Prisma.SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends NotificationCreateArgs>(args: Prisma.SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends NotificationCreateManyArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends NotificationDeleteArgs>(args: Prisma.SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends NotificationUpdateArgs>(args: Prisma.SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends NotificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends NotificationUpdateManyArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends NotificationUpsertArgs>(args: Prisma.SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma.Prisma__NotificationClient<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends NotificationCountArgs>(args?: Prisma.Subset<T, NotificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotificationCountAggregateOutputType> : number>;
    aggregate<T extends NotificationAggregateArgs>(args: Prisma.Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>;
    groupBy<T extends NotificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotificationGroupByArgs['orderBy'];
    } : {
        orderBy?: NotificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: NotificationFieldRefs;
}
export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    asset<T extends Prisma.Notification$assetArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Notification$assetArgs<ExtArgs>>): Prisma.Prisma__AssetClient<runtime.Types.Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface NotificationFieldRefs {
    readonly id: Prisma.FieldRef<"Notification", 'Int'>;
    readonly eventid: Prisma.FieldRef<"Notification", 'String'>;
    readonly host: Prisma.FieldRef<"Notification", 'String'>;
    readonly ipAddress: Prisma.FieldRef<"Notification", 'String'>;
    readonly triggerName: Prisma.FieldRef<"Notification", 'String'>;
    readonly priority: Prisma.FieldRef<"Notification", 'NotificationPriority'>;
    readonly status: Prisma.FieldRef<"Notification", 'String'>;
    readonly message: Prisma.FieldRef<"Notification", 'String'>;
    readonly acknowledged: Prisma.FieldRef<"Notification", 'Boolean'>;
    readonly assetHostname: Prisma.FieldRef<"Notification", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Notification", 'DateTime'>;
    readonly resolvedAt: Prisma.FieldRef<"Notification", 'DateTime'>;
}
export type NotificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type NotificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
};
export type NotificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type NotificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.NotificationCreateManyInput | Prisma.NotificationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.NotificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type NotificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.NotificationUpdateManyMutationInput, Prisma.NotificationUncheckedUpdateManyInput>;
    where?: Prisma.NotificationWhereInput;
    limit?: number;
    include?: Prisma.NotificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type NotificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotificationCreateInput, Prisma.NotificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.NotificationUpdateInput, Prisma.NotificationUncheckedUpdateInput>;
};
export type NotificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where: Prisma.NotificationWhereUniqueInput;
};
export type NotificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
    limit?: number;
};
export type Notification$assetArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssetSelect<ExtArgs> | null;
    omit?: Prisma.AssetOmit<ExtArgs> | null;
    include?: Prisma.AssetInclude<ExtArgs> | null;
    where?: Prisma.AssetWhereInput;
};
export type NotificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
};
