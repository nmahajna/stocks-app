import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
  @Prop({ required: true, type: [] })
  stocks: [] | undefined;

}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
