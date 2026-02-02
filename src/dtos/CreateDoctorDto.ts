import { IsString, IsNotEmpty, IsEmail, IsDateString, IsOptional, IsNumber } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  identificationNumber!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  dateOfBirth!: string;

  @IsString()
  @IsNotEmpty()
  specialty!: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber!: string;

  @IsNumber()
  @IsOptional()
  consultationFee?: number;

  @IsNumber()
  @IsOptional()
  yearsOfExperience?: number;
}
