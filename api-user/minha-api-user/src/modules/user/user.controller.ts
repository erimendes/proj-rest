import { 
  Controller, Get, Post, Patch, Delete, Body, 
  Param, UseGuards, Req 
} from '@nestjs/common'; // Removi o ParseIntPipe daqui
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../generated/prisma/client';

@ApiTags('users (Admin Only)')
@ApiBearerAuth() // Swagger pede o Token para todas as rotas deste controller
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN) // 🔥 Bloqueio Global: Só ADMIN acessa qualquer rota aqui
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Provisionar novo usuário (Admin)' })
  @ApiResponse({ status: 201, description: 'Usuário criado mas não logado' })
  create(@Body() body: CreateUserDto) {
    // Retorna apenas os dados do usuário, sem tokens
    return this.service.create(body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar todos os usuários (Apenas ADMIN)' })
  findAll() {
    return this.service.findAll();
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar meu próprio perfil' })
  updateMe(@Req() req: any, @Body() body: UpdateUserDto) {
    // Pegamos o ID da string vinda do token (sub ou userId)
    const userId = req.user.sub || req.user.userId;
    return this.service.update(userId, body);
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
