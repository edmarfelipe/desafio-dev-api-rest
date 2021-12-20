import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { Transaction } from '@domain/entity/Transaction';
import { ITransactionRepository } from '@domain/interfaces/repository/ITransactionRepository';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectConnection()
    private readonly connection: Knex,
  ) {}

  save(transaction: Transaction): Promise<Transaction> {
    return this.connection
      .table(Transaction.TABLE_NAME)
      .insert<Transaction>(transaction);
  }

  getByDate(idConta: number): Promise<Transaction[]> {
    return this.connection
      .select<Transaction[]>()
      .from(Transaction.TABLE_NAME)
      .where('idConta', idConta);
  }
}
