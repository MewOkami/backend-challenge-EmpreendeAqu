import { randomUUID } from 'node:crypto';

export class BankAccount {
  readonly id: string;
  name: string;
  accountType: string;
  openingBalance: number;

  constructor() {
    this.id = randomUUID();
  }
}
