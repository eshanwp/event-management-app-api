import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MailOptions {
  @ApiProperty()
  @IsNotEmpty()
  to: string | Array<string>;

  @ApiProperty()
  @IsOptional()
  cc?: string | Array<string>;

  @ApiProperty()
  @IsOptional()
  bcc?: string | Array<string>;

  @ApiProperty()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  html: string;
}
