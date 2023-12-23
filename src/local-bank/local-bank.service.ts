import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, pipe, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { SuccessAPI } from '../shared/util/success-api';
import { LocalBankEntity } from './model/local-bank.entity';
import { CreateBankDto } from './model/local-bank.dto';

@Injectable()
export class LocalBankService {
  constructor(
    @InjectRepository(LocalBankEntity)
    private readonly typeRepository: Repository<LocalBankEntity>,
  ) { }

  findAll(): Observable<LocalBankEntity[]> {
    return from(this.typeRepository.find());
  }

  async create(bank: CreateBankDto, user_id: number): Promise<LocalBankEntity> {
    const existData = await this.findProductByName(bank.acount_number, bank.type_name);
    if (existData) {
      throw new BadRequestException('Local Type Data is Wrong');
    } else {
      return this.typeRepository.save({ ...bank, user_id });
    }
  }

  async update(bank: CreateBankDto, id: number) {
    const existData = await this.findProductByName(bank.acount_number, bank.type_name);
    if (!existData) {
      throw new BadRequestException('Product Type Id is Wrong');
    }
    else if (existData && id != id) {
      throw new BadRequestException('Product Type Data is Wrong');
    } else {
      existData.type_name = bank.type_name
      existData.account_number = bank.acount_number
      await this.typeRepository.update(id, existData)
      let suc = new SuccessAPI()
      return { ...suc, id: id }
    }
  }

  async delete(id: number) {
    try {
      let data = await this.typeRepository.findOneBy({ id });
      await this.typeRepository.softRemove(data);
      let suc = new SuccessAPI()
      return { ...suc, id: id }
    } catch (error) {
      throw new BadRequestException('Product Type Data is Wrong');
    }
  }


  async findProductByName(bank: string, type: string) {
    return this.typeRepository.findOneBy({ account_number: bank, type_name: type });
  }


}
