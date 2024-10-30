import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() role: Role): Promise<Role> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.roleService.delete(id);
  }
}