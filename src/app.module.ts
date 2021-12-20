import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { config } from './app.config';
import { AccountController } from './api/account.controller';
import { AccountRepository } from '@infra/repository/AccountRepository';
import { AccountApplicationService } from '@application/AccountApplicationService';
import { TransactionRepository } from '@infra/repository/TransactionRepository';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: {
          ...config.database,
        },
      },
    }),
  ],
  providers: [
    { provide: 'IAccountRepository', useClass: AccountRepository },
    { provide: 'ITransactionRepository', useClass: TransactionRepository },
    {
      provide: 'IAccountApplicationService',
      useClass: AccountApplicationService,
    },
  ],
  controllers: [AccountController],
})
export class AppModule {}
