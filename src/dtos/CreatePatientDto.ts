import { IsString, IsNotEmpty, IsEmail, IsDateString, IsOptional } from "class-validator";

export class CreatePatientDto {
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
  @IsOptional()
  bloodType?: string;

  @IsString()
  @IsOptional()
  allergies?: string;

  @IsString()
  @IsOptional()
  emergencyContact?: string;

  @IsString()
  @IsOptional()
  emergencyPhone?: string;
}
