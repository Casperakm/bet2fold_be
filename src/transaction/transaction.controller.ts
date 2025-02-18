import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './model/transaction.dto';
import { MoneyTransactionEntity } from './model/transaction.entity';
import { SuccessAPI } from '../shared/util/success-api';
import { UserData } from 'src/shared/decorators/users.decorator';
import { JwtAuthGuard } from 'src/shared/auth/guard/jwt-auth.guard';

@Controller('/transaction')
@ApiTags('Transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor(
        private readonly _productType: TransactionService
    ) { }

    @Post('')
    @ApiOkResponse({ type: Object })
    @ApiBadRequestResponse()
    CreateProductType(
        @Body() data: CreateTransactionDto,
        @UserData('id') customerId: number
    ) {
        return this._productType.create(data, customerId);
    }

    @Get('')
    @ApiOkResponse({ type: [MoneyTransactionEntity], })
    getProductType(
        @UserData('id') customerId: number
    ) {
        return this._productType.findAll(customerId);
    }



    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiOkResponse({ type: SuccessAPI })
    @ApiBadRequestResponse()
    async deleteDeliveryFee(@Param('id', ParseIntPipe) id: number) {
        return this._productType.delete(id);
    }
}
