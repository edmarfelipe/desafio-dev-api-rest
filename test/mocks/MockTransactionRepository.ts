import { Transaction } from '@domain/entity/Transaction';
import { ITransactionRepository } from '@domain/interfaces/repository/ITransactionRepository';

export class MockTransactionRepository implements ITransactionRepository {
  private _transactions: Transaction[];

  constructor() {
    this._transactions = [];
  }

  save(transaction: Transaction): Promise<Transaction> {
    this._transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  getByDate(accountId: number): Promise<Transaction[]> {
    return Promise.resolve(
      this._transactions.filter((item) => item.idConta == accountId),
    );
  }
}
