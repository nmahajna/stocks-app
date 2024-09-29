import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import  stockStore  from '../stores/StockStore'; 

const StockDetails: React.FC = observer(() => {
  const { symbol } = useParams<{ symbol: string }>();
  let foundSymbol :string[] = [];
  useEffect(() => {
    if (symbol) {
      stockStore.getStockDetails(symbol);

      //  foundSymbol = stockStore.stocks.filter((stock) => stock === symbol);
      // console.log('found Symbol: ', foundSymbol);
    
      //  if (foundSymbol && foundSymbol.length > 0) {
      //   stockStore.getStockDetails(foundSymbol[0]);

      // }
    }
  }, [symbol, stockStore]);

  if (!stockStore.stockDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stockStore.stockDetails.symbol}</h1>
      <p>Name: {stockStore.stockDetails.name}</p>
      <p>Price: ${stockStore.stockDetails.price}</p>
      <p>Change: {stockStore.stockDetails.changesPercentage}%</p>
      <p>Market Cap: ${stockStore.stockDetails.marketCap}</p>
    </div>
  );
});

export default StockDetails;
