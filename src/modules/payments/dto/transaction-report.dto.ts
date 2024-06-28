import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsDateString, IsString } from 'class-validator';

export class TransactionReportDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    description: 'Formato esperado YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsString()
  date: string;
}
