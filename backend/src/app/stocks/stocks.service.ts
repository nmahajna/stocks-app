import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './portfolio.model';
import { Stock } from './schema/stock.schema';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class StocksService {

  constructor(@InjectModel('Portfolio') private portfolioModel: Model<Portfolio>,
    private readonly httpService: HttpService,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
  ) {}

  async fetchStockData(symbol: string): Promise<Stock> {
    console.log('get stock details for ' + symbol);
    
    const existingStock = await this.stockModel.findOne({ symbol });
    console.log('get existingStock :' + JSON.stringify(existingStock));

    if (existingStock) return existingStock;

    const apiKey = 'Ev7r8DqvHIOCvovKoq1ZSm9Xbua9lA5p';

    const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${apiKey}`;

    const response = await this.httpService.get(url).toPromise();

    const stockData : Stock = response?.data[0];

    const stock  = new this.stockModel({
      symbol: stockData.symbol,
      name: stockData.name,
      price: stockData.price,
      changesPercentage: stockData.changesPercentage,
      marketCap: stockData.marketCap,
    });

    console.log('get stock :' + JSON.stringify(stock));

    return stock;
  }



  async getUserPortfolio(): Promise<string[]> {
    const portfolio = await this.portfolioModel.findOne();
    return portfolio ? portfolio.stocks : [];
  }

  async addStockToPortfolio(symbol: string): Promise<void> {
    const portfolio = await this.portfolioModel.findOne();
    if (portfolio) {
      console.log('add stock:' + symbol);
      portfolio.stocks.push(symbol);
      await portfolio.save();
    } else {
      console.log('create new portfolio with stock:' + symbol);
      const newPortfolio = new this.portfolioModel({ stocks: [symbol] });
      await newPortfolio.save();
    }
  }

  async removeStockFromPortfolio(symbol: string): Promise<void> {
    const portfolio = await this.portfolioModel.findOne();

    if (portfolio) {
      console.log('remove: ' + portfolio + '    ' + symbol);
      portfolio.stocks = portfolio.stocks.filter(s => s !== symbol);
      await portfolio.save();
    }
  }

  
}