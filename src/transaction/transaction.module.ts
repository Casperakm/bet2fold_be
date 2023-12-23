import { Module } from '@nestjs/common';
import { ProductTypeService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyTransactionEntity } from './model/transaction.entity';
import { ProductTypeController } from './transaction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyTransactionEntity])],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
