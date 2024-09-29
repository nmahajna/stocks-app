import { Schema, Document } from 'mongoose';

export const PortfolioSchema = new Schema({
  stocks: { type: [String], required: true },
});

export interface Portfolio extends Document {
  stocks: string[];
}
