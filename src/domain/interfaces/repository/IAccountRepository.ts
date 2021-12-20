import { Account } from '@domain/entity/Account';

export interface IAccountRepository {
  save(account: Account): Promise<Account>;
  get(idConta: number): Promise<Account>;
  update(idConta: number, account: Account): Promise<Account>;
}
