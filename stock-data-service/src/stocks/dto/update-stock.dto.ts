import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsDateString } from "class-validator";

export class UpdateStockDto {
  @ApiProperty({ description: "Closing price of the stock" })
  @IsOptional()
  @IsNumber()
  close: number;

  @ApiProperty({ description: "Date of the stock data" })
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: "Highest price of the stock in the trading session"
  })
  @IsOptional()
  @IsNumber()
  high: number;

  @ApiProperty({
    description: "Lowest price of the stock in the trading session"
  })
  @IsOptional()
  @IsNumber()
  low: number;

  @ApiProperty({ description: "Opening price of the stock" })
  @IsOptional()
  @IsNumber()
  open: number;

  @ApiProperty({ description: "Stock ticker symbol" })
  @IsOptional()
  @IsString()
  ticker: string;

  @ApiProperty({ description: "Volume of the stock traded" })
  @IsOptional()
  @IsNumber()
  vol: number;
}
