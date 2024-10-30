import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    changePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        phone_number: '1234567890',
        address: '123 Main St',
        kra_pin: 'KRA123',
        role: 'user'
      };

      const expectedResult = {
        id: 1,
        ...registerDto,
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);
      expect(result).toEqual(expectedResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login a user and return token', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        role: 'user'
      };

      const expectedResult = {
        access_token: 'jwt-token',
        user: user
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login({ user });
      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });
  });
  describe('changePassword', () => {
    it('should change user password', async () => {
      const changePasswordDto: ChangePasswordDto = {
        oldPassword: 'oldPassword123',
        newPassword: 'newPassword123'
      };

      const req = {
        user: { id: 1 }
      };

      const expectedResult = {
        message: 'Password updated successfully'
      };

      mockAuthService.changePassword.mockResolvedValue(expectedResult);

      const result = await controller.changePassword(req, changePasswordDto);
      expect(result).toEqual(expectedResult);
      expect(mockAuthService.changePassword).toHaveBeenCalledWith(
        req.user.id,
        changePasswordDto.oldPassword,
        changePasswordDto.newPassword,
        changePasswordDto
      );
    });
});

});
