import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { UpdateAdminDto } from './dto/update-admin.dto.js';

@Injectable()
export class AdminService {
  create(dto: CreateAdminDto) { return 'add admin'; }
  findAll() { return 'all admins'; }
  findOne(id: number) { return `admin #${id}`; }
  update(id: number, dto: UpdateAdminDto) { return `update admin #${id}`; }
  remove(id: number) { return `remove admin #${id}`; }
}
