import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(2)
  eventName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  @MinLength(2)
  eventDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  endTime: Date;
}
