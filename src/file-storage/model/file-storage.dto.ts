import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CustomerEntity } from 'src/customer/models/customer.entity';

export class CreateFileDto {
  @ApiProperty()
  fileName: string
  @ApiProperty()
  url: string
  @ApiProperty()
  type: string
  @ApiProperty()
  user_id: string
  @ApiProperty()
  user: CustomerEntity
}

