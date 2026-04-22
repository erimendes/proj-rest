import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LicencaModel = runtime.Types.Result.DefaultSelection<Prisma.$LicencaPayload>;
export type AggregateLicenca = {
    _count: LicencaCountAggregateOutputType | null;
    _avg: LicencaAvgAggregateOutputType | null;
    _sum: LicencaSumAggregateOutputType | null;
    _min: LicencaMinAggregateOutputType | null;
    _max: LicencaMaxAggregateOutputType | null;
};
export type LicencaAvgAggregateOutputType = {
    id: number | null;
    softwareId: number | null;
};
export type LicencaSumAggregateOutputType = {
    id: number | null;
    softwareId: number | null;
};
export type LicencaMinAggregateOutputType = {
    id: number | null;
    chaveAtivacao: string | null;
    dataExpiracao: Date | null;
    softwareId: number | null;
};
export type LicencaMaxAggregateOutputType = {
    id: number | null;
    chaveAtivacao: string | null;
    dataExpiracao: Date | null;
    softwareId: number | null;
};
export type LicencaCountAggregateOutputType = {
    id: number;
    chaveAtivacao: number;
    dataExpiracao: number;
    softwareId: number;
    _all: number;
};
export type LicencaAvgAggregateInputType = {
    id?: true;
    softwareId?: true;
};
export type LicencaSumAggregateInputType = {
    id?: true;
    softwareId?: true;
};
export type LicencaMinAggregateInputType = {
    id?: true;
    chaveAtivacao?: true;
    dataExpiracao?: true;
    softwareId?: true;
};
export type LicencaMaxAggregateInputType = {
    id?: true;
    chaveAtivacao?: true;
    dataExpiracao?: true;
    softwareId?: true;
};
export type LicencaCountAggregateInputType = {
    id?: true;
    chaveAtivacao?: true;
    dataExpiracao?: true;
    softwareId?: true;
    _all?: true;
};
export type LicencaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaWhereInput;
    orderBy?: Prisma.LicencaOrderByWithRelationInput | Prisma.LicencaOrderByWithRelationInput[];
    cursor?: Prisma.LicencaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LicencaCountAggregateInputType;
    _avg?: LicencaAvgAggregateInputType;
    _sum?: LicencaSumAggregateInputType;
    _min?: LicencaMinAggregateInputType;
    _max?: LicencaMaxAggregateInputType;
};
export type GetLicencaAggregateType<T extends LicencaAggregateArgs> = {
    [P in keyof T & keyof AggregateLicenca]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLicenca[P]> : Prisma.GetScalarType<T[P], AggregateLicenca[P]>;
};
export type LicencaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaWhereInput;
    orderBy?: Prisma.LicencaOrderByWithAggregationInput | Prisma.LicencaOrderByWithAggregationInput[];
    by: Prisma.LicencaScalarFieldEnum[] | Prisma.LicencaScalarFieldEnum;
    having?: Prisma.LicencaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LicencaCountAggregateInputType | true;
    _avg?: LicencaAvgAggregateInputType;
    _sum?: LicencaSumAggregateInputType;
    _min?: LicencaMinAggregateInputType;
    _max?: LicencaMaxAggregateInputType;
};
export type LicencaGroupByOutputType = {
    id: number;
    chaveAtivacao: string;
    dataExpiracao: Date | null;
    softwareId: number;
    _count: LicencaCountAggregateOutputType | null;
    _avg: LicencaAvgAggregateOutputType | null;
    _sum: LicencaSumAggregateOutputType | null;
    _min: LicencaMinAggregateOutputType | null;
    _max: LicencaMaxAggregateOutputType | null;
};
export type GetLicencaGroupByPayload<T extends LicencaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LicencaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LicencaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LicencaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LicencaGroupByOutputType[P]>;
}>>;
export type LicencaWhereInput = {
    AND?: Prisma.LicencaWhereInput | Prisma.LicencaWhereInput[];
    OR?: Prisma.LicencaWhereInput[];
    NOT?: Prisma.LicencaWhereInput | Prisma.LicencaWhereInput[];
    id?: Prisma.IntFilter<"Licenca"> | number;
    chaveAtivacao?: Prisma.StringFilter<"Licenca"> | string;
    dataExpiracao?: Prisma.DateTimeNullableFilter<"Licenca"> | Date | string | null;
    softwareId?: Prisma.IntFilter<"Licenca"> | number;
    software?: Prisma.XOR<Prisma.SoftwareScalarRelationFilter, Prisma.SoftwareWhereInput>;
    instacoes?: Prisma.LicencaAtivoListRelationFilter;
};
export type LicencaOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    chaveAtivacao?: Prisma.SortOrder;
    dataExpiracao?: Prisma.SortOrderInput | Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
    software?: Prisma.SoftwareOrderByWithRelationInput;
    instacoes?: Prisma.LicencaAtivoOrderByRelationAggregateInput;
};
export type LicencaWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    chaveAtivacao?: string;
    AND?: Prisma.LicencaWhereInput | Prisma.LicencaWhereInput[];
    OR?: Prisma.LicencaWhereInput[];
    NOT?: Prisma.LicencaWhereInput | Prisma.LicencaWhereInput[];
    dataExpiracao?: Prisma.DateTimeNullableFilter<"Licenca"> | Date | string | null;
    softwareId?: Prisma.IntFilter<"Licenca"> | number;
    software?: Prisma.XOR<Prisma.SoftwareScalarRelationFilter, Prisma.SoftwareWhereInput>;
    instacoes?: Prisma.LicencaAtivoListRelationFilter;
}, "id" | "chaveAtivacao">;
export type LicencaOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    chaveAtivacao?: Prisma.SortOrder;
    dataExpiracao?: Prisma.SortOrderInput | Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
    _count?: Prisma.LicencaCountOrderByAggregateInput;
    _avg?: Prisma.LicencaAvgOrderByAggregateInput;
    _max?: Prisma.LicencaMaxOrderByAggregateInput;
    _min?: Prisma.LicencaMinOrderByAggregateInput;
    _sum?: Prisma.LicencaSumOrderByAggregateInput;
};
export type LicencaScalarWhereWithAggregatesInput = {
    AND?: Prisma.LicencaScalarWhereWithAggregatesInput | Prisma.LicencaScalarWhereWithAggregatesInput[];
    OR?: Prisma.LicencaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LicencaScalarWhereWithAggregatesInput | Prisma.LicencaScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Licenca"> | number;
    chaveAtivacao?: Prisma.StringWithAggregatesFilter<"Licenca"> | string;
    dataExpiracao?: Prisma.DateTimeNullableWithAggregatesFilter<"Licenca"> | Date | string | null;
    softwareId?: Prisma.IntWithAggregatesFilter<"Licenca"> | number;
};
export type LicencaCreateInput = {
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    software: Prisma.SoftwareCreateNestedOneWithoutLicencasInput;
    instacoes?: Prisma.LicencaAtivoCreateNestedManyWithoutLicencaInput;
};
export type LicencaUncheckedCreateInput = {
    id?: number;
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    softwareId: number;
    instacoes?: Prisma.LicencaAtivoUncheckedCreateNestedManyWithoutLicencaInput;
};
export type LicencaUpdateInput = {
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    software?: Prisma.SoftwareUpdateOneRequiredWithoutLicencasNestedInput;
    instacoes?: Prisma.LicencaAtivoUpdateManyWithoutLicencaNestedInput;
};
export type LicencaUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
    instacoes?: Prisma.LicencaAtivoUncheckedUpdateManyWithoutLicencaNestedInput;
};
export type LicencaCreateManyInput = {
    id?: number;
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    softwareId: number;
};
export type LicencaUpdateManyMutationInput = {
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LicencaUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type LicencaListRelationFilter = {
    every?: Prisma.LicencaWhereInput;
    some?: Prisma.LicencaWhereInput;
    none?: Prisma.LicencaWhereInput;
};
export type LicencaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LicencaCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chaveAtivacao?: Prisma.SortOrder;
    dataExpiracao?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type LicencaAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type LicencaMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chaveAtivacao?: Prisma.SortOrder;
    dataExpiracao?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type LicencaMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    chaveAtivacao?: Prisma.SortOrder;
    dataExpiracao?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type LicencaSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    softwareId?: Prisma.SortOrder;
};
export type LicencaScalarRelationFilter = {
    is?: Prisma.LicencaWhereInput;
    isNot?: Prisma.LicencaWhereInput;
};
export type LicencaCreateNestedManyWithoutSoftwareInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput> | Prisma.LicencaCreateWithoutSoftwareInput[] | Prisma.LicencaUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutSoftwareInput | Prisma.LicencaCreateOrConnectWithoutSoftwareInput[];
    createMany?: Prisma.LicencaCreateManySoftwareInputEnvelope;
    connect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
};
export type LicencaUncheckedCreateNestedManyWithoutSoftwareInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput> | Prisma.LicencaCreateWithoutSoftwareInput[] | Prisma.LicencaUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutSoftwareInput | Prisma.LicencaCreateOrConnectWithoutSoftwareInput[];
    createMany?: Prisma.LicencaCreateManySoftwareInputEnvelope;
    connect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
};
export type LicencaUpdateManyWithoutSoftwareNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput> | Prisma.LicencaCreateWithoutSoftwareInput[] | Prisma.LicencaUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutSoftwareInput | Prisma.LicencaCreateOrConnectWithoutSoftwareInput[];
    upsert?: Prisma.LicencaUpsertWithWhereUniqueWithoutSoftwareInput | Prisma.LicencaUpsertWithWhereUniqueWithoutSoftwareInput[];
    createMany?: Prisma.LicencaCreateManySoftwareInputEnvelope;
    set?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    disconnect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    delete?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    connect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    update?: Prisma.LicencaUpdateWithWhereUniqueWithoutSoftwareInput | Prisma.LicencaUpdateWithWhereUniqueWithoutSoftwareInput[];
    updateMany?: Prisma.LicencaUpdateManyWithWhereWithoutSoftwareInput | Prisma.LicencaUpdateManyWithWhereWithoutSoftwareInput[];
    deleteMany?: Prisma.LicencaScalarWhereInput | Prisma.LicencaScalarWhereInput[];
};
export type LicencaUncheckedUpdateManyWithoutSoftwareNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput> | Prisma.LicencaCreateWithoutSoftwareInput[] | Prisma.LicencaUncheckedCreateWithoutSoftwareInput[];
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutSoftwareInput | Prisma.LicencaCreateOrConnectWithoutSoftwareInput[];
    upsert?: Prisma.LicencaUpsertWithWhereUniqueWithoutSoftwareInput | Prisma.LicencaUpsertWithWhereUniqueWithoutSoftwareInput[];
    createMany?: Prisma.LicencaCreateManySoftwareInputEnvelope;
    set?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    disconnect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    delete?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    connect?: Prisma.LicencaWhereUniqueInput | Prisma.LicencaWhereUniqueInput[];
    update?: Prisma.LicencaUpdateWithWhereUniqueWithoutSoftwareInput | Prisma.LicencaUpdateWithWhereUniqueWithoutSoftwareInput[];
    updateMany?: Prisma.LicencaUpdateManyWithWhereWithoutSoftwareInput | Prisma.LicencaUpdateManyWithWhereWithoutSoftwareInput[];
    deleteMany?: Prisma.LicencaScalarWhereInput | Prisma.LicencaScalarWhereInput[];
};
export type LicencaCreateNestedOneWithoutInstacoesInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutInstacoesInput, Prisma.LicencaUncheckedCreateWithoutInstacoesInput>;
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutInstacoesInput;
    connect?: Prisma.LicencaWhereUniqueInput;
};
export type LicencaUpdateOneRequiredWithoutInstacoesNestedInput = {
    create?: Prisma.XOR<Prisma.LicencaCreateWithoutInstacoesInput, Prisma.LicencaUncheckedCreateWithoutInstacoesInput>;
    connectOrCreate?: Prisma.LicencaCreateOrConnectWithoutInstacoesInput;
    upsert?: Prisma.LicencaUpsertWithoutInstacoesInput;
    connect?: Prisma.LicencaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LicencaUpdateToOneWithWhereWithoutInstacoesInput, Prisma.LicencaUpdateWithoutInstacoesInput>, Prisma.LicencaUncheckedUpdateWithoutInstacoesInput>;
};
export type LicencaCreateWithoutSoftwareInput = {
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    instacoes?: Prisma.LicencaAtivoCreateNestedManyWithoutLicencaInput;
};
export type LicencaUncheckedCreateWithoutSoftwareInput = {
    id?: number;
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    instacoes?: Prisma.LicencaAtivoUncheckedCreateNestedManyWithoutLicencaInput;
};
export type LicencaCreateOrConnectWithoutSoftwareInput = {
    where: Prisma.LicencaWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput>;
};
export type LicencaCreateManySoftwareInputEnvelope = {
    data: Prisma.LicencaCreateManySoftwareInput | Prisma.LicencaCreateManySoftwareInput[];
    skipDuplicates?: boolean;
};
export type LicencaUpsertWithWhereUniqueWithoutSoftwareInput = {
    where: Prisma.LicencaWhereUniqueInput;
    update: Prisma.XOR<Prisma.LicencaUpdateWithoutSoftwareInput, Prisma.LicencaUncheckedUpdateWithoutSoftwareInput>;
    create: Prisma.XOR<Prisma.LicencaCreateWithoutSoftwareInput, Prisma.LicencaUncheckedCreateWithoutSoftwareInput>;
};
export type LicencaUpdateWithWhereUniqueWithoutSoftwareInput = {
    where: Prisma.LicencaWhereUniqueInput;
    data: Prisma.XOR<Prisma.LicencaUpdateWithoutSoftwareInput, Prisma.LicencaUncheckedUpdateWithoutSoftwareInput>;
};
export type LicencaUpdateManyWithWhereWithoutSoftwareInput = {
    where: Prisma.LicencaScalarWhereInput;
    data: Prisma.XOR<Prisma.LicencaUpdateManyMutationInput, Prisma.LicencaUncheckedUpdateManyWithoutSoftwareInput>;
};
export type LicencaScalarWhereInput = {
    AND?: Prisma.LicencaScalarWhereInput | Prisma.LicencaScalarWhereInput[];
    OR?: Prisma.LicencaScalarWhereInput[];
    NOT?: Prisma.LicencaScalarWhereInput | Prisma.LicencaScalarWhereInput[];
    id?: Prisma.IntFilter<"Licenca"> | number;
    chaveAtivacao?: Prisma.StringFilter<"Licenca"> | string;
    dataExpiracao?: Prisma.DateTimeNullableFilter<"Licenca"> | Date | string | null;
    softwareId?: Prisma.IntFilter<"Licenca"> | number;
};
export type LicencaCreateWithoutInstacoesInput = {
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    software: Prisma.SoftwareCreateNestedOneWithoutLicencasInput;
};
export type LicencaUncheckedCreateWithoutInstacoesInput = {
    id?: number;
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
    softwareId: number;
};
export type LicencaCreateOrConnectWithoutInstacoesInput = {
    where: Prisma.LicencaWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaCreateWithoutInstacoesInput, Prisma.LicencaUncheckedCreateWithoutInstacoesInput>;
};
export type LicencaUpsertWithoutInstacoesInput = {
    update: Prisma.XOR<Prisma.LicencaUpdateWithoutInstacoesInput, Prisma.LicencaUncheckedUpdateWithoutInstacoesInput>;
    create: Prisma.XOR<Prisma.LicencaCreateWithoutInstacoesInput, Prisma.LicencaUncheckedCreateWithoutInstacoesInput>;
    where?: Prisma.LicencaWhereInput;
};
export type LicencaUpdateToOneWithWhereWithoutInstacoesInput = {
    where?: Prisma.LicencaWhereInput;
    data: Prisma.XOR<Prisma.LicencaUpdateWithoutInstacoesInput, Prisma.LicencaUncheckedUpdateWithoutInstacoesInput>;
};
export type LicencaUpdateWithoutInstacoesInput = {
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    software?: Prisma.SoftwareUpdateOneRequiredWithoutLicencasNestedInput;
};
export type LicencaUncheckedUpdateWithoutInstacoesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    softwareId?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type LicencaCreateManySoftwareInput = {
    id?: number;
    chaveAtivacao: string;
    dataExpiracao?: Date | string | null;
};
export type LicencaUpdateWithoutSoftwareInput = {
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    instacoes?: Prisma.LicencaAtivoUpdateManyWithoutLicencaNestedInput;
};
export type LicencaUncheckedUpdateWithoutSoftwareInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    instacoes?: Prisma.LicencaAtivoUncheckedUpdateManyWithoutLicencaNestedInput;
};
export type LicencaUncheckedUpdateManyWithoutSoftwareInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    chaveAtivacao?: Prisma.StringFieldUpdateOperationsInput | string;
    dataExpiracao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type LicencaCountOutputType = {
    instacoes: number;
};
export type LicencaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    instacoes?: boolean | LicencaCountOutputTypeCountInstacoesArgs;
};
export type LicencaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaCountOutputTypeSelect<ExtArgs> | null;
};
export type LicencaCountOutputTypeCountInstacoesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaAtivoWhereInput;
};
export type LicencaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chaveAtivacao?: boolean;
    dataExpiracao?: boolean;
    softwareId?: boolean;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
    instacoes?: boolean | Prisma.Licenca$instacoesArgs<ExtArgs>;
    _count?: boolean | Prisma.LicencaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licenca"]>;
export type LicencaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chaveAtivacao?: boolean;
    dataExpiracao?: boolean;
    softwareId?: boolean;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licenca"]>;
export type LicencaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    chaveAtivacao?: boolean;
    dataExpiracao?: boolean;
    softwareId?: boolean;
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["licenca"]>;
export type LicencaSelectScalar = {
    id?: boolean;
    chaveAtivacao?: boolean;
    dataExpiracao?: boolean;
    softwareId?: boolean;
};
export type LicencaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "chaveAtivacao" | "dataExpiracao" | "softwareId", ExtArgs["result"]["licenca"]>;
export type LicencaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
    instacoes?: boolean | Prisma.Licenca$instacoesArgs<ExtArgs>;
    _count?: boolean | Prisma.LicencaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LicencaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
};
export type LicencaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    software?: boolean | Prisma.SoftwareDefaultArgs<ExtArgs>;
};
export type $LicencaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Licenca";
    objects: {
        software: Prisma.$SoftwarePayload<ExtArgs>;
        instacoes: Prisma.$LicencaAtivoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        chaveAtivacao: string;
        dataExpiracao: Date | null;
        softwareId: number;
    }, ExtArgs["result"]["licenca"]>;
    composites: {};
};
export type LicencaGetPayload<S extends boolean | null | undefined | LicencaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LicencaPayload, S>;
export type LicencaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LicencaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LicencaCountAggregateInputType | true;
};
export interface LicencaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Licenca'];
        meta: {
            name: 'Licenca';
        };
    };
    findUnique<T extends LicencaFindUniqueArgs>(args: Prisma.SelectSubset<T, LicencaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LicencaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LicencaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LicencaFindFirstArgs>(args?: Prisma.SelectSubset<T, LicencaFindFirstArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LicencaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LicencaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LicencaFindManyArgs>(args?: Prisma.SelectSubset<T, LicencaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LicencaCreateArgs>(args: Prisma.SelectSubset<T, LicencaCreateArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LicencaCreateManyArgs>(args?: Prisma.SelectSubset<T, LicencaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LicencaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LicencaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LicencaDeleteArgs>(args: Prisma.SelectSubset<T, LicencaDeleteArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LicencaUpdateArgs>(args: Prisma.SelectSubset<T, LicencaUpdateArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LicencaDeleteManyArgs>(args?: Prisma.SelectSubset<T, LicencaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LicencaUpdateManyArgs>(args: Prisma.SelectSubset<T, LicencaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LicencaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LicencaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LicencaUpsertArgs>(args: Prisma.SelectSubset<T, LicencaUpsertArgs<ExtArgs>>): Prisma.Prisma__LicencaClient<runtime.Types.Result.GetResult<Prisma.$LicencaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LicencaCountArgs>(args?: Prisma.Subset<T, LicencaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LicencaCountAggregateOutputType> : number>;
    aggregate<T extends LicencaAggregateArgs>(args: Prisma.Subset<T, LicencaAggregateArgs>): Prisma.PrismaPromise<GetLicencaAggregateType<T>>;
    groupBy<T extends LicencaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LicencaGroupByArgs['orderBy'];
    } : {
        orderBy?: LicencaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LicencaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLicencaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LicencaFieldRefs;
}
export interface Prisma__LicencaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    software<T extends Prisma.SoftwareDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SoftwareDefaultArgs<ExtArgs>>): Prisma.Prisma__SoftwareClient<runtime.Types.Result.GetResult<Prisma.$SoftwarePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    instacoes<T extends Prisma.Licenca$instacoesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Licenca$instacoesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LicencaAtivoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LicencaFieldRefs {
    readonly id: Prisma.FieldRef<"Licenca", 'Int'>;
    readonly chaveAtivacao: Prisma.FieldRef<"Licenca", 'String'>;
    readonly dataExpiracao: Prisma.FieldRef<"Licenca", 'DateTime'>;
    readonly softwareId: Prisma.FieldRef<"Licenca", 'Int'>;
}
export type LicencaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where: Prisma.LicencaWhereUniqueInput;
};
export type LicencaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where: Prisma.LicencaWhereUniqueInput;
};
export type LicencaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where?: Prisma.LicencaWhereInput;
    orderBy?: Prisma.LicencaOrderByWithRelationInput | Prisma.LicencaOrderByWithRelationInput[];
    cursor?: Prisma.LicencaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaScalarFieldEnum | Prisma.LicencaScalarFieldEnum[];
};
export type LicencaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where?: Prisma.LicencaWhereInput;
    orderBy?: Prisma.LicencaOrderByWithRelationInput | Prisma.LicencaOrderByWithRelationInput[];
    cursor?: Prisma.LicencaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaScalarFieldEnum | Prisma.LicencaScalarFieldEnum[];
};
export type LicencaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where?: Prisma.LicencaWhereInput;
    orderBy?: Prisma.LicencaOrderByWithRelationInput | Prisma.LicencaOrderByWithRelationInput[];
    cursor?: Prisma.LicencaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LicencaScalarFieldEnum | Prisma.LicencaScalarFieldEnum[];
};
export type LicencaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaCreateInput, Prisma.LicencaUncheckedCreateInput>;
};
export type LicencaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LicencaCreateManyInput | Prisma.LicencaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LicencaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    data: Prisma.LicencaCreateManyInput | Prisma.LicencaCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LicencaIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LicencaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaUpdateInput, Prisma.LicencaUncheckedUpdateInput>;
    where: Prisma.LicencaWhereUniqueInput;
};
export type LicencaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LicencaUpdateManyMutationInput, Prisma.LicencaUncheckedUpdateManyInput>;
    where?: Prisma.LicencaWhereInput;
    limit?: number;
};
export type LicencaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LicencaUpdateManyMutationInput, Prisma.LicencaUncheckedUpdateManyInput>;
    where?: Prisma.LicencaWhereInput;
    limit?: number;
    include?: Prisma.LicencaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LicencaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where: Prisma.LicencaWhereUniqueInput;
    create: Prisma.XOR<Prisma.LicencaCreateInput, Prisma.LicencaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LicencaUpdateInput, Prisma.LicencaUncheckedUpdateInput>;
};
export type LicencaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
    where: Prisma.LicencaWhereUniqueInput;
};
export type LicencaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LicencaWhereInput;
    limit?: number;
};
export type Licenca$instacoesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LicencaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LicencaSelect<ExtArgs> | null;
    omit?: Prisma.LicencaOmit<ExtArgs> | null;
    include?: Prisma.LicencaInclude<ExtArgs> | null;
};
