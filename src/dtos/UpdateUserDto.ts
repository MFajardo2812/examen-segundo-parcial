import { IsString, IsOptional, IsEmail, IsNumber } from "class-validator";

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

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

  @IsString()
  @IsOptional()
  specialty?: string;

  @IsNumber()
  @IsOptional()
  consultationFee?: number;

  @IsNumber()
  @IsOptional()
  yearsOfExperience?: number;
}
