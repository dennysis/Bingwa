import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';

describe('LeadController', () => {
  let controller: LeadController;
  let service: LeadService;

  const mockLeadService = {
    createLead: jest.fn(),
    findAllLeads: jest.fn(),
    findLeadById: jest.fn(),
    updateLead: jest.fn(),
    removeLead: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    controller = module.get<LeadController>(LeadController);
    service = module.get<LeadService>(LeadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a lead', async () => {
      const createLeadDto: CreateLeadDto = {
        name: 'Lead Name',
        email: 'lead@example.com',
        phone: '1234567890',
        status: 'new',
        source: 'website',
      };

      mockLeadService.createLead.mockResolvedValue(createLeadDto);

      expect(await controller.create(createLeadDto)).toEqual(createLeadDto);
      expect(mockLeadService.createLead).toHaveBeenCalledWith(createLeadDto);
    });
  });

  // Add tests for findAll, findOne, update, and delete...
});