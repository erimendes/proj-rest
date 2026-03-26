// src/admin/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../generated/prisma/enums.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // precisa estar logado e ter role
export class AdminController {
  @Get()
  @Roles(Role.ADMIN)
  getAdminData() {
    return { secret: 'Only admins can see this' };
  }

  @Get('manager')
  @Roles(Role.MANAGER, Role.ADMIN)
  getManagerData() {
    return { secret: 'Admins and managers can see this' };
  }
}
