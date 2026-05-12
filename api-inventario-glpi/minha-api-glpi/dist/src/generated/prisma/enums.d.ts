export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AtivoTipo: {
    readonly LAPTOP: "LAPTOP";
    readonly DESKTOP: "DESKTOP";
    readonly SERVIDOR_FISICO: "SERVIDOR_FISICO";
    readonly SERVIDOR_VIRTUAL: "SERVIDOR_VIRTUAL";
    readonly SWITCH: "SWITCH";
    readonly ROTEADOR: "ROTEADOR";
    readonly STORAGE: "STORAGE";
    readonly MONITOR: "MONITOR";
};
export type AtivoTipo = (typeof AtivoTipo)[keyof typeof AtivoTipo];
export declare const AtivoStatus: {
    readonly DISPONIVEL: "DISPONIVEL";
    readonly EM_USO: "EM_USO";
    readonly MANUTENCAO: "MANUTENCAO";
    readonly DESCARTADO: "DESCARTADO";
};
export type AtivoStatus = (typeof AtivoStatus)[keyof typeof AtivoStatus];
export declare const SistemaCategoria: {
    readonly ADMINISTRATIVO: "ADMINISTRATIVO";
    readonly OPERACIONAL: "OPERACIONAL";
};
export type SistemaCategoria = (typeof SistemaCategoria)[keyof typeof SistemaCategoria];
export declare const Criticidade: {
    readonly BAIXA: "BAIXA";
    readonly MEDIA: "MEDIA";
    readonly ALTA: "ALTA";
    readonly CRITICA: "CRITICA";
};
export type Criticidade = (typeof Criticidade)[keyof typeof Criticidade];
