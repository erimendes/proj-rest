import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$AssignmentPayload>;
export type AggregateAssignment = {
    _count: AssignmentCountAggregateOutputType | null;
    _avg: AssignmentAvgAggregateOutputType | null;
    _sum: AssignmentSumAggregateOutputType | null;
    _min: AssignmentMinAggregateOutputType | null;
    _max: AssignmentMaxAggregateOutputType | null;
};
export type AssignmentAvgAggregateOutputType = {
    id: number | null;
    computerId: number | null;
    userId: number | null;
};
export type AssignmentSumAggregateOutputType = {
    id: number | null;
    computerId: number | null;
    userId: number | null;
};
export type AssignmentMinAggregateOutputType = {
    id: number | null;
    computerId: number | null;
    userId: number | null;
    assignedAt: Date | null;
    returnedAt: Date | null;
};
export type AssignmentMaxAggregateOutputType = {
    id: number | null;
    computerId: number | null;
    userId: number | null;
    assignedAt: Date | null;
    returnedAt: Date | null;
};
export type AssignmentCountAggregateOutputType = {
    id: number;
    computerId: number;
    userId: number;
    assignedAt: number;
    returnedAt: number;
    _all: number;
};
export type AssignmentAvgAggregateInputType = {
    id?: true;
    computerId?: true;
    userId?: true;
};
export type AssignmentSumAggregateInputType = {
    id?: true;
    computerId?: true;
    userId?: true;
};
export type AssignmentMinAggregateInputType = {
    id?: true;
    computerId?: true;
    userId?: true;
    assignedAt?: true;
    returnedAt?: true;
};
export type AssignmentMaxAggregateInputType = {
    id?: true;
    computerId?: true;
    userId?: true;
    assignedAt?: true;
    returnedAt?: true;
};
export type AssignmentCountAggregateInputType = {
    id?: true;
    computerId?: true;
    userId?: true;
    assignedAt?: true;
    returnedAt?: true;
    _all?: true;
};
export type AssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssignmentWhereInput;
    orderBy?: Prisma.AssignmentOrderByWithRelationInput | Prisma.AssignmentOrderByWithRelationInput[];
    cursor?: Prisma.AssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AssignmentCountAggregateInputType;
    _avg?: AssignmentAvgAggregateInputType;
    _sum?: AssignmentSumAggregateInputType;
    _min?: AssignmentMinAggregateInputType;
    _max?: AssignmentMaxAggregateInputType;
};
export type GetAssignmentAggregateType<T extends AssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssignment[P]> : Prisma.GetScalarType<T[P], AggregateAssignment[P]>;
};
export type AssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssignmentWhereInput;
    orderBy?: Prisma.AssignmentOrderByWithAggregationInput | Prisma.AssignmentOrderByWithAggregationInput[];
    by: Prisma.AssignmentScalarFieldEnum[] | Prisma.AssignmentScalarFieldEnum;
    having?: Prisma.AssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssignmentCountAggregateInputType | true;
    _avg?: AssignmentAvgAggregateInputType;
    _sum?: AssignmentSumAggregateInputType;
    _min?: AssignmentMinAggregateInputType;
    _max?: AssignmentMaxAggregateInputType;
};
export type AssignmentGroupByOutputType = {
    id: number;
    computerId: number;
    userId: number;
    assignedAt: Date;
    returnedAt: Date | null;
    _count: AssignmentCountAggregateOutputType | null;
    _avg: AssignmentAvgAggregateOutputType | null;
    _sum: AssignmentSumAggregateOutputType | null;
    _min: AssignmentMinAggregateOutputType | null;
    _max: AssignmentMaxAggregateOutputType | null;
};
export type GetAssignmentGroupByPayload<T extends AssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssignmentGroupByOutputType[P]>;
}>>;
export type AssignmentWhereInput = {
    AND?: Prisma.AssignmentWhereInput | Prisma.AssignmentWhereInput[];
    OR?: Prisma.AssignmentWhereInput[];
    NOT?: Prisma.AssignmentWhereInput | Prisma.AssignmentWhereInput[];
    id?: Prisma.IntFilter<"Assignment"> | number;
    computerId?: Prisma.IntFilter<"Assignment"> | number;
    userId?: Prisma.IntFilter<"Assignment"> | number;
    assignedAt?: Prisma.DateTimeFilter<"Assignment"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Assignment"> | Date | string | null;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AssignmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    computer?: Prisma.ComputerOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type AssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.AssignmentWhereInput | Prisma.AssignmentWhereInput[];
    OR?: Prisma.AssignmentWhereInput[];
    NOT?: Prisma.AssignmentWhereInput | Prisma.AssignmentWhereInput[];
    computerId?: Prisma.IntFilter<"Assignment"> | number;
    userId?: Prisma.IntFilter<"Assignment"> | number;
    assignedAt?: Prisma.DateTimeFilter<"Assignment"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Assignment"> | Date | string | null;
    computer?: Prisma.XOR<Prisma.ComputerScalarRelationFilter, Prisma.ComputerWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type AssignmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AssignmentCountOrderByAggregateInput;
    _avg?: Prisma.AssignmentAvgOrderByAggregateInput;
    _max?: Prisma.AssignmentMaxOrderByAggregateInput;
    _min?: Prisma.AssignmentMinOrderByAggregateInput;
    _sum?: Prisma.AssignmentSumOrderByAggregateInput;
};
export type AssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssignmentScalarWhereWithAggregatesInput | Prisma.AssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssignmentScalarWhereWithAggregatesInput | Prisma.AssignmentScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Assignment"> | number;
    computerId?: Prisma.IntWithAggregatesFilter<"Assignment"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Assignment"> | number;
    assignedAt?: Prisma.DateTimeWithAggregatesFilter<"Assignment"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Assignment"> | Date | string | null;
};
export type AssignmentCreateInput = {
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
    computer: Prisma.ComputerCreateNestedOneWithoutAssignmentsInput;
    user: Prisma.UserCreateNestedOneWithoutAssignmentsInput;
};
export type AssignmentUncheckedCreateInput = {
    id?: number;
    computerId: number;
    userId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentUpdateInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    computer?: Prisma.ComputerUpdateOneRequiredWithoutAssignmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutAssignmentsNestedInput;
};
export type AssignmentUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentCreateManyInput = {
    id?: number;
    computerId: number;
    userId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentUpdateManyMutationInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentListRelationFilter = {
    every?: Prisma.AssignmentWhereInput;
    some?: Prisma.AssignmentWhereInput;
    none?: Prisma.AssignmentWhereInput;
};
export type AssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AssignmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
};
export type AssignmentAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type AssignmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
};
export type AssignmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    assignedAt?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
};
export type AssignmentSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    computerId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type AssignmentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput> | Prisma.AssignmentCreateWithoutUserInput[] | Prisma.AssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutUserInput | Prisma.AssignmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AssignmentCreateManyUserInputEnvelope;
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
};
export type AssignmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput> | Prisma.AssignmentCreateWithoutUserInput[] | Prisma.AssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutUserInput | Prisma.AssignmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AssignmentCreateManyUserInputEnvelope;
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
};
export type AssignmentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput> | Prisma.AssignmentCreateWithoutUserInput[] | Prisma.AssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutUserInput | Prisma.AssignmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput | Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AssignmentCreateManyUserInputEnvelope;
    set?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    disconnect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    delete?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    update?: Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput | Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AssignmentUpdateManyWithWhereWithoutUserInput | Prisma.AssignmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
};
export type AssignmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput> | Prisma.AssignmentCreateWithoutUserInput[] | Prisma.AssignmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutUserInput | Prisma.AssignmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput | Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AssignmentCreateManyUserInputEnvelope;
    set?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    disconnect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    delete?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    update?: Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput | Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AssignmentUpdateManyWithWhereWithoutUserInput | Prisma.AssignmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type AssignmentCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput> | Prisma.AssignmentCreateWithoutComputerInput[] | Prisma.AssignmentUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutComputerInput | Prisma.AssignmentCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.AssignmentCreateManyComputerInputEnvelope;
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
};
export type AssignmentUncheckedCreateNestedManyWithoutComputerInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput> | Prisma.AssignmentCreateWithoutComputerInput[] | Prisma.AssignmentUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutComputerInput | Prisma.AssignmentCreateOrConnectWithoutComputerInput[];
    createMany?: Prisma.AssignmentCreateManyComputerInputEnvelope;
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
};
export type AssignmentUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput> | Prisma.AssignmentCreateWithoutComputerInput[] | Prisma.AssignmentUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutComputerInput | Prisma.AssignmentCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.AssignmentUpsertWithWhereUniqueWithoutComputerInput | Prisma.AssignmentUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.AssignmentCreateManyComputerInputEnvelope;
    set?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    disconnect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    delete?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    update?: Prisma.AssignmentUpdateWithWhereUniqueWithoutComputerInput | Prisma.AssignmentUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.AssignmentUpdateManyWithWhereWithoutComputerInput | Prisma.AssignmentUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
};
export type AssignmentUncheckedUpdateManyWithoutComputerNestedInput = {
    create?: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput> | Prisma.AssignmentCreateWithoutComputerInput[] | Prisma.AssignmentUncheckedCreateWithoutComputerInput[];
    connectOrCreate?: Prisma.AssignmentCreateOrConnectWithoutComputerInput | Prisma.AssignmentCreateOrConnectWithoutComputerInput[];
    upsert?: Prisma.AssignmentUpsertWithWhereUniqueWithoutComputerInput | Prisma.AssignmentUpsertWithWhereUniqueWithoutComputerInput[];
    createMany?: Prisma.AssignmentCreateManyComputerInputEnvelope;
    set?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    disconnect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    delete?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    connect?: Prisma.AssignmentWhereUniqueInput | Prisma.AssignmentWhereUniqueInput[];
    update?: Prisma.AssignmentUpdateWithWhereUniqueWithoutComputerInput | Prisma.AssignmentUpdateWithWhereUniqueWithoutComputerInput[];
    updateMany?: Prisma.AssignmentUpdateManyWithWhereWithoutComputerInput | Prisma.AssignmentUpdateManyWithWhereWithoutComputerInput[];
    deleteMany?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
};
export type AssignmentCreateWithoutUserInput = {
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
    computer: Prisma.ComputerCreateNestedOneWithoutAssignmentsInput;
};
export type AssignmentUncheckedCreateWithoutUserInput = {
    id?: number;
    computerId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentCreateOrConnectWithoutUserInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput>;
};
export type AssignmentCreateManyUserInputEnvelope = {
    data: Prisma.AssignmentCreateManyUserInput | Prisma.AssignmentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AssignmentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssignmentUpdateWithoutUserInput, Prisma.AssignmentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AssignmentCreateWithoutUserInput, Prisma.AssignmentUncheckedCreateWithoutUserInput>;
};
export type AssignmentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssignmentUpdateWithoutUserInput, Prisma.AssignmentUncheckedUpdateWithoutUserInput>;
};
export type AssignmentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AssignmentUpdateManyMutationInput, Prisma.AssignmentUncheckedUpdateManyWithoutUserInput>;
};
export type AssignmentScalarWhereInput = {
    AND?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
    OR?: Prisma.AssignmentScalarWhereInput[];
    NOT?: Prisma.AssignmentScalarWhereInput | Prisma.AssignmentScalarWhereInput[];
    id?: Prisma.IntFilter<"Assignment"> | number;
    computerId?: Prisma.IntFilter<"Assignment"> | number;
    userId?: Prisma.IntFilter<"Assignment"> | number;
    assignedAt?: Prisma.DateTimeFilter<"Assignment"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Assignment"> | Date | string | null;
};
export type AssignmentCreateWithoutComputerInput = {
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutAssignmentsInput;
};
export type AssignmentUncheckedCreateWithoutComputerInput = {
    id?: number;
    userId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentCreateOrConnectWithoutComputerInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput>;
};
export type AssignmentCreateManyComputerInputEnvelope = {
    data: Prisma.AssignmentCreateManyComputerInput | Prisma.AssignmentCreateManyComputerInput[];
    skipDuplicates?: boolean;
};
export type AssignmentUpsertWithWhereUniqueWithoutComputerInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssignmentUpdateWithoutComputerInput, Prisma.AssignmentUncheckedUpdateWithoutComputerInput>;
    create: Prisma.XOR<Prisma.AssignmentCreateWithoutComputerInput, Prisma.AssignmentUncheckedCreateWithoutComputerInput>;
};
export type AssignmentUpdateWithWhereUniqueWithoutComputerInput = {
    where: Prisma.AssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssignmentUpdateWithoutComputerInput, Prisma.AssignmentUncheckedUpdateWithoutComputerInput>;
};
export type AssignmentUpdateManyWithWhereWithoutComputerInput = {
    where: Prisma.AssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AssignmentUpdateManyMutationInput, Prisma.AssignmentUncheckedUpdateManyWithoutComputerInput>;
};
export type AssignmentCreateManyUserInput = {
    id?: number;
    computerId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentUpdateWithoutUserInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    computer?: Prisma.ComputerUpdateOneRequiredWithoutAssignmentsNestedInput;
};
export type AssignmentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    computerId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentCreateManyComputerInput = {
    id?: number;
    userId: number;
    assignedAt?: Date | string;
    returnedAt?: Date | string | null;
};
export type AssignmentUpdateWithoutComputerInput = {
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutAssignmentsNestedInput;
};
export type AssignmentUncheckedUpdateWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentUncheckedUpdateManyWithoutComputerInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    assignedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    computerId?: boolean;
    userId?: boolean;
    assignedAt?: boolean;
    returnedAt?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assignment"]>;
export type AssignmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    computerId?: boolean;
    userId?: boolean;
    assignedAt?: boolean;
    returnedAt?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assignment"]>;
export type AssignmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    computerId?: boolean;
    userId?: boolean;
    assignedAt?: boolean;
    returnedAt?: boolean;
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assignment"]>;
export type AssignmentSelectScalar = {
    id?: boolean;
    computerId?: boolean;
    userId?: boolean;
    assignedAt?: boolean;
    returnedAt?: boolean;
};
export type AssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "computerId" | "userId" | "assignedAt" | "returnedAt", ExtArgs["result"]["assignment"]>;
export type AssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AssignmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AssignmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    computer?: boolean | Prisma.ComputerDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Assignment";
    objects: {
        computer: Prisma.$ComputerPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        computerId: number;
        userId: number;
        assignedAt: Date;
        returnedAt: Date | null;
    }, ExtArgs["result"]["assignment"]>;
    composites: {};
};
export type AssignmentGetPayload<S extends boolean | null | undefined | AssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssignmentPayload, S>;
export type AssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssignmentCountAggregateInputType | true;
};
export interface AssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Assignment'];
        meta: {
            name: 'Assignment';
        };
    };
    findUnique<T extends AssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, AssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, AssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, AssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AssignmentCreateArgs>(args: Prisma.SelectSubset<T, AssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, AssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AssignmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AssignmentDeleteArgs>(args: Prisma.SelectSubset<T, AssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AssignmentUpdateArgs>(args: Prisma.SelectSubset<T, AssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, AssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AssignmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AssignmentUpsertArgs>(args: Prisma.SelectSubset<T, AssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__AssignmentClient<runtime.Types.Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AssignmentCountArgs>(args?: Prisma.Subset<T, AssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssignmentCountAggregateOutputType> : number>;
    aggregate<T extends AssignmentAggregateArgs>(args: Prisma.Subset<T, AssignmentAggregateArgs>): Prisma.PrismaPromise<GetAssignmentAggregateType<T>>;
    groupBy<T extends AssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: AssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AssignmentFieldRefs;
}
export interface Prisma__AssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    computer<T extends Prisma.ComputerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ComputerDefaultArgs<ExtArgs>>): Prisma.Prisma__ComputerClient<runtime.Types.Result.GetResult<Prisma.$ComputerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AssignmentFieldRefs {
    readonly id: Prisma.FieldRef<"Assignment", 'Int'>;
    readonly computerId: Prisma.FieldRef<"Assignment", 'Int'>;
    readonly userId: Prisma.FieldRef<"Assignment", 'Int'>;
    readonly assignedAt: Prisma.FieldRef<"Assignment", 'DateTime'>;
    readonly returnedAt: Prisma.FieldRef<"Assignment", 'DateTime'>;
}
export type AssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    where: Prisma.AssignmentWhereUniqueInput;
};
export type AssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    where: Prisma.AssignmentWhereUniqueInput;
};
export type AssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssignmentCreateInput, Prisma.AssignmentUncheckedCreateInput>;
};
export type AssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AssignmentCreateManyInput | Prisma.AssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AssignmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    data: Prisma.AssignmentCreateManyInput | Prisma.AssignmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AssignmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssignmentUpdateInput, Prisma.AssignmentUncheckedUpdateInput>;
    where: Prisma.AssignmentWhereUniqueInput;
};
export type AssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AssignmentUpdateManyMutationInput, Prisma.AssignmentUncheckedUpdateManyInput>;
    where?: Prisma.AssignmentWhereInput;
    limit?: number;
};
export type AssignmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AssignmentUpdateManyMutationInput, Prisma.AssignmentUncheckedUpdateManyInput>;
    where?: Prisma.AssignmentWhereInput;
    limit?: number;
    include?: Prisma.AssignmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    where: Prisma.AssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssignmentCreateInput, Prisma.AssignmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AssignmentUpdateInput, Prisma.AssignmentUncheckedUpdateInput>;
};
export type AssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
    where: Prisma.AssignmentWhereUniqueInput;
};
export type AssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssignmentWhereInput;
    limit?: number;
};
export type AssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssignmentSelect<ExtArgs> | null;
    omit?: Prisma.AssignmentOmit<ExtArgs> | null;
    include?: Prisma.AssignmentInclude<ExtArgs> | null;
};
