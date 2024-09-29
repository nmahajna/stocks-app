import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { Stock } from '../types/Stock';
import axios from 'axios';

export class StockStore {
  public stocks: string[] = [];
  stockDetails: Stock | null = null;
  searchQuery = '';

  constructor() {
    makeAutoObservable(this);
  }

  fetchStocks(portfolio: string[]) {
    
    this.stocks = portfolio;
  }

  getStockDetails(symbol: string) {
    console.log(`Fetching details for stock: ${symbol}`);
    axios.defaults.baseURL = 'http://localhost:3000';
     axios.get(`/api/stocks/${symbol}`).then((response) => {
      console.log("GET symbol: " + response.data);
      this.stockDetails = response.data;
    });
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }


  get filteredStocks() {
    if (this.searchQuery === '') {
      return this.stocks;
    }
    return this.stocks.filter(stock =>
      stock.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}






const stockStore = new StockStore();
export default stockStore;


