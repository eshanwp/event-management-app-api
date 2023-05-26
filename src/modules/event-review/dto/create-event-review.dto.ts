import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  @MinLength(2)
  review: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  rate: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  eventId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  userId: string;
}
