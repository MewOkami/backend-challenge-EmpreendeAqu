import { Module } from '@nestjs/common';
import { BankAccountsModule } from './modules/bank-accounts/bank-accounts.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PaymentImageModule } from './modules/payment-image/payment-image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BankAccountsModule,
    PaymentsModule,
    UserModule,
    AuthModule,
    PaymentImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
