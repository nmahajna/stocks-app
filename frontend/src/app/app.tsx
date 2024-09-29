import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockList from '../pages/StockList';
import StockDetails from '../pages/StockDetails';
import 'antd/dist/reset.css'; // Ant Design v5+ reset styles


const { Header, Content, Sider } = Layout;

const App: React.FC = () => {

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logged out');
  };

  return (
    
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" onClick={() => window.location.href = '/'}>My Stocks</Menu.Item>
            <Menu.Item key="2" onClick={() => window.location.href = '/'}>Insights</Menu.Item>
            <Menu.Item key="3" onClick={() => window.location.href = '/'}>Trends</Menu.Item>
            <Menu.Item  key="4" onClick={handleLogout}>Logout</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'lightblue', padding: 0 }}>
            <h1 style={{ textAlign: 'left', margin: '5px' }}>Stock Portfolio</h1>
          </Header>

          <Content style={{ margin: '0 16px' }}>

            <Routes>
              <Route path="/" element={<StockList />} />
              <Route path="/stocks/:symbol" element={<StockDetails />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
