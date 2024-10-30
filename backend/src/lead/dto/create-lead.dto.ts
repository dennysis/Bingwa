import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  status: string; // e.g., 'new', 'contacted', 'qualified', 'converted'

  @IsNotEmpty()
  @IsString()
  source: string; // e.g., 'website', 'referral', 'ads'
}