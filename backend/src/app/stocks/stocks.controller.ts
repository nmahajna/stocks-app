import { Controller, Get, Param, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')  // Update the base route to match '/api/portfolio'
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}


  @Get(':symbol')
  async getStockDetails(@Param('symbol') symbol: string) {
    console.log(`Fetching details for stock: ${symbol}`);
    return this.stocksService.fetchStockData(symbol);
  }
}