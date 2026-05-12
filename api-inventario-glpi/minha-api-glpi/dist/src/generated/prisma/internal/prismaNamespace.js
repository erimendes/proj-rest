"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.LicencaAtivoScalarFieldEnum = exports.LicencaScalarFieldEnum = exports.SoftwareScalarFieldEnum = exports.ConfigRedeScalarFieldEnum = exports.AplicacaoScalarFieldEnum = exports.AtivoScalarFieldEnum = exports.SessionScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.7.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Session: 'Session',
    Ativo: 'Ativo',
    Aplicacao: 'Aplicacao',
    ConfigRede: 'ConfigRede',
    Software: 'Software',
    Licenca: 'Licenca',
    LicencaAtivo: 'LicencaAtivo'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    role: 'role',
    departamento: 'departamento',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SessionScalarFieldEnum = {
    id: 'id',
    refreshToken: 'refreshToken',
    userId: 'userId',
    userAgent: 'userAgent',
    ip: 'ip',
    revoked: 'revoked',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
exports.AtivoScalarFieldEnum = {
    id: 'id',
    tagPatrimonial: 'tagPatrimonial',
    tipo: 'tipo',
    fabricante: 'fabricante',
    modelo: 'modelo',
    numSerie: 'numSerie',
    hostname: 'hostname',
    cpu: 'cpu',
    ram: 'ram',
    discoFisico: 'discoFisico',
    status: 'status',
    emUso: 'emUso',
    dataCompra: 'dataCompra',
    valor: 'valor',
    isVirtualizado: 'isVirtualizado',
    hyperVName: 'hyperVName',
    hostFisicoId: 'hostFisicoId',
    userId: 'userId',
    observacoes: 'observacoes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AplicacaoScalarFieldEnum = {
    id: 'id',
    nome: 'nome',
    sigla: 'sigla',
    descricao: 'descricao',
    categoria: 'categoria',
    criticidade: 'criticidade',
    businessOwner: 'businessOwner',
    responsavelTecnico: 'responsavelTecnico',
    contatoFuncional: 'contatoFuncional',
    fornecedor: 'fornecedor',
    janelaOperacao: 'janelaOperacao',
    backupInfo: 'backupInfo',
    procedimentoRecup: 'procedimentoRecup',
    pontoUnicoFalha: 'pontoUnicoFalha',
    tecnologiaPrincipal: 'tecnologiaPrincipal',
    databaseInfo: 'databaseInfo',
    integracoes: 'integracoes'
};
exports.ConfigRedeScalarFieldEnum = {
    id: 'id',
    ipAddress: 'ipAddress',
    macAddress: 'macAddress',
    vlan: 'vlan',
    portasUTP: 'portasUTP',
    portasFibra: 'portasFibra',
    storageConect: 'storageConect',
    discoStorage: 'discoStorage',
    ativoId: 'ativoId'
};
exports.SoftwareScalarFieldEnum = {
    id: 'id',
    nome: 'nome',
    versao: 'versao',
    fabricante: 'fabricante'
};
exports.LicencaScalarFieldEnum = {
    id: 'id',
    chaveAtivacao: 'chaveAtivacao',
    dataExpiracao: 'dataExpiracao',
    softwareId: 'softwareId'
};
exports.LicencaAtivoScalarFieldEnum = {
    id: 'id',
    ativoId: 'ativoId',
    licencaId: 'licencaId',
    dataInstalacao: 'dataInstalacao'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map