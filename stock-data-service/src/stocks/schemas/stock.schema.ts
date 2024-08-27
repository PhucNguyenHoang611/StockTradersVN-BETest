import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StockDocument = HydratedDocument<Stock>;

@Schema({ timestamps: true })
export class Stock {
  @Prop()
  close: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  high: number;

  @Prop()
  low: number;

  @Prop()
  open: number;

  @Prop()
  ticker: string;

  @Prop()
  vol: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
