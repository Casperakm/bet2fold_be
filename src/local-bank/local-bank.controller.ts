import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { LocalBankService } from './local-bank.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiParam, ApiQuery, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { CreateBankDto } from './model/local-bank.dto';
import { LocalBankEntity } from './model/local-bank.entity';
import { SuccessAPI } from '../shared/util/success-api';
import { UserData } from 'src/shared/decorators/users.decorator';

@Controller('/local-bank')
@ApiTags('APP Bank')
export class LocalBankController {
    constructor(
        private readonly _productType: LocalBankService
    ) { }

    @Post('')
    @ApiOkResponse({ type: Object })
    @ApiBadRequestResponse()
    CreateProductType(
        @Body() data: CreateBankDto,
        @UserData('id') customer_id: number
    ) {
        return this._productType.create(data, customer_id);
    }

    @Get('')
    @ApiOkResponse({ type: [LocalBankEntity], })
    getProductType(
    ) {
        return this._productType.findAll();
    }

    @Put(':id')
    @ApiOkResponse({ type: SuccessAPI })
    @ApiBadRequestResponse()
    @ApiParam({ name: 'id', type: Number, required: true })
    async updateDeliveryFee(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CreateBankDto,
    ) {
        return this._productType.update(data, id);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, required: true })
    @ApiOkResponse({ type: SuccessAPI })
    @ApiBadRequestResponse()
    async deleteDeliveryFee(@Param('id', ParseIntPipe) id: number) {
        return this._productType.delete(id);
    }
}
