import { IsString, IsNumber, IsOptional } from "class-validator";

export class UpdateStockDto {
  @IsOptional()
  @IsNumber()
  readonly close?: number;

  @IsOptional()
  @IsString()
  readonly date?: Date;

  @IsOptional()
  @IsNumber()
  readonly high?: number;

  @IsOptional()
  @IsNumber()
  readonly low?: number;

  @IsOptional()
  @IsNumber()
  readonly open?: number;

  @IsOptional()
  @IsString()
  readonly ticker?: string;

  @IsOptional()
  @IsNumber()
  readonly vol?: number;
}
