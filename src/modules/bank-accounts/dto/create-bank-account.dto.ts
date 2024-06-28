import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsIn(['corrente', 'poupança'])
  @IsNotEmpty()
  accountType: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  openingBalance: number;
}
