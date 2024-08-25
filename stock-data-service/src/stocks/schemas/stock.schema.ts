import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StockDocument = HydratedDocument<Stock>;

@Schema({ timestamps: true })
export class Stock {
  @Prop({ required: true })
  close: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ required: true })
  high: number;

  @Prop({ required: true })
  low: number;

  @Prop({ required: true })
  open: number;

  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  vol: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
