export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ComputerType: {
    readonly DESKTOP: "DESKTOP";
    readonly NOTEBOOK: "NOTEBOOK";
    readonly SERVER: "SERVER";
    readonly VM: "VM";
    readonly OTHER: "OTHER";
};
export type ComputerType = (typeof ComputerType)[keyof typeof ComputerType];
export declare const ComputerRole: {
    readonly USER: "USER";
    readonly SERVER: "SERVER";
};
export type ComputerRole = (typeof ComputerRole)[keyof typeof ComputerRole];
