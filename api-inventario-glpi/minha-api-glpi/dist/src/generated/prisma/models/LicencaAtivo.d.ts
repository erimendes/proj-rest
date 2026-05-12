import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LicencaAtivoModel = runtime.Types.Result.DefaultSelection<Prisma.$LicencaAtivoPayload>;
export type AggregateLicencaAtivo = {
    _count: LicencaAtivoCountAggregateOutputType | null;
    _avg: LicencaAtivoAvgAggregateOutputType | null;
    _sum: LicencaAtivoSumAggregateOutputType | null;
    _min: LicencaAtivoMinAggregateOutputType | null;
    _max: LicencaAtivoMaxAggregateOutputType | null;
};
export type LicencaAtivoAvgAggregateOutputType = {
    id: number | null;
    ativoId: number | null;
    licencaId: number | null;
};
export type LicencaAtivoSumAggregateOutputType = {
    id: number | null;
    ativoId: number | null;
    licencaId: number | null;
};
export type LicencaAtivoMinAggregateOutputType = {
    id: number | null;
    ativoId: number | null;
    licencaId: number | null;
    dataInstalacao: Date | null;
};
export type LicencaAtivoMaxAggregateOutputType = {
    id: number | null;
    ativoId: number | null;
    licencaId: number | null;
    dataInstalacao: Date | null;
};
export type LicencaAtivoCountAggregateOutputType = {
    id: number;
    ativoId: number;
    licencaId: number;
    dataInstalacao: number;
    _all: number;
};
export type LicencaAtivoAvgAggregateInputType = {
    id?: true;
    ativoId?: true;
    licencaId?: true;
};
export type LicencaAtivoSumAggregateInputType = {
    id?: true;
    ativoId?: true;
    licencaId?: true;
};
export type LicencaAtivoMinAggregateInputType = {
    id?: true;
    ativoId?: true;
    licencaId?: true;
    dataInstalacao?: true;
};
export type LicencaAtivoMaxAggregateInputType = {
    id?: true;
    ativoId?: true;
    licencaId?: true;
    dataInstalacao?: true;
};
export type LicencaAtivoCountAggregateInputType = {
    id?: true;
    ativoId?: true;
    licencaId?: true;
    dataInstalacao?: true;
    _all?: true;
};
export type LicencaAtivoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaAtivoWhereInput;
    orderBy?: Prisma.LicencaAtivoOrderByWithRelationInput | Prisma.LicencaAtivoOrderByWithRelationInput[];
    cursor?: Prisma.LicencaAtivoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LicencaAtivoCountAggregateInputType;
    _avg?: LicencaAtivoAvgAggregateInputType;
    _sum?: LicencaAtivoSumAggregateInputType;
    _min?: LicencaAtivoMinAggregateInputType;
    _max?: LicencaAtivoMaxAggregateInputType;
};
export type GetLicencaAtivoAggregateType<T extends LicencaAtivoAggregateArgs> = {
    [P in keyof T & keyof AggregateLicencaAtivo]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLicencaAtivo[P]> : Prisma.GetScalarType<T[P], AggregateLicencaAtivo[P]>;
};
export type LicencaAtivoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaAtivoWhereInput;
    orderBy?: Prisma.LicencaAtivoOrderByWithAggregationInput | Prisma.LicencaAtivoOrderByWithAggregationInput[];
    by: Prisma.LicencaAtivoScalarFieldEnum[] | Prisma.LicencaAtivoScalarFieldEnum;
    having?: Prisma.LicencaAtivoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LicencaAtivoCountAggregateInputType | true;
    _avg?: LicencaAtivoAvgAggregateInputType;
    _sum?: LicencaAtivoSumAggregateInputType;
    _min?: LicencaAtivoMinAggregateInputType;
    _max?: LicencaAtivoMaxAggregateInputType;
};
export type LicencaAtivoGroupByOutputType = {
    id: number;
    ativoId: number;
    licencaId: number;
    dataInstalacao: Date;
    _count: LicencaAtivoCountAggregateOutputType | null;
    _avg: LicencaAtivoAvgAggregateOutputType | null;
    _sum: LicencaAtivoSumAggregateOutputType | null;
    _min: LicencaAtivoMinAggregateOutputType | null;
    _max: LicencaAtivoMaxAggregateOutputType | null;
};
export type GetLicencaAtivoGroupByPayload<T extends LicencaAtivoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LicencaAtivoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LicencaAtivoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LicencaAtivoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LicencaAtivoGroupByOutputType[P]>;
}>>;
export type LicencaAtivoWhereInput = {
    AND?: Prisma.LicencaAtivoWhereInput | Prisma.LicencaAtivoWhereInput[];
    OR?: Prisma.LicencaAtivoWhereInput[];
    NOT?: Prisma.LicencaAtivoWhereInput | Prisma.LicencaAtivoWhereInput[];
    id?: Prisma.IntFilter<"LicencaAtivo"> | number;
    ativoId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    licencaId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    dataInstalacao?: Prisma.DateTimeFilter<"LicencaAtivo"> | Date | string;
    ativo?: Prisma.XOR<Prisma.AtivoScalarRelationFilter, Prisma.AtivoWhereInput>;
    licenca?: Prisma.XOR<Prisma.LicencaScalarRelationFilter, Prisma.LicencaWhereInput>;
};
export type LicencaAtivoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
    dataInstalacao?: Prisma.SortOrder;
    ativo?: Prisma.AtivoOrderByWithRelationInput;
    licenca?: Prisma.LicencaOrderByWithRelationInput;
};
export type LicencaAtivoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    ativoId_licencaId?: Prisma.LicencaAtivoAtivoIdLicencaIdCompoundUniqueInput;
    AND?: Prisma.LicencaAtivoWhereInput | Prisma.LicencaAtivoWhereInput[];
    OR?: Prisma.LicencaAtivoWhereInput[];
    NOT?: Prisma.LicencaAtivoWhereInput | Prisma.LicencaAtivoWhereInput[];
    ativoId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    licencaId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    dataInstalacao?: Prisma.DateTimeFilter<"LicencaAtivo"> | Date | string;
    ativo?: Prisma.XOR<Prisma.AtivoScalarRelationFilter, Prisma.AtivoWhereInput>;
    licenca?: Prisma.XOR<Prisma.LicencaScalarRelationFilter, Prisma.LicencaWhereInput>;
}, "id" | "ativoId_licencaId">;
export type LicencaAtivoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
    dataInstalacao?: Prisma.SortOrder;
    _count?: Prisma.LicencaAtivoCountOrderByAggregateInput;
    _avg?: Prisma.LicencaAtivoAvgOrderByAggregateInput;
    _max?: Prisma.LicencaAtivoMaxOrderByAggregateInput;
    _min?: Prisma.LicencaAtivoMinOrderByAggregateInput;
    _sum?: Prisma.LicencaAtivoSumOrderByAggregateInput;
};
export type LicencaAtivoScalarWhereWithAggregatesInput = {
    AND?: Prisma.LicencaAtivoScalarWhereWithAggregatesInput | Prisma.LicencaAtivoScalarWhereWithAggregatesInput[];
    OR?: Prisma.LicencaAtivoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LicencaAtivoScalarWhereWithAggregatesInput | Prisma.LicencaAtivoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"LicencaAtivo"> | number;
    ativoId?: Prisma.IntWithAggregatesFilter<"LicencaAtivo"> | number;
    licencaId?: Prisma.IntWithAggregatesFilter<"LicencaAtivo"> | number;
    dataInstalacao?: Prisma.DateTimeWithAggregatesFilter<"LicencaAtivo"> | Date | string;
};
export type LicencaAtivoCreateInput = {
    dataInstalacao?: Date | string;
    ativo: Prisma.AtivoCreateNestedOneWithoutLicencasInput;
    licenca: Prisma.LicencaCreateNestedOneWithoutInstacoesInput;
};
export type LicencaAtivoUncheckedCreateInput = {
    id?: number;
    ativoId: number;
    licencaId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoUpdateInput = {
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ativo?: Prisma.AtivoUpdateOneRequiredWithoutLicencasNestedInput;
    licenca?: Prisma.LicencaUpdateOneRequiredWithoutInstacoesNestedInput;
};
export type LicencaAtivoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
    licencaId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoCreateManyInput = {
    id?: number;
    ativoId: number;
    licencaId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoUpdateManyMutationInput = {
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
    licencaId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoListRelationFilter = {
    every?: Prisma.LicencaAtivoWhereInput;
    some?: Prisma.LicencaAtivoWhereInput;
    none?: Prisma.LicencaAtivoWhereInput;
};
export type LicencaAtivoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LicencaAtivoAtivoIdLicencaIdCompoundUniqueInput = {
    ativoId: number;
    licencaId: number;
};
export type LicencaAtivoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
    dataInstalacao?: Prisma.SortOrder;
};
export type LicencaAtivoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
};
export type LicencaAtivoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
    dataInstalacao?: Prisma.SortOrder;
};
export type LicencaAtivoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
    dataInstalacao?: Prisma.SortOrder;
};
export type LicencaAtivoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ativoId?: Prisma.SortOrder;
    licencaId?: Prisma.SortOrder;
};
export type LicencaAtivoCreateNestedManyWithoutAtivoInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput> | Prisma.LicencaAtivoCreateWithoutAtivoInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput | Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput[];
    createMany?: Prisma.LicencaAtivoCreateManyAtivoInputEnvelope;
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
};
export type LicencaAtivoUncheckedCreateNestedManyWithoutAtivoInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput> | Prisma.LicencaAtivoCreateWithoutAtivoInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput | Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput[];
    createMany?: Prisma.LicencaAtivoCreateManyAtivoInputEnvelope;
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
};
export type LicencaAtivoUpdateManyWithoutAtivoNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput> | Prisma.LicencaAtivoCreateWithoutAtivoInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput | Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput[];
    upsert?: Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutAtivoInput | Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutAtivoInput[];
    createMany?: Prisma.LicencaAtivoCreateManyAtivoInputEnvelope;
    set?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    disconnect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    delete?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    update?: Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutAtivoInput | Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutAtivoInput[];
    updateMany?: Prisma.LicencaAtivoUpdateManyWithWhereWithoutAtivoInput | Prisma.LicencaAtivoUpdateManyWithWhereWithoutAtivoInput[];
    deleteMany?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
};
export type LicencaAtivoUncheckedUpdateManyWithoutAtivoNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput> | Prisma.LicencaAtivoCreateWithoutAtivoInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput | Prisma.LicencaAtivoCreateOrConnectWithoutAtivoInput[];
    upsert?: Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutAtivoInput | Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutAtivoInput[];
    createMany?: Prisma.LicencaAtivoCreateManyAtivoInputEnvelope;
    set?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    disconnect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    delete?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    update?: Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutAtivoInput | Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutAtivoInput[];
    updateMany?: Prisma.LicencaAtivoUpdateManyWithWhereWithoutAtivoInput | Prisma.LicencaAtivoUpdateManyWithWhereWithoutAtivoInput[];
    deleteMany?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
};
export type LicencaAtivoCreateNestedManyWithoutLicencaInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput> | Prisma.LicencaAtivoCreateWithoutLicencaInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput | Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput[];
    createMany?: Prisma.LicencaAtivoCreateManyLicencaInputEnvelope;
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
};
export type LicencaAtivoUncheckedCreateNestedManyWithoutLicencaInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput> | Prisma.LicencaAtivoCreateWithoutLicencaInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput | Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput[];
    createMany?: Prisma.LicencaAtivoCreateManyLicencaInputEnvelope;
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
};
export type LicencaAtivoUpdateManyWithoutLicencaNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput> | Prisma.LicencaAtivoCreateWithoutLicencaInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput | Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput[];
    upsert?: Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutLicencaInput | Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutLicencaInput[];
    createMany?: Prisma.LicencaAtivoCreateManyLicencaInputEnvelope;
    set?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    disconnect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    delete?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    update?: Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutLicencaInput | Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutLicencaInput[];
    updateMany?: Prisma.LicencaAtivoUpdateManyWithWhereWithoutLicencaInput | Prisma.LicencaAtivoUpdateManyWithWhereWithoutLicencaInput[];
    deleteMany?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
};
export type LicencaAtivoUncheckedUpdateManyWithoutLicencaNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput> | Prisma.LicencaAtivoCreateWithoutLicencaInput[] | Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput[];
    connectOrCreate?: Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput | Prisma.LicencaAtivoCreateOrConnectWithoutLicencaInput[];
    upsert?: Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutLicencaInput | Prisma.LicencaAtivoUpsertWithWhereUniqueWithoutLicencaInput[];
    createMany?: Prisma.LicencaAtivoCreateManyLicencaInputEnvelope;
    set?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    disconnect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    delete?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    connect?: Prisma.LicencaAtivoWhereUniqueInput | Prisma.LicencaAtivoWhereUniqueInput[];
    update?: Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutLicencaInput | Prisma.LicencaAtivoUpdateWithWhereUniqueWithoutLicencaInput[];
    updateMany?: Prisma.LicencaAtivoUpdateManyWithWhereWithoutLicencaInput | Prisma.LicencaAtivoUpdateManyWithWhereWithoutLicencaInput[];
    deleteMany?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
};
export type LicencaAtivoCreateWithoutAtivoInput = {
    dataInstalacao?: Date | string;
    licenca: Prisma.LicencaCreateNestedOneWithoutInstacoesInput;
};
export type LicencaAtivoUncheckedCreateWithoutAtivoInput = {
    id?: number;
    licencaId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoCreateOrConnectWithoutAtivoInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput>;
};
export type LicencaAtivoCreateManyAtivoInputEnvelope = {
    data: Prisma.LicencaAtivoCreateManyAtivoInput | Prisma.LicencaAtivoCreateManyAtivoInput[];
    skipDuplicates?: boolean;
};
export type LicencaAtivoUpsertWithWhereUniqueWithoutAtivoInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    update: Prisma.XOR<Prisma.LicencaAtivoUpdateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedUpdateWithoutAtivoInput>;
    create: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedCreateWithoutAtivoInput>;
};
export type LicencaAtivoUpdateWithWhereUniqueWithoutAtivoInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateWithoutAtivoInput, Prisma.LicencaAtivoUncheckedUpdateWithoutAtivoInput>;
};
export type LicencaAtivoUpdateManyWithWhereWithoutAtivoInput = {
    where: Prisma.LicencaAtivoScalarWhereInput;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateManyMutationInput, Prisma.LicencaAtivoUncheckedUpdateManyWithoutAtivoInput>;
};
export type LicencaAtivoScalarWhereInput = {
    AND?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
    OR?: Prisma.LicencaAtivoScalarWhereInput[];
    NOT?: Prisma.LicencaAtivoScalarWhereInput | Prisma.LicencaAtivoScalarWhereInput[];
    id?: Prisma.IntFilter<"LicencaAtivo"> | number;
    ativoId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    licencaId?: Prisma.IntFilter<"LicencaAtivo"> | number;
    dataInstalacao?: Prisma.DateTimeFilter<"LicencaAtivo"> | Date | string;
};
export type LicencaAtivoCreateWithoutLicencaInput = {
    dataInstalacao?: Date | string;
    ativo: Prisma.AtivoCreateNestedOneWithoutLicencasInput;
};
export type LicencaAtivoUncheckedCreateWithoutLicencaInput = {
    id?: number;
    ativoId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoCreateOrConnectWithoutLicencaInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput>;
};
export type LicencaAtivoCreateManyLicencaInputEnvelope = {
    data: Prisma.LicencaAtivoCreateManyLicencaInput | Prisma.LicencaAtivoCreateManyLicencaInput[];
    skipDuplicates?: boolean;
};
export type LicencaAtivoUpsertWithWhereUniqueWithoutLicencaInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    update: Prisma.XOR<Prisma.LicencaAtivoUpdateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedUpdateWithoutLicencaInput>;
    create: Prisma.XOR<Prisma.LicencaAtivoCreateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedCreateWithoutLicencaInput>;
};
export type LicencaAtivoUpdateWithWhereUniqueWithoutLicencaInput = {
    where: Prisma.LicencaAtivoWhereUniqueInput;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateWithoutLicencaInput, Prisma.LicencaAtivoUncheckedUpdateWithoutLicencaInput>;
};
export type LicencaAtivoUpdateManyWithWhereWithoutLicencaInput = {
    where: Prisma.LicencaAtivoScalarWhereInput;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateManyMutationInput, Prisma.LicencaAtivoUncheckedUpdateManyWithoutLicencaInput>;
};
export type LicencaAtivoCreateManyAtivoInput = {
    id?: number;
    licencaId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoUpdateWithoutAtivoInput = {
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    licenca?: Prisma.LicencaUpdateOneRequiredWithoutInstacoesNestedInput;
};
export type LicencaAtivoUncheckedUpdateWithoutAtivoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    licencaId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoUncheckedUpdateManyWithoutAtivoInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    licencaId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoCreateManyLicencaInput = {
    id?: number;
    ativoId: number;
    dataInstalacao?: Date | string;
};
export type LicencaAtivoUpdateWithoutLicencaInput = {
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ativo?: Prisma.AtivoUpdateOneRequiredWithoutLicencasNestedInput;
};
export type LicencaAtivoUncheckedUpdateWithoutLicencaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoUncheckedUpdateManyWithoutLicencaInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    ativoId?: Prisma.IntFieldUpdateOperationsInput | number;
    dataInstalacao?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LicencaAtivoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ativoId?: boolean;
    licencaId?: boolean;
    dataInstalacao?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licencaAtivo"]>;
export type LicencaAtivoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ativoId?: boolean;
    licencaId?: boolean;
    dataInstalacao?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licencaAtivo"]>;
export type LicencaAtivoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ativoId?: boolean;
    licencaId?: boolean;
    dataInstalacao?: boolean;
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licencaAtivo"]>;
export type LicencaAtivoSelectScalar = {
    id?: boolean;
    ativoId?: boolean;
    licencaId?: boolean;
    dataInstalacao?: boolean;
};
export type LicencaAtivoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ativoId" | "licencaId" | "dataInstalacao", ExtArgs["result"]["licencaAtivo"]>;
export type LicencaAtivoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
};
export type LicencaAtivoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
};
export type LicencaAtivoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ativo?: boolean | Prisma.AtivoDefaultArgs<ExtArgs>;
    licenca?: boolean | Prisma.LicencaDefaultArgs<ExtArgs>;
};
export type $LicencaAtivoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LicencaAtivo";
    objects: {
        ativo: Prisma.$AtivoPayload<ExtArgs>;
        licenca: Prisma.$LicencaPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        ativoId: number;
        licencaId: number;
        dataInstalacao: Date;
    }, ExtArgs["result"]["licencaAtivo"]>;
    composites: {};
};
export type LicencaAtivoGetPayload<S extends boolean | null | undefined | LicencaAtivoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload, S>;
export type LicencaAtivoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LicencaAtivoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LicencaAtivoCountAggregateInputType | true;
};
export interface LicencaAtivoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LicencaAtivo'];
        meta: {
            name: 'LicencaAtivo';
        };
    };
    findUnique<T extends LicencaAtivoFindUniqueArgs>(args: Prisma.SelectSubset<T, LicencaAtivoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LicencaAtivoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LicencaAtivoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LicencaAtivoFindFirstArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoFindFirstArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LicencaAtivoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LicencaAtivoFindManyArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LicencaAtivoCreateArgs>(args: Prisma.SelectSubset<T, LicencaAtivoCreateArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LicencaAtivoCreateManyArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LicencaAtivoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LicencaAtivoDeleteArgs>(args: Prisma.SelectSubset<T, LicencaAtivoDeleteArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LicencaAtivoUpdateArgs>(args: Prisma.SelectSubset<T, LicencaAtivoUpdateArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LicencaAtivoDeleteManyArgs>(args?: Prisma.SelectSubset<T, LicencaAtivoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LicencaAtivoUpdateManyArgs>(args: Prisma.SelectSubset<T, LicencaAtivoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LicencaAtivoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LicencaAtivoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LicencaAtivoUpsertArgs>(args: Prisma.SelectSubset<T, LicencaAtivoUpsertArgs<ExtArgs>>): Prisma.Prisma__LicencaAtivoClient<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LicencaAtivoCountArgs>(args?: Prisma.Subset<T, LicencaAtivoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LicencaAtivoCountAggregateOutputType> : number>;
    aggregate<T extends LicencaAtivoAggregateArgs>(args: Prisma.Subset<T, LicencaAtivoAggregateArgs>): Prisma.PrismaPromise<GetLicencaAtivoAggregateType<T>>;
    groupBy<T extends LicencaAtivoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LicencaAtivoGroupByArgs['orderBy'];
    } : {
        orderBy?: LicencaAtivoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LicencaAtivoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLicencaAtivoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LicencaAtivoFieldRefs;
}
export interface Prisma__LicencaAtivoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ativo<T extends Prisma.AtivoDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AtivoDefaultArgs<ExtArgs>>): Prisma.Prisma__AtivoClient<runtime.Types.Result.GetResult<Prisma.$AtivoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    licenca<T extends Prisma.LicencaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LicencaDefaultArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LicencaAtivoFieldRefs {
    readonly id: Prisma.FieldRef<"LicencaAtivo", 'Int'>;
    readonly ativoId: Prisma.FieldRef<"LicencaAtivo", 'Int'>;
    readonly licencaId: Prisma.FieldRef<"LicencaAtivo", 'Int'>;
    readonly dataInstalacao: Prisma.FieldRef<"LicencaAtivo", 'DateTime'>;
}
export type LicencaAtivoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where: Prisma.LicencaAtivoWhereUniqueInput;
};
export type LicencaAtivoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where: Prisma.LicencaAtivoWhereUniqueInput;
};
export type LicencaAtivoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where?: Prisma.LicencaAtivoWhereInput;
    orderBy?: Prisma.LicencaAtivoOrderByWithRelationInput | Prisma.LicencaAtivoOrderByWithRelationInput[];
    cursor?: Prisma.LicencaAtivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaAtivoScalarFieldEnum | Prisma.LicencaAtivoScalarFieldEnum[];
};
export type LicencaAtivoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where?: Prisma.LicencaAtivoWhereInput;
    orderBy?: Prisma.LicencaAtivoOrderByWithRelationInput | Prisma.LicencaAtivoOrderByWithRelationInput[];
    cursor?: Prisma.LicencaAtivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaAtivoScalarFieldEnum | Prisma.LicencaAtivoScalarFieldEnum[];
};
export type LicencaAtivoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where?: Prisma.LicencaAtivoWhereInput;
    orderBy?: Prisma.LicencaAtivoOrderByWithRelationInput | Prisma.LicencaAtivoOrderByWithRelationInput[];
    cursor?: Prisma.LicencaAtivoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaAtivoScalarFieldEnum | Prisma.LicencaAtivoScalarFieldEnum[];
};
export type LicencaAtivoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaAtivoCreateInput, Prisma.LicencaAtivoUncheckedCreateInput>;
};
export type LicencaAtivoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LicencaAtivoCreateManyInput | Prisma.LicencaAtivoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LicencaAtivoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    data: Prisma.LicencaAtivoCreateManyInput | Prisma.LicencaAtivoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LicencaAtivoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LicencaAtivoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateInput, Prisma.LicencaAtivoUncheckedUpdateInput>;
    where: Prisma.LicencaAtivoWhereUniqueInput;
};
export type LicencaAtivoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateManyMutationInput, Prisma.LicencaAtivoUncheckedUpdateManyInput>;
    where?: Prisma.LicencaAtivoWhereInput;
    limit?: number;
};
export type LicencaAtivoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaAtivoUpdateManyMutationInput, Prisma.LicencaAtivoUncheckedUpdateManyInput>;
    where?: Prisma.LicencaAtivoWhereInput;
    limit?: number;
    include?: Prisma.LicencaAtivoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LicencaAtivoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where: Prisma.LicencaAtivoWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaAtivoCreateInput, Prisma.LicencaAtivoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LicencaAtivoUpdateInput, Prisma.LicencaAtivoUncheckedUpdateInput>;
};
export type LicencaAtivoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
    where: Prisma.LicencaAtivoWhereUniqueInput;
};
export type LicencaAtivoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaAtivoWhereInput;
    limit?: number;
};
export type LicencaAtivoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaAtivoSelect<ExtArgs> | null;
    omit?: Prisma.LicencaAtivoOmit<ExtArgs> | null;
    include?: Prisma.LicencaAtivoInclude<ExtArgs> | null;
};
