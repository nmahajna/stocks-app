
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Button, message, Input, Form } from 'antd'; // Added Button
import stockStore, { StockStore } from '../stores/StockStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls
const user = 'Adam'; // Hardcoded user name
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const StockList: React.FC = observer(() => {
    const history  = useNavigate();
  const [portfolio, setPortfolio] = useState<string[]>([]); // Keep track of user portfolio
  const [searchTerm, setSearchTerm] = useState('');
  axios.defaults.baseURL = BASE_URL;

  useEffect(() => {
    fetchPortfolio(); 
  }, []);

  const fetchPortfolio = async () => {
    try {

      const response = await axios.get('/api/portfolio');
      if(response.data){
        setPortfolio(response.data);
        stockStore.stocks = response.data;
      }

    } catch (error) {
      message.error('Failed to load portfolio');
    }
  };
    function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    handleAddToPortfolio(e.target[0].value )

  }

  const handleAddToPortfolio = async (symbol: string) => {
    try {
      await axios.post('/api/portfolio', { symbol });
      setPortfolio([...portfolio, symbol]);
      message.success(`${symbol} added to portfolio!`);
    } catch (error) {
      message.error('Failed to add stock to portfolio');
    }
  };

  const handleRemoveFromPortfolio = async (symbol: string) => {
    try {
      await axios.delete(`/api/portfolio/${symbol}`);
      setPortfolio(portfolio.filter(item => item !== symbol));
      message.success(`${symbol} removed from portfolio!`);
    } catch (error) {
      message.error('Failed to remove stock from portfolio');
    }
  };

  const handleClick = (symbol: string) => {
    history(`/stocks/${symbol}`);
  };

  const filteredStocks = portfolio.filter(stock =>{
    return (stock && typeof stock == 'string' && stock.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  );

  return (
    <div >
       <h2 style={{width: "40%"}}> Hi {user} </h2>
       <div style={{width: "50%",float: "right"}}>
      <Input.Search
        placeholder="Search stocks by name or symbol"
        allowClear
        style={{ width: "600px", padding: 0 }}
        enterButton="Search"
        onSearch={(value) => setSearchTerm(value)}
      />
      <List
        itemLayout="horizontal"
        dataSource={filteredStocks}
        renderItem={stock => (
          <List.Item
            actions={[
                <Button onClick={() => handleRemoveFromPortfolio(stock)}>
                  Remove
                </Button>,
                  <Button onClick={() => handleClick(stock)}>
                  Details
                </Button>

            ]}
          >
            <List.Item.Meta
              title={stock}
            />
          </List.Item>
          
        )}
      />
        <Form method="post" onSubmitCapture={handleSubmit}
        style={{ marginTop: "50px", padding: 0 }}>
       <label>
         Add Stock: <Input placeholder="Symbol" name="symbol" style={{ width: "470px", padding: 0 }} />
       </label>
       <Button htmlType="submit">
         Add
       </Button>
       </Form>
       </div>
    </div>
  );
});

export default StockList;
