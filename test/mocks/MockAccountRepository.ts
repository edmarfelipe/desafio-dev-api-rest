import { IAccountRepository } from '@domain/interfaces/repository/IAccountRepository';
import { Account } from '@domain/entity/Account';

export class MockAccountRepository implements IAccountRepository {
  private _users: Account[];

  constructor() {
    this._users = [];

    const account = new Account(1);
    account.saldo = 0;
    this._users.push(account);
  }

  update(idConta: number, account: Account): Promise<Account> {
    const index = this._users.findIndex((item) => item.idConta === idConta);
    this._users[index] = account;
    return Promise.resolve(account);
  }

  save(account: Account): Promise<Account> {
    this._users.push(account);
    return Promise.resolve(account);
  }

  get(id: number): Promise<Account> {
    return Promise.resolve(this._users.find((item) => item.idConta == id));
  }

  findAll(): Promise<Account[]> {
    return Promise.resolve(this._users);
  }
}
