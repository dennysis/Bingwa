import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerController', () => {
  let controller: CustomerController;
  let service: CustomerService;

  const mockCustomerService = {
    createCustomer: jest.fn(),
    findAllCustomers: jest.fn(),
    findCustomerById: jest.fn(),
    updateCustomer: jest.fn(),
    removeCustomer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: mockCustomerService,
        },
      ],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        name: 'Customer Name',
        email: 'customer@example.com',
        phone: '1234567890',
        companyName: 'Company Name',
      };

      mockCustomerService.createCustomer.mockResolvedValue(createCustomerDto);

      expect(await controller.create(createCustomerDto)).toEqual(createCustomerDto);
      expect(mockCustomerService.createCustomer).toHaveBeenCalledWith(createCustomerDto);
    });
  });

  // Add tests for findAll, findOne, update, and delete...
});