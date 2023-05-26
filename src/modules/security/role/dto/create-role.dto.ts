import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MaxLength(150)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MaxLength(255)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  permissions: [string];
}
