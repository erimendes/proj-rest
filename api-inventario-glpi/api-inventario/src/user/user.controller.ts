import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { UserService } from './user.service.js'
import { UserDto } from './dto/user.dto.js'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js'

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  @ApiOkResponse({ type: [UserDto] })
  findAll() {
    return this.service.findAll()
  }
}
