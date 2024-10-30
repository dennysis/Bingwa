import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])], // Register Role entity
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService], 
})
export class RoleModule {}