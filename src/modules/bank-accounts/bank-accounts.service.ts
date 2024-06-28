import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BankAccount } from './entities/bank-account.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BankAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = new BankAccount();

    Object.assign(bankAccount, {
      ...createBankAccountDto,
    });

    if (bankAccount.openingBalance < 0) {
      throw new ForbiddenException('your Balance cannot be negative');
    }

    await this.prisma.bankAccount.create({
      data: { ...bankAccount },
    });

    return plainToInstance(BankAccount, bankAccount);
  }

  async findAll() {
    const findbank = await this.prisma.bankAccount.findMany();
    return findbank;
  }
}
