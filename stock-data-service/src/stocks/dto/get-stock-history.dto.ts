import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate } from "class-validator";

export class GetStockHistoryDto {
  @ApiProperty({ description: "Stock ticker" })
  @IsString()
  readonly ticker?: string;

  @ApiProperty({ description: "Start date of the stock" })
  @IsDate()
  readonly startDate?: Date;

  @ApiProperty({ description: "End date of the stock" })
  @IsDate()
  readonly endDate?: Date;
}
