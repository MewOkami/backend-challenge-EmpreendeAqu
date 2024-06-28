import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Get,
} from '@nestjs/common';
import { PaymentImageService } from './payment-image.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('paymentImage')
@Controller('payment-image')
export class PaymentImageController {
  constructor(private readonly paymentImageService: PaymentImageService) {}

  @Post('Upload')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        paymentId: {
          type: 'string',
        },
      },
    },
  })
  upload(
    @UploadedFiles() files: { image: Express.Multer.File[] },
    @Body('paymentId') paymentId: string,
  ) {
    const { image } = files;

    return this.paymentImageService.upload(image[0], paymentId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.paymentImageService.findAll();
  }
}
