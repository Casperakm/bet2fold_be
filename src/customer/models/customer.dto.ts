import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, MinLength, ValidateIf } from 'class-validator';
import { UserRole } from './customer.enum';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty({type:'enum',enum:UserRole,default: UserRole.CUSTOMER})
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiPropertyOptional()
  @ValidateIf(({ email }) => email)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  avatar_url?: string;

  @ApiPropertyOptional()
  nrc?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'date-time',
    example: '2022-01-01T00:00:00Z',
  })
  @ValidateIf(({ dob }) => dob)
  @Transform(({ value }) => new Date(value))
  @IsDate()
  dob?: Date;

}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class OtpLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  otp?: number;
}

