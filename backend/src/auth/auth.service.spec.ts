import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        first_name: 'Test',
        last_name: 'User',
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      
      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toBeDefined();
      expect((result as any).password).toBeUndefined();
    });

    it('should return null when user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      
      const result = await service.validateUser('test@example.com', 'password123');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        role: 'user',
        first_name: 'Test',
        last_name: 'User',
        phone_number: '',
        address: '',
        kra_pin: '',
        password: '',
        created_at: new Date(),
        updated_at: new Date()
      };

      const mockToken = 'jwt-token';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(mockUser);
      expect(result.access_token).toBe(mockToken);
      expect(result.user).toBeDefined();
    });  });

  describe('register', () => {
    it('should create a new user and return user data without password', async () => {
      const registerData = {
        email: 'new@example.com',
        password: 'password123',
        first_name: 'New',
        last_name: 'User',
        phone_number: '',
        address: '',
        kra_pin: '',
        role: 'user'
      };

      const savedUser = {
        id: 1,
        ...registerData,
        password: await bcrypt.hash(registerData.password, 10),
      };

      mockUserRepository.create.mockReturnValue(savedUser);
      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.register(registerData);
      expect('password' in result).toBe(false);
      expect(result.email).toBe(registerData.email);
    });  });

  describe('validateToken', () => {
    it('should return user data when token is valid', async () => {
      const mockPayload = { sub: 1, email: 'test@example.com' };
      const mockUser = {
        id: 1,
        email: 'test@example.com',
      };

      mockJwtService.verify.mockResolvedValue(mockPayload);
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.validateToken('valid-token');
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException when token is invalid', async () => {
      mockJwtService.verify.mockRejectedValue(new Error());

      await expect(service.validateToken('invalid-token'))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
