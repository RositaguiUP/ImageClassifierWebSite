import React from 'react';
import { ConfigProvider, theme } from 'antd';
import MainLayout from './layout/MainLayout';
import './App.css';

const App = () => {
  // const data = [12, 5, 6, 6, 9, 10];
  // const width = 700;
  // const height = 300;
  
  // <BarChart data={data} width={width} height={height} />

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#36BFB1',
          },
        }}
      >
        <MainLayout />
      </ConfigProvider>
    </>
  );
};

export default App;
