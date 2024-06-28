import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { PrismaService } from 'src/database/prisma.service';
import { TransactionReportDto } from './dto/transaction-report.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = new Payment();
    Object.assign(payment, createPaymentDto);

    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id: payment.balanceId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank Account not found');
    }

    if (bankAccount.openingBalance < payment.value) {
      throw new ForbiddenException('The bank does not have enough balance');
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.payment.create({
        data: {
          id: payment.id,
          balanceId: payment.balanceId,
          value: payment.value,
          createAt: payment.createAt,
          description: payment.description,
        },
      });

      const newBalance = bankAccount.openingBalance - payment.value;

      await prisma.bankAccount.update({
        where: { id: payment.balanceId },
        data: {
          openingBalance: newBalance,
        },
      });
    });

    return payment;
  }

  async generateTransactionReport(reportDto: TransactionReportDto) {
    const { accountId, date } = reportDto;

    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank Account not found');
    }

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 1);

    const transactions = await this.prisma.payment.findMany({
      where: {
        balanceId: accountId,
        createAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const totalAmount = transactions.reduce(
      (total, transaction) => total + transaction.value,
      0,
    );

    return {
      account: bankAccount,
      date,
      transactions,
      totalAmount,
    };
  }

  async findAll() {
    const findpayment = await this.prisma.payment.findMany();
    return findpayment;
  }
}
