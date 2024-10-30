import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './lead.entity';

@Controller('leads') // Adjusted route to plural for REST conventions
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto): Promise<Lead> {
    return this.leadService.createLead(createLeadDto);
  }

  @Get()
  async findAll(): Promise<Lead[]> {
    return this.leadService.findAllLeads();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Lead> {
    return this.leadService.findLeadById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateLeadDto: UpdateLeadDto): Promise<Lead> {
    return this.leadService.updateLead(id, updateLeadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.leadService.removeLead(id);
  }
}