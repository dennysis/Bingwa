import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
      }
    };
  }

  async register(registerDto: RegisterDto) {
    // Validate that password exists and meets requirements
    if (!registerDto.password || registerDto.password.length < 6) {
        throw new UnauthorizedException('Password must be at least 6 characters long');
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    // Create new user with hashed password
    const user = this.userRepository.create({
        first_name: registerDto.first_name,
        last_name: registerDto.last_name,
        email: registerDto.email,
        phone_number: registerDto.phone_number,
        address: registerDto.address,
        kra_pin: registerDto.kra_pin,
        role: registerDto.role,
        password: hashedPassword
    });

    // Save user to database
    const savedUser = await this.userRepository.save(user);
    
    // Return user data without password
    const { password, ...result } = savedUser;
    return result;
}


  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user || !await bcrypt.compare(oldPassword, user.password)) {
      throw new UnauthorizedException('Invalid current password');
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await this.userRepository.save(user);
    
    return { message: 'Password updated successfully' };
  }
}
