import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateStockDto {
  @ApiProperty({ description: "Closing price of the stock" })
  @IsNumber()
  readonly close: number;

  @ApiProperty({
    description: "Highest price of the stock in the trading session"
  })
  @IsNumber()
  readonly high: number;

  @ApiProperty({
    description: "Lowest price of the stock in the trading session"
  })
  @IsNumber()
  readonly low: number;

  @ApiProperty({ description: "Opening price of the stock" })
  @IsNumber()
  readonly open: number;

  @ApiProperty({ description: "Stock ticker symbol" })
  @IsString()
  readonly ticker: string;

  @ApiProperty({ description: "Volume of the stock traded" })
  @IsNumber()
  readonly vol: number;
}
