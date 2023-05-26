import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MaxLength(150)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MaxLength(1024)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  roles?: string[];
}
