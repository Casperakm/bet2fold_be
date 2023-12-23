import { Module } from '@nestjs/common';
import { LocalBankService } from './local-bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalBankEntity } from './model/local-bank.entity';
import { LocalBankController } from './local-bank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocalBankEntity])],
  controllers: [LocalBankController],
  providers: [LocalBankService],
  exports: [LocalBankService],
})
export class LocalBankModule {}
