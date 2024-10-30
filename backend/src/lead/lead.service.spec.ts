import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { NotFoundException } from '@nestjs/common';

describe('LeadService', () => {
  let service: LeadService;
  let repository: Repository<Lead>;

  const mockLeadRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockLead = {
    id: 1,
    name: 'Lead Name',
    email: 'lead@example.com',
    phone: '1234567890',
    status: 'new',
    source: 'website',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(Lead),
          useValue: mockLeadRepository,
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    repository = module.get<Repository<Lead>>(getRepositoryToken(Lead));
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLead', () => {
    it('should create a new lead', async () => {
      const createLeadDto: CreateLeadDto = {
        name: 'Lead Name',
        email: 'lead@example.com',
        phone: '1234567890',
        status: 'new',
        source: 'website',
      };

      mockLeadRepository.create.mockReturnValue(mockLead);
      mockLeadRepository.save.mockResolvedValue(mockLead);

      const result = await service.createLead(createLeadDto);
      expect(result).toEqual(mockLead);
      expect(mockLeadRepository.create).toHaveBeenCalledWith(createLeadDto);
      expect(mockLeadRepository.save).toHaveBeenCalledWith(mockLead);
    });
  });

  describe('findAllLeads', () => {
    it('should return an array of leads', async () => {
      const leads = [mockLead];
      mockLeadRepository.find.mockResolvedValue(leads);

      const result = await service.findAllLeads();
      expect(result).toEqual(leads);
      expect(mockLeadRepository.find).toHaveBeenCalled();
    });
  });

  describe('findLeadById', () => {
    it('should return a lead by id', async () => {
      mockLeadRepository.findOne.mockResolvedValue(mockLead);

      const result = await service.findLeadById(1);
      expect(result).toEqual(mockLead);
      expect(mockLeadRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if lead not found', async () => {
      mockLeadRepository.findOne.mockResolvedValue(null);

      await expect(service.findLeadById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateLead', () => {
    it('should update a lead successfully', async () => {
      const updateDto = {
        name: 'Updated Lead',
        status: 'qualified'
      };

      const updatedLead = {
        ...mockLead,
        ...updateDto
      };

      mockLeadRepository.findOne.mockResolvedValueOnce(mockLead);
      mockLeadRepository.update.mockResolvedValue({ affected: 1 });
      mockLeadRepository.findOne.mockResolvedValueOnce(updatedLead);

      const result = await service.updateLead(1, updateDto);
      expect(result).toEqual(updatedLead);
      expect(mockLeadRepository.update).toHaveBeenCalledWith(1, updateDto);
    });

    it('should throw NotFoundException when updating non-existent lead', async () => {
      mockLeadRepository.findOne.mockResolvedValue(null);

      await expect(service.updateLead(999, { name: 'Updated Lead' }))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('removeLead', () => {
    it('should remove a lead successfully', async () => {
      mockLeadRepository.findOne.mockResolvedValue(mockLead);
      mockLeadRepository.remove.mockResolvedValue(mockLead);

      await service.removeLead(1);
      expect(mockLeadRepository.remove).toHaveBeenCalledWith(mockLead);
    });

    it('should throw NotFoundException when removing non-existent lead', async () => {
      mockLeadRepository.findOne.mockResolvedValue(null);

      await expect(service.removeLead(999)).rejects.toThrow(NotFoundException);
    });
  });
});
