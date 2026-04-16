import { Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Dados sensíveis (Apenas ADMIN)' })
  getAdminData() {
    return { 
      message: 'Bem-vindo ao painel de controle.',
      data: this.adminService.findAll()
    };
  }

  @Get('manager')
  @Roles(Role.MANAGER, Role.ADMIN)
  @ApiOperation({ summary: 'Dados de gerência (ADMIN e MANAGER)' })
  getManagerData() {
    return { 
      message: 'Bem-vindo ao painel de gerência.',
      data: 'Relatórios de vendas e equipe.'
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }
}
