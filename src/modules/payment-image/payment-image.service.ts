import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import { PrismaService } from 'src/database/prisma.service';
import { PaymentImage } from './entities/payment-image.entity';
import { unlink } from 'node:fs';

@Injectable()
export class PaymentImageService {
  constructor(private prisma: PrismaService) {}

  async upload(image: Express.Multer.File, paymentId: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const findPayment = await this.prisma.payment.findFirst({
      where: { id: paymentId },
    });

    const findPaymentUpdate = await this.prisma.paymentImage.findFirst({
      where: { paymentId: paymentId },
    });

    if (!findPayment) {
      unlink(image.path, (error) => {
        if (error) console.log(error);
      });

      throw new NotFoundException('Payment not found');
    }

    if (findPaymentUpdate) {
      unlink(image.path, (error) => {
        if (error) console.log(error);
      });

      throw new ConflictException(
        'This payment already has an associated image',
      );
    }

    const uploadImage = await cloudinary.uploader.upload(
      image.path,
      { resource_type: 'image' },
      (error, result) => {
        return result;
      },
    );

    unlink(image.path, (error) => {
      if (error) console.log(error);
    });

    const paymentImage = new PaymentImage();

    const createUpload = await this.prisma.paymentImage.create({
      data: {
        id: paymentImage.id,
        image: uploadImage.secure_url,
        payment: {
          connect: { id: paymentId },
        },
      },
    });

    return createUpload;
  }

  async findAll() {
    const findpaymentImage = await this.prisma.paymentImage.findMany();
    return findpaymentImage;
  }
}
