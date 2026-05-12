"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criticidade = exports.SistemaCategoria = exports.AtivoStatus = exports.AtivoTipo = exports.Role = void 0;
exports.Role = {
    USER: 'USER',
    ADMIN: 'ADMIN'
};
exports.AtivoTipo = {
    LAPTOP: 'LAPTOP',
    DESKTOP: 'DESKTOP',
    SERVIDOR_FISICO: 'SERVIDOR_FISICO',
    SERVIDOR_VIRTUAL: 'SERVIDOR_VIRTUAL',
    SWITCH: 'SWITCH',
    ROTEADOR: 'ROTEADOR',
    STORAGE: 'STORAGE',
    MONITOR: 'MONITOR'
};
exports.AtivoStatus = {
    DISPONIVEL: 'DISPONIVEL',
    EM_USO: 'EM_USO',
    MANUTENCAO: 'MANUTENCAO',
    DESCARTADO: 'DESCARTADO'
};
exports.SistemaCategoria = {
    ADMINISTRATIVO: 'ADMINISTRATIVO',
    OPERACIONAL: 'OPERACIONAL'
};
exports.Criticidade = {
    BAIXA: 'BAIXA',
    MEDIA: 'MEDIA',
    ALTA: 'ALTA',
    CRITICA: 'CRITICA'
};
//# sourceMappingURL=enums.js.map