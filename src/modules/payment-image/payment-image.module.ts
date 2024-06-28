import { BadRequestException, Module } from '@nestjs/common';
import { PaymentImageService } from './payment-image.service';
import { PaymentImageController } from './payment-image.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Your files have to be just images'),
            false,
          );
        }
      },
    }),
  ],
  controllers: [PaymentImageController],
  providers: [PaymentImageService, PrismaService],
})
export class PaymentImageModule {}
