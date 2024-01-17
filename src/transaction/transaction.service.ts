import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoneyTransactionEntity } from './model/transaction.entity';
import { Observable, from, switchMap } from 'rxjs';
import { CreateTransactionDto } from './model/transaction.dto';
import { SuccessAPI } from 'src/shared/util/success-api';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(MoneyTransactionEntity)
    private readonly typeRepository: Repository<MoneyTransactionEntity>,
  ) { }

  findAll(user_id: number): Observable<MoneyTransactionEntity[]> {
    return from(this.typeRepository.find({ where: { user_id: user_id } }));
  }

  create(transaction: CreateTransactionDto, userId: number): Observable<MoneyTransactionEntity> {
    return from(this.findTransactionByRefId(transaction.transaction_id)).pipe(switchMap((result: MoneyTransactionEntity) => {
      if (result) {
        throw new BadRequestException('Transaction Id is Wrong');
      }
      return from(this.typeRepository.save({ ...transaction, user_id: userId }))
    }))
  }

  // async create(category: any, shop_id: number): Promise<MoneyTransactionEntity> {
  //   const existData = await this.findProductByName(category['type_name'], shop_id);
  //   if (existData) {
  //     throw new BadRequestException('Product Type Data is Wrong');
  //   } else {
  //     return this.typeRepository.save({ ...category, shop_id: shop_id });
  //   }
  // }

  // async update(category: any, shop_id: number, id: number) {
  //   const existData = await this.findProductByName(category['type_name'], shop_id);
  //   if (!existData) {
  //     throw new BadRequestException('Product Type Id is Wrong');
  //   }
  //   else if (existData && id != id) {
  //     throw new BadRequestException('Product Type Data is Wrong');
  //   } else {
  //     existData.type_name = category.type_name
  //     existData.img_url = category.img_url
  //     existData.shop_id = shop_id
  //     await this.typeRepository.update(id, existData)
  //     let suc = new SuccessAPI()
  //     return { ...suc, id: id }
  //   }
  // }

  async delete(id: number) {
    try {
      let data = await this.typeRepository.findOneBy({ id });
      await this.typeRepository.softRemove(data);
      let suc = new SuccessAPI()
      return { ...suc, id: id }
    } catch (error) {
      throw new BadRequestException('Transaction Data is Wrong');
    }
  }


  async findTransactionByRefId(transactionId: string) {
    return this.typeRepository.findOneBy({ transaction_id: transactionId, });
  }

  approveTransction(transactionId: string) {

  }


}
