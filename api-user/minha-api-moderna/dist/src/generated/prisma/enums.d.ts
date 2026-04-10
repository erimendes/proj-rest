export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
};
export type Role = (typeof Role)[keyof typeof Role];
