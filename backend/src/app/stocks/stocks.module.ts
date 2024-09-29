import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksService } from './stocks.service';
import { Stock, StockSchema } from './schema/stock.schema'; // Adjust if necessary
import { Portfolio, PortfolioSchema } from './schema/portfolio.schema'; // Adjust if necessary
import { HttpModule } from '@nestjs/axios'; // Import HttpModule
import { HttpService } from '@nestjs/axios';
import { PortfolioController } from './portfolio.controller';
import { StocksController } from './stocks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }]), // Adjust if necessary
    HttpModule, // Add HttpModule here
  ],
  providers: [StocksService],
  exports: [StocksService],
  controllers:[PortfolioController, StocksController]
})
export class StocksModule {}
