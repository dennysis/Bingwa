import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './lead.entity'; // Adjust the path as necessary
import { CreateLeadDto } from './dto/create-lead.dto'; // Define and import your DTO
import { UpdateLeadDto } from './dto/update-lead.dto'; // New DTO for updating lead

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,
  ) {}

  async createLead(data: CreateLeadDto): Promise<Lead> {
    const newLead = this.leadRepository.create(data);
    return await this.leadRepository.save(newLead);
  }

  async findAllLeads(): Promise<Lead[]> {
    return await this.leadRepository.find();
  }

  async findLeadById(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  async updateLead(id: number, updateData: UpdateLeadDto): Promise<Lead> {
    await this.findLeadById(id); // Ensure the lead exists
    await this.leadRepository.update(id, updateData);
    return this.findLeadById(id); // Return the updated lead
  }

  async removeLead(id: number): Promise<void> {
    const lead = await this.findLeadById(id); // Ensure the lead exists
    await this.leadRepository.remove(lead);
  }
}