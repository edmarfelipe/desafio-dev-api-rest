import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { IAccountApplicationService } from '@domain/interfaces/application/IAccountApplicationService';
import { Transaction } from '@domain/entity/Transaction';
import { CreateAccountDto } from './create-account.dto';
import { Account } from '@domain/entity/Account';

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject('IAccountApplicationService')
    private readonly accountAppService: IAccountApplicationService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Account created' })
  @ApiResponse({ status: 400, description: 'Body is not valid' })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    const result = await this.accountAppService.create(
      createAccountDto.idPessoa,
    );

    if (result.isFailure) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.value;
  }

  @Patch('/:accountId')
  @ApiResponse({ status: 200, description: 'Account blocked' })
  @ApiResponse({ status: 400 })
  async blockAccount(@Param('accountId') accountId: number): Promise<boolean> {
    const result = await this.accountAppService.block(accountId);

    if (result.isFailure) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  @Post('/:accountId/deposit')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Deposit created' })
  @ApiResponse({ status: 400 })
  async deposit(
    @Param('accountId') accountId: number,
    @Query('value') value: number,
  ): Promise<Account> {
    const result = await this.accountAppService.deposit(accountId, value);

    if (result.isFailure) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.value;
  }

  @Post('/:accountId/withdraw')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Withdraw created' })
  @ApiResponse({ status: 400 })
  async withdraw(
    @Param('accountId') accountId: number,
    @Query('value') value: number,
  ): Promise<Account> {
    const result = await this.accountAppService.withdraw(accountId, value);

    if (result.isFailure) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.value;
  }

  @Get('/:accountId/balance')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  async getBalance(@Param('accountId') accountId: number): Promise<number> {
    const result = await this.accountAppService.getBalance(accountId);

    if (result.isFailure) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.value;
  }

  @Get('/:accountId/transactions')
  @ApiResponse({ status: 200 })
  async getTransactions(
    @Param('accountId') accountId: number,
  ): Promise<Transaction[]> {
    return await this.accountAppService.getTransactions(accountId);
  }
}
