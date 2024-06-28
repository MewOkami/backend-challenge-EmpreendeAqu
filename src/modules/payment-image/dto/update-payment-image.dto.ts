import { PartialType } from '@nestjs/swagger';
import { CreatePaymentImageDto } from './create-payment-image.dto';

export class UpdatePaymentImageDto extends PartialType(CreatePaymentImageDto) {}
