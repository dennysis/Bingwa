import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('CustomerService', () => {
  let service: CustomerService;
  let repository: Repository<Customer>;

  const mockCustomerRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  };

  const mockCustomer = {
    id: 1,
    name: 'Test Customer',
    email: 'test@example.com',
    phone: '1234567890',
    companyName: 'Test Company',
    address: 'Test Address'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockCustomerRepository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
    
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);
      mockCustomerRepository.create.mockReturnValue(mockCustomer);
      mockCustomerRepository.save.mockResolvedValue(mockCustomer);

      const createCustomerDto: CreateCustomerDto = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '1234567890',
        companyName: 'Test Company',
        address: 'Test Address'
      };

      const result = await service.createCustomer(createCustomerDto);
      expect(result).toEqual(mockCustomer);
    });

    it('should throw ConflictException if customer email exists', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      const createCustomerDto: CreateCustomerDto = {
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '1234567890',
        companyName: 'Test Company',
        address: 'Test Address'
      };

      await expect(service.createCustomer(createCustomerDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAllCustomers', () => {
    it('should return an array of customers', async () => {
      const customers = [mockCustomer];
      mockCustomerRepository.find.mockResolvedValue(customers);

      const result = await service.findAllCustomers();
      expect(result).toEqual(customers);
    });
  });

  describe('findCustomerById', () => {
    it('should return a customer by id', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);

      const result = await service.findCustomerById(1);
      expect(result).toEqual(mockCustomer);
    });

    it('should throw NotFoundException if customer not found', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.findCustomerById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer successfully', async () => {
      const updateDto = {
        name: 'Updated Name',
        email: 'updated@example.com'
      };

      const updatedCustomer = {
        ...mockCustomer,
        ...updateDto
      };

      mockCustomerRepository.findOne.mockResolvedValueOnce(mockCustomer);
      mockCustomerRepository.update.mockResolvedValue({ affected: 1 });
      mockCustomerRepository.findOne.mockResolvedValueOnce(updatedCustomer);

      const result = await service.updateCustomer(1, updateDto);
      expect(result).toEqual(updatedCustomer);
    });

    it('should throw NotFoundException when updating non-existent customer', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.updateCustomer(999, { name: 'Updated Name' } as CreateCustomerDto))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('removeCustomer', () => {
    it('should remove a customer successfully', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(mockCustomer);
      mockCustomerRepository.remove.mockResolvedValue(mockCustomer);

      await service.removeCustomer(1);
      expect(mockCustomerRepository.remove).toHaveBeenCalledWith(mockCustomer);
    });

    it('should throw NotFoundException when removing non-existent customer', async () => {
      mockCustomerRepository.findOne.mockResolvedValue(null);

      await expect(service.removeCustomer(999)).rejects.toThrow(NotFoundException);
    });
  });
});
