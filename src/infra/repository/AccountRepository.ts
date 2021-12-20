import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { Account } from '@domain/entity/Account';
import { IAccountRepository } from '@domain/interfaces/repository/IAccountRepository';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectConnection()
    private readonly connection: Knex,
  ) {}

  save(account: Account): Promise<Account> {
    return this.connection.table(Account.TABLE_NAME).insert<Account>(account);
  }

  update(idConta: number, account: Account): Promise<Account> {
    return this.connection
      .table(Account.TABLE_NAME)
      .where('idConta', idConta)
      .update<Account>(account);
  }

  get(idConta: number): Promise<Account> {
    return this.connection
      .select()
      .first()
      .from<Account>(Account.TABLE_NAME)
      .where('idConta', idConta);
  }
}
