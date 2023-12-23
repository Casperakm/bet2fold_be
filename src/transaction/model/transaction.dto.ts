import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionType } from './bank.enum';

export class CreateTransactionDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  img_url: string;

  @ApiProperty()
  @IsNotEmpty()
  bank_id: string;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  type: TransactionType

  @ApiProperty()
  @IsNotEmpty()
  transaction_id: string

  @ApiProperty()
  note?: string

}

