import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommunityNewsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(2)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  @MinLength(2)
  author: string;
}
