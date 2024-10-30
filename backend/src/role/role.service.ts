import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  create(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  update(id: number, role: Role): Promise<Role> {
    return this.rolesRepository.save({ ...role, id });
  }

  delete(id: number): Promise<void> {
    return this.rolesRepository.delete(id).then(() => {});
  }
}