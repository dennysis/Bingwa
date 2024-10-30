import { IsEmail, IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    first_name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsNotEmpty()
    phone_number?: string;

    @IsOptional()
    @IsNotEmpty()
    address?: string;

    @IsOptional()
    kra_pin?: string;

    @IsOptional()
    @IsEnum(['Admin', 'Project Manager', 'Engineer'])
    role?: string;

    @IsOptional()
    @IsNotEmpty()
    password?: string; // If you want to allow password updates
}