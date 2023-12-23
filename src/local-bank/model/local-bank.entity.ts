import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../shared/base-model/base-entity';
import { MoneyTransactionEntity } from 'src/transaction/model/transaction.entity';

@Entity('local_bank')
export class LocalBankEntity extends BaseEntity {

  @ApiResponseProperty()
  @Column({ nullable: true })
  account_number: string;

  @ApiResponseProperty()
  @Column({ nullable: true })
  type_name: string;

  @ApiResponseProperty()
  @Column()
  user_id?: number;

  @OneToMany(() => MoneyTransactionEntity, (transaction) => transaction.bank)
  transactions: MoneyTransactionEntity[]
}
