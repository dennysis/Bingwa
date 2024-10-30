import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Post()
  create(@Body() project: Project): Promise<Project> {
    return this.projectService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() project: Project): Promise<Project> {
    return this.projectService.update(id, project);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.projectService.delete(id);
  }
}