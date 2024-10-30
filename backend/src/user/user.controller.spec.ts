import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-customer.dto'; // Ensure this path is correct

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'Admin', // Add role
        password: 'password123', // Add password
      };

      mockUserService.create.mockResolvedValue(createUserDto);

      expect(await controller.create(createUserDto)).toEqual(createUserDto);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  // Add tests for findAll, findOne, update, and delete...
});