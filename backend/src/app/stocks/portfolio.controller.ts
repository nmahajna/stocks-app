import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly stocksService: StocksService) {}

  // Get user's portfolio
  @Get()
  async getPortfolio() {
    return this.stocksService.getUserPortfolio();
  }

  // Add a stock to the portfolio
  @Post()
  async addStockToPortfolio(@Body('symbol') symbol: string) {
    console.log('Add Stock ' + symbol);
    return this.stocksService.addStockToPortfolio(symbol);
  }

  // Remove a stock from the portfolio
  @Delete(':symbol')
  async removeStockFromPortfolio(@Param('symbol') symbol: string) {
    console.log('Remove Stock ' + symbol);

    return this.stocksService.removeStockFromPortfolio(symbol);
  }
}
