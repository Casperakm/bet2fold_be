import { ApiResponseProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base-model/base-entity';
import { CustomerEntity } from 'src/customer/models/customer.entity';

@Entity('file_storage')
export class FileStroageEntity extends BaseEntity {

  @ApiResponseProperty()
  @Column()
  file_name: string;

  @ApiResponseProperty()
  @Column()
  url: string;

  @ApiResponseProperty()
  @Column()
  type: string;

  @ApiResponseProperty()
  @Column()
  file_size: number;

  @ApiResponseProperty()
  @Column()
  user_id?: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.files)
  user: CustomerEntity
}
