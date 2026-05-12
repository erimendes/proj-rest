import { Injectable } from '@nestjs/common';
import { InventoryRepository } from './repositories/inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async syncBatch(items: any[]) {
    for (const item of items) {
      await this.repository.upsertAtivo(item);
    }
  }
}
