import { InventoryRepository } from './repositories/inventory.repository';
export declare class InventoryService {
    private readonly repository;
    constructor(repository: InventoryRepository);
    syncBatch(items: any[]): Promise<void>;
}
