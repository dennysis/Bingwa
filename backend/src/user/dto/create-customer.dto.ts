import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    address: string;

    kra_pin?: string;

    @IsEnum(['Admin', 'Project Manager', 'Engineer'])
    role: string;

    @IsNotEmpty()
    password: string;
}


