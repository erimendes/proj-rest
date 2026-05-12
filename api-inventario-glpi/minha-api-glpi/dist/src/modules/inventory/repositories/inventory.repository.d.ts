import { PrismaService } from '../../../database/prisma.service';
import { AtivoStatus, AtivoTipo } from '../../../generated/prisma/enums';
export declare class InventoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertAtivo(data: any): Promise<{
        id: number;
        tagPatrimonial: string;
        numSerie: string;
        hostname: string | null;
        tipo: AtivoTipo;
        fabricante: string;
        modelo: string;
        cpu: string | null;
        ram: string | null;
        discoFisico: string | null;
        status: AtivoStatus;
        emUso: boolean;
        dataCompra: Date | null;
        valor: import("@prisma/client-runtime-utils").Decimal | null;
        isVirtualizado: boolean;
        hyperVName: string | null;
        hostFisicoId: number | null;
        userId: string | null;
        observacoes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByTag(tag: string): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            email: string;
            password: string;
            role: import("../../../generated/prisma/enums").Role;
            departamento: string | null;
        } | null;
        configRede: {
            id: number;
            ipAddress: string | null;
            macAddress: string;
            vlan: number | null;
            portasUTP: number | null;
            portasFibra: number | null;
            storageConect: string | null;
            discoStorage: string | null;
            ativoId: number;
        } | null;
    } & {
        id: number;
        tagPatrimonial: string;
        numSerie: string;
        hostname: string | null;
        tipo: AtivoTipo;
        fabricante: string;
        modelo: string;
        cpu: string | null;
        ram: string | null;
        discoFisico: string | null;
        status: AtivoStatus;
        emUso: boolean;
        dataCompra: Date | null;
        valor: import("@prisma/client-runtime-utils").Decimal | null;
        isVirtualizado: boolean;
        hyperVName: string | null;
        hostFisicoId: number | null;
        userId: string | null;
        observacoes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
