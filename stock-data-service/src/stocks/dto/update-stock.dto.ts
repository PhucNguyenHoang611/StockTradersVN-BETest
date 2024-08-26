import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateStockDto {
  @ApiProperty({ description: "Closing price of the stock" })
  @IsOptional()
  @IsNumber()
  readonly close?: number;

  @ApiProperty({ description: "Date of the stock data" })
  @IsOptional()
  @IsString()
  readonly date?: Date;

  @ApiProperty({
    description: "Highest price of the stock in the trading session"
  })
  @IsOptional()
  @IsNumber()
  readonly high?: number;

  @ApiProperty({
    description: "Lowest price of the stock in the trading session"
  })
  @IsOptional()
  @IsNumber()
  readonly low?: number;

  @ApiProperty({ description: "Opening price of the stock" })
  @IsOptional()
  @IsNumber()
  readonly open?: number;

  @ApiProperty({ description: "Stock ticker symbol" })
  @IsOptional()
  @IsString()
  readonly ticker?: string;

  @ApiProperty({ description: "Volume of the stock traded" })
  @IsOptional()
  @IsNumber()
  readonly vol?: number;
}
