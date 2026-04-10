import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar novo usuário' })
  register(@Body() body: CreateUserDto) {
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Listar todos os usuários' })
  findAll() {
    return this.service.findAll();
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar meu próprio perfil' })
  updateMe(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.service.update(req.user.userId, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Deletar um usuário (Apenas ADMIN)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
