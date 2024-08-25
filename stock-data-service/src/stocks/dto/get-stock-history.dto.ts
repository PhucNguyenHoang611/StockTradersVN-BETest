import { IsString, IsDate } from "class-validator";

export class GetStockHistoryDto {
  @IsString()
  readonly ticker?: string;

  @IsDate()
  readonly startDate?: Date;

  @IsDate()
  readonly endDate?: Date;
}
