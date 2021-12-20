import { Inject, Injectable } from '@nestjs/common';

import { Result } from '@infra/Result';
import { Account } from '@domain/entity/Account';
import { IAccountRepository } from '@domain/interfaces/repository/IAccountRepository';
import { IAccountApplicationService } from '@domain/interfaces/application/IAccountApplicationService';
import { Transaction } from '@domain/entity/Transaction';
import { ITransactionRepository } from '@domain/interfaces/repository/ITransactionRepository';

@Injectable()
export class AccountApplicationService implements IAccountApplicationService {
  constructor(
    @Inject('IAccountRepository')
    readonly accountRepository: IAccountRepository,

    @Inject('ITransactionRepository')
    readonly transactionRepository: ITransactionRepository,
  ) {}

  async create(idPessoa: number): Promise<Result<Account>> {
    const existingAccount = await this.accountRepository.get(idPessoa);

    if (existingAccount) {
      return Result.fail('Account already exist');
    }

    const account = new Account(idPessoa);

    await this.accountRepository.save(account);

    return Result.ok(account);
  }

  async deposit(accountId: number, value: number): Promise<Result<Account>> {
    const account = await this.accountRepository.get(accountId);

    if (!account) {
      return Result.fail('Account does not exist');
    }

    if (!account.flagAtivo) {
      return Result.fail('Inactive account');
    }

    await this.transactionRepository.save(
      new Transaction(account.idConta, value),
    );

    account.saldo = Number(account.saldo) + Number(value);

    await this.accountRepository.update(account.idConta, account);

    return Result.ok(account);
  }

  async withdraw(accountId: number, value: number): Promise<Result<Account>> {
    const account = await this.accountRepository.get(accountId);

    if (!account) {
      return Result.fail('Account does not exist');
    }

    if (value > Number(account.limiteSaqueDiario)) {
      return Result.fail('Withdrawal above the daily limit');
    }

    if (value > Number(account.saldo)) {
      return Result.fail('Withdrawal above the balace');
    }

    value = value > 0 ? value * -1 : value;

    console.log(value);

    await this.transactionRepository.save(
      new Transaction(account.idConta, value),
    );

    account.saldo = Number(account.saldo) + Number(value);

    await this.accountRepository.update(account.idConta, account);

    return Result.ok(account);
  }

  async block(accountId: number): Promise<Result<void>> {
    const account = await this.accountRepository.get(accountId);

    if (!account) {
      return Result.fail('Account does not exist');
    }

    if (!account.flagAtivo) {
      return Result.fail('Account already blocked');
    }

    account.flagAtivo = false;

    await this.accountRepository.update(account.idConta, account);

    return Result.ok();
  }

  async getBalance(accountId: number): Promise<Result<number>> {
    const account = await this.accountRepository.get(accountId);

    if (!account) {
      return Result.fail('Account does not exist');
    }

    return Result.ok(account.saldo);
  }

  async getTransactions(accountId: number): Promise<Transaction[]> {
    return await this.transactionRepository.getByDate(accountId);
  }
}
