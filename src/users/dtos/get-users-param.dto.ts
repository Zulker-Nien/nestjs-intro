import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get users with a specific ID',
    example: 123,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
