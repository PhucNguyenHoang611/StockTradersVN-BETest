import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateStockDto {
  @ApiProperty({ description: "Closing price of the stock" })
  @IsNumber()
  close: number;

  @ApiProperty({
    description: "Highest price of the stock in the trading session"
  })
  @IsNumber()
  high: number;

  @ApiProperty({
    description: "Lowest price of the stock in the trading session"
  })
  @IsNumber()
  low: number;

  @ApiProperty({ description: "Opening price of the stock" })
  @IsNumber()
  open: number;

  @ApiProperty({ description: "Stock ticker symbol" })
  @IsString()
  ticker: string;

  @ApiProperty({ description: "Volume of the stock traded" })
  @IsNumber()
  vol: number;
}
