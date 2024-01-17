import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyTransactionEntity } from './model/transaction.entity';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyTransactionEntity])],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
