import { IsOptional, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UpdateLeadDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string; // e.g., 'new', 'contacted', 'qualified', 'converted'

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  source?: string; // e.g., 'website', 'referral', 'ads'
}