import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import  stockStore  from '../stores/StockStore'; 
import { Button } from 'antd';

const StockDetails: React.FC = observer(() => {
  const { symbol } = useParams<{ symbol: string }>();
  let foundSymbol :string[] = [];
  useEffect(() => {
    if (symbol) {
      stockStore.getStockDetails(symbol);
    }
  }, [symbol, stockStore]);

  if (!stockStore.stockDetails) {
    return <div>Loading...</div>;
  }

  function navigateBack(): void {
    window.history.back();
  }

  return (
    <div>
      <Button  style={{ margin: '5px' }} onClick={() => navigateBack()}>Back</Button>
      <h1>{stockStore.stockDetails.symbol}</h1>
      <p>Name: {stockStore.stockDetails.name}</p>
      <p>Price: ${stockStore.stockDetails.price}</p>
      <p>Change: {stockStore.stockDetails.changesPercentage}%</p>
      <p>Market Cap: ${stockStore.stockDetails.marketCap}</p>
    </div>
  );
});

export default StockDetails;
