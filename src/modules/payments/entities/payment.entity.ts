import { randomUUID } from 'node:crypto';

export class Payment {
  readonly id: string;
  balanceId: string;
  value: number;
  readonly createAt: Date;
  description: string;

  constructor() {
    this.id = randomUUID();
    this.createAt = new Date();
  }
}
