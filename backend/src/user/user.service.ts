import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-customer.dto'; // Corrected import name
import { UpdateUserDto } from './dto/update-user.dto'; // New DTO for updating user

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userData: CreateUserDto): Promise<User> {
        const userExists = await this.userRepository.findOne({ where: { email: userData.email } });
        if (userExists) {
            throw new ConflictException('User already exists with this email.');
        }
    
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } }); // Specify the ID in the where clause
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id); // Check if the user exists
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id); // Return the updated user
    }

    async remove(id: number): Promise<User> {
        const user = await this.findOne(id);
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return await this.userRepository.remove(user);
      }
}