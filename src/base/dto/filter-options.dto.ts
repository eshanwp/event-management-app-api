import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class FilterOptionsDto {
  @ApiProperty({ type: Number })
  offset?: number;

  @ApiProperty({ type: Number })
  limit?: number;

  @ApiProperty({ type: [] })
  @IsArray()
  selects?: string[];

  @ApiProperty({ type: [] })
  @IsArray()
  equals?: string[];

  @ApiProperty({ type: [] })
  @IsArray()
  sort?: string[];

  @ApiProperty({ type: [] })
  @IsArray()
  relations?: string[];
}
