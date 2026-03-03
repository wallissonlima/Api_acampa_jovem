import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') // 👈 organiza no Swagger
@ApiBearerAuth('access-token') // 👈 ativa cadeado 🔒
@Controller('users')
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(Number(id));
  }
}
