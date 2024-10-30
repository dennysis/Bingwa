import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-customer.dto'; // Ensure this path is correct
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin',
        password: 'password123',
      };

      const user: User = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(result).toEqual(user);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user: User = {
        id: 1,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        phone_number: '9876543210',
        address: '456 Main St',
        kra_pin: 'KRA456',
        role: 'Engineer',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      expect(await service.findOne(1)).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin',
      };

      const updatedUser: User = {
        id: 1,
        ...updateUserDto,
        password: 'password123', // Added missing password property
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(updatedUser);
      mockUserRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual(expect.objectContaining({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin',
      }));
      expect(mockUserRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      }));
    });

    it('should throw NotFoundException if user to update is not found', async () => {
      const updateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin',
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.update(1, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user: User = {
        id: 1,
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane@example.com',
        phone_number: '9876543210',
        address: '456 Main St',
        kra_pin: 'KRA456',
        role: 'Engineer',
        password: 'password123',
        created_at: new Date(),
        updated_at: new Date(),
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockUserRepository.remove.mockResolvedValue(user);

      const result = await service.remove(1);
      expect(result).toEqual(user);
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
    });

    it('should throw NotFoundException if user to remove is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane@example.com',
          phone_number: '9876543210',
          address: '456 Main St',
          kra_pin: 'KRA456',
          role: 'Engineer',
          password: 'password123',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Smith',
          email: 'john@example.com',
          phone_number: '1234567890',
          address: '123 Main St',
          kra_pin: 'KRA123',
          role: 'Admin',
          password: 'password123',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockUserRepository.find.mockResolvedValue(users);
      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });
});