import { IsOptional, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustomerDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address?: string;

    // Add other fields as necessary
}