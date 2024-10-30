import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({ where: { id } });
  }

  create(project: Project): Promise<Project> {
    return this.projectsRepository.save(project);
  }

  async update(id: number, project: Project): Promise<Project> {
    await this.projectsRepository.update(id, project);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}