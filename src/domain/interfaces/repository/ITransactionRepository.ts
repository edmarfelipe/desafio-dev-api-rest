import { Transaction } from '@domain/entity/Transaction';

export interface ITransactionRepository {
  save(transaction: Transaction): Promise<Transaction>;
  getByDate(accountId: number): Promise<Transaction[]>;
}
