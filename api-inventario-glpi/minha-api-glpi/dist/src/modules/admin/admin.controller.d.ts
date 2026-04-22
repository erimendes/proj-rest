import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAdminData(): {
        message: string;
        data: string;
    };
    getManagerData(): {
        message: string;
        data: string;
    };
    findOne(id: number): string;
}
