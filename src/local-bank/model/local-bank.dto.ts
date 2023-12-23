import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBankDto {

  @ApiProperty()
  @IsNotEmpty()
  type_name: string;

  @ApiPropertyOptional()
  acount_number: string;


}

