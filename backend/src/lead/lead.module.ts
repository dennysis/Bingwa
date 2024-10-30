import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity'; // Adjust the path as necessary
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])], // Ensure Lead is registered here
  providers: [LeadService],
  controllers: [LeadController],
})
export class LeadModule {}