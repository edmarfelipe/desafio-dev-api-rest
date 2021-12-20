import { Account } from '@domain/entity/Account';
import { Transaction } from '@domain/entity/Transaction';
import { Result } from '@infra/Result';

export interface IAccountApplicationService {
  create(idPessoa: number): Promise<Result<Account>>;
  deposit(accountId: number, value: number): Promise<Result<Account>>;
  withdraw(accountId: number, value: number): Promise<Result<Account>>;
  block(accountId: number): Promise<Result<void>>;
  getBalance(accountId: number): Promise<Result<number>>;
  getTransactions(accountId: number): Promise<Transaction[]>;
}
