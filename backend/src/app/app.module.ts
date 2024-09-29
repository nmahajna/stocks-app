import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksModule } from './stocks/stocks.module';
import { PortfolioSchema } from './stocks/portfolio.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/your-db-name'),
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]),
    StocksModule,
  ],
})
export class AppModule {}
