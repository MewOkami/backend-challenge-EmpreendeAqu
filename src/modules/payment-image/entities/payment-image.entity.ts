import { randomUUID } from 'node:crypto';

export class PaymentImage {
  readonly id: string;
  image: string;
  paymentId: string;

  constructor() {
    this.id = randomUUID();
  }
}
