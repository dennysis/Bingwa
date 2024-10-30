import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository'; // Ensure this is correct

@Module({
  imports: [TypeOrmModule.forFeature([Customer])], // Adjust if needed
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService], // Export if used in other modules
})
export class CustomerModule {}