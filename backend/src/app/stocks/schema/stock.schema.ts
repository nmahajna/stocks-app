import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockDocument = Stock & Document;

@Schema()
export class Stock {
  @Prop({ required: true, type: String })
  symbol: string | undefined;

  @Prop({ required: true, type: String })
  name: string | undefined;

  @Prop({ required: true, type: Number })
  price: number | undefined;

  @Prop({  required: true, type: Number })
  changesPercentage: number | undefined;

  @Prop({  required: true, type: String })
  marketCap: string | undefined;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
