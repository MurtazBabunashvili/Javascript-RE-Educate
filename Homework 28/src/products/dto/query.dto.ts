import { Transform } from 'class-transformer';

export class QueryDTO {
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @Transform(({ value }) => Number(value))
  take: number = 30;
}
