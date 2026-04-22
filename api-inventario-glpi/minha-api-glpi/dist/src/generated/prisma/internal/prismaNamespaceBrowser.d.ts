import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly Ativo: "Ativo";
    readonly Aplicacao: "Aplicacao";
    readonly ConfigRede: "ConfigRede";
    readonly Software: "Software";
    readonly Licenca: "Licenca";
    readonly LicencaAtivo: "LicencaAtivo";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly name: "name";
    readonly role: "role";
    readonly departamento: "departamento";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly refreshToken: "refreshToken";
    readonly userId: "userId";
    readonly userAgent: "userAgent";
    readonly ip: "ip";
    readonly revoked: "revoked";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const AtivoScalarFieldEnum: {
    readonly id: "id";
    readonly tagPatrimonial: "tagPatrimonial";
    readonly tipo: "tipo";
    readonly fabricante: "fabricante";
    readonly modelo: "modelo";
    readonly numSerie: "numSerie";
    readonly hostname: "hostname";
    readonly cpu: "cpu";
    readonly ram: "ram";
    readonly discoFisico: "discoFisico";
    readonly status: "status";
    readonly emUso: "emUso";
    readonly dataCompra: "dataCompra";
    readonly valor: "valor";
    readonly isVirtualizado: "isVirtualizado";
    readonly hyperVName: "hyperVName";
    readonly hostFisicoId: "hostFisicoId";
    readonly userId: "userId";
    readonly observacoes: "observacoes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AtivoScalarFieldEnum = (typeof AtivoScalarFieldEnum)[keyof typeof AtivoScalarFieldEnum];
export declare const AplicacaoScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly sigla: "sigla";
    readonly descricao: "descricao";
    readonly categoria: "categoria";
    readonly criticidade: "criticidade";
    readonly businessOwner: "businessOwner";
    readonly responsavelTecnico: "responsavelTecnico";
    readonly contatoFuncional: "contatoFuncional";
    readonly fornecedor: "fornecedor";
    readonly janelaOperacao: "janelaOperacao";
    readonly backupInfo: "backupInfo";
    readonly procedimentoRecup: "procedimentoRecup";
    readonly pontoUnicoFalha: "pontoUnicoFalha";
    readonly tecnologiaPrincipal: "tecnologiaPrincipal";
    readonly databaseInfo: "databaseInfo";
    readonly integracoes: "integracoes";
};
export type AplicacaoScalarFieldEnum = (typeof AplicacaoScalarFieldEnum)[keyof typeof AplicacaoScalarFieldEnum];
export declare const ConfigRedeScalarFieldEnum: {
    readonly id: "id";
    readonly ipAddress: "ipAddress";
    readonly macAddress: "macAddress";
    readonly vlan: "vlan";
    readonly portasUTP: "portasUTP";
    readonly portasFibra: "portasFibra";
    readonly storageConect: "storageConect";
    readonly discoStorage: "discoStorage";
    readonly ativoId: "ativoId";
};
export type ConfigRedeScalarFieldEnum = (typeof ConfigRedeScalarFieldEnum)[keyof typeof ConfigRedeScalarFieldEnum];
export declare const SoftwareScalarFieldEnum: {
    readonly id: "id";
    readonly nome: "nome";
    readonly versao: "versao";
    readonly fabricante: "fabricante";
};
export type SoftwareScalarFieldEnum = (typeof SoftwareScalarFieldEnum)[keyof typeof SoftwareScalarFieldEnum];
export declare const LicencaScalarFieldEnum: {
    readonly id: "id";
    readonly chaveAtivacao: "chaveAtivacao";
    readonly dataExpiracao: "dataExpiracao";
    readonly softwareId: "softwareId";
};
export type LicencaScalarFieldEnum = (typeof LicencaScalarFieldEnum)[keyof typeof LicencaScalarFieldEnum];
export declare const LicencaAtivoScalarFieldEnum: {
    readonly id: "id";
    readonly ativoId: "ativoId";
    readonly licencaId: "licencaId";
    readonly dataInstalacao: "dataInstalacao";
};
export type LicencaAtivoScalarFieldEnum = (typeof LicencaAtivoScalarFieldEnum)[keyof typeof LicencaAtivoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
