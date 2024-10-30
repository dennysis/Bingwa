import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity'; // Adjust the path as necessary
import { CreateCustomerDto } from './dto/create-customer.dto'; // Ensure this DTO is defined
import { UpdateCustomerDto } from './dto/update-customer.dto'; // New DTO for updating customer

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(data: CreateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.customerRepository.findOne({ where: { email: data.email } }); // Assuming email is unique
    if (existingCustomer) {
      throw new ConflictException('Customer already exists with this email.');
    }

    const newCustomer = this.customerRepository.create(data);
    return await this.customerRepository.save(newCustomer);
  }

  async findAllCustomers(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async updateCustomer(id: number, updateData: UpdateCustomerDto): Promise<Customer> {
    await this.findCustomerById(id); // Ensure the customer exists
    await this.customerRepository.update(id, updateData);
    return this.findCustomerById(id); // Return the updated customer
  }

  async removeCustomer(id: number): Promise<void> {
    const customer = await this.findCustomerById(id); // Ensure the customer exists
    await this.customerRepository.remove(customer);
  }
}