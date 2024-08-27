import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString } from "class-validator";

export class GetStockHistoryDto {
  @ApiProperty({ description: "Stock ticker" })
  @IsString()
  ticker: string;

  @ApiProperty({ description: "Start date of the stock" })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: "End date of the stock" })
  @IsDateString()
  endDate: Date;
}
