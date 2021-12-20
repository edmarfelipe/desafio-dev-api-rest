import { AccountApplicationService } from '../../src/application/AccountApplicationService';
import { MockAccountRepository } from '../../test/mocks/MockAccountRepository';
import { MockTransactionRepository } from '../../test/mocks/MockTransactionRepository';

import { IAccountRepository } from '../../src/domain/interfaces/repository/IAccountRepository';
import { IAccountApplicationService } from '../../src/domain/interfaces/application/IAccountApplicationService';
import { ITransactionRepository } from '../../src/domain/interfaces/repository/ITransactionRepository';

describe('Given the balance is 1.000', () => {
  let accountAppService: IAccountApplicationService;
  let accountRepository: IAccountRepository;
  let transactionRepository: ITransactionRepository;

  beforeEach(() => {
    accountRepository = new MockAccountRepository();
    transactionRepository = new MockTransactionRepository();
    accountAppService = new AccountApplicationService(
      accountRepository,
      transactionRepository,
    );
  });

  it('Should create a account', async () => {
    const account = await accountAppService.create(2);

    expect(account.isSuccess).toBeTruthy();
  });

  it('Should make a deposit when there is an account', async () => {
    const account = await accountAppService.deposit(1, 1000);

    expect(account.isSuccess).toBeTruthy();

    const persistedAccount = await accountRepository.get(1);
    expect(persistedAccount?.saldo).toBe(2000);
  });

  it('Should not make a deposit when there is no account', async () => {
    const account = await accountAppService.deposit(2, 1000);

    expect(account.isFailure).toBeTruthy();
  });

  it('Should not be allowed to deposit to a blocked account', async () => {
    await accountAppService.block(1);
    const account = await accountAppService.deposit(1, 1000);
    expect(account.isFailure).toBeTruthy();

    const persistedAccount = await accountRepository.get(1);
    expect(persistedAccount?.saldo).toBe(1000);
  });

  it('Should not be allowed to withdraw when you do not have a balance', async () => {
    const account = await accountAppService.withdraw(1, 1100);
    expect(account.isFailure).toBeTruthy();

    const persistedAccount = await accountRepository.get(1);
    expect(persistedAccount?.saldo).toBe(1000);
  });

  it('Should make a withdrawal there is an account', async () => {
    const account = await accountAppService.withdraw(1, 100);

    expect(account.isSuccess).toBeTruthy();

    const persistedAccount = await accountRepository.get(1);
    expect(persistedAccount?.saldo).toBe(900);
  });

  it('Should not make a withdrawal over the limit', async () => {
    await accountAppService.deposit(1, 1000);

    const account = await accountAppService.withdraw(1, 1200);

    expect(account.isFailure).toBeTruthy();

    const persistedAccount = await accountRepository.get(1);
    expect(persistedAccount?.saldo).toBe(2000);
  });

  it('Should not make a withdrawal there is no account', async () => {
    const account = await accountAppService.withdraw(2, 100);

    expect(account.isFailure).toBeTruthy();
  });
});
