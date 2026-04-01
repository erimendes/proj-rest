export declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const NotificationPriority: {
    readonly NOT_CLASSIFIED: "NOT_CLASSIFIED";
    readonly INFORMATION: "INFORMATION";
    readonly WARNING: "WARNING";
    readonly AVERAGE: "AVERAGE";
    readonly HIGH: "HIGH";
    readonly DISASTER: "DISASTER";
};
export type NotificationPriority = (typeof NotificationPriority)[keyof typeof NotificationPriority];
export declare const AccountStatusEvent: {
    readonly ACCOUNT_DISABLED: "ACCOUNT_DISABLED";
    readonly ACCOUNT_ENABLED: "ACCOUNT_ENABLED";
};
export type AccountStatusEvent = (typeof AccountStatusEvent)[keyof typeof AccountStatusEvent];
