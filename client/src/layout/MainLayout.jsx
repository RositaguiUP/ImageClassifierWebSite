import React from 'react';
import { Layout, Divider } from 'antd';
import Description from '../components/Description';
import Classificator from '../components/Classificator';
import Classifications from '../components/Classifications';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  background: '#36BFB1', color: 'white' }}>
        <div className="demo-logo">
          <h1>Cats, ducks and ... pandas?</h1>
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Description />
          <Divider />
          <Classificator />
          <Divider />
          <Classifications />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <div>
          <h3>Realizado por:</h3>
          <p>Rosita Aguirre Plascencia | 0225352</p>
          <p>Karla Yoali Carpinteyro González | 0224538</p>
          <p>Carlos García Becerra | 0224453</p>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
