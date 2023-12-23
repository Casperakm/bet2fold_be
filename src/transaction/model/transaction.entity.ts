import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, } from 'typeorm';
import { BaseEntity } from '../../shared/base-model/base-entity';
import { TransactionType } from './bank.enum';
import { LocalBankEntity } from 'src/local-bank/model/local-bank.entity';
import { CustomerEntity } from 'src/customer/models/customer.entity';

@Entity('money_transaction', {
  orderBy: {
    id: "DESC"
  }
})
export class MoneyTransactionEntity extends BaseEntity {

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  img_url: string;

  @ApiProperty()
  @Column()
  bank_id: string;

  @ApiProperty()
  @Column()
  user_id?: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  approved_time?: Date

  @ApiProperty()
  @Column()
  type: TransactionType

  @ApiProperty()
  @Column()
  status: string

  @ApiProperty()
  @Column()
  transaction_id: string

  @ApiProperty()
  @Column({ nullable: true })
  note?: string

  @ManyToOne(() => LocalBankEntity, (user) => user.transactions)
  bank: LocalBankEntity

  @ManyToOne(() => CustomerEntity, (user) => user.transactions)
  user: CustomerEntity

}
