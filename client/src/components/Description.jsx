import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Description = () => {
  return (
    <div>
      <Title level={2}>Classify your image</Title>
      <Paragraph>
        Machine learning is a field of artificial intelligence that focuses on developing
        algorithms and models that allow computers to learn from and make predictions or
        decisions based on data. In the context of image classification, machine learning can
        be used to analyze and classify images into different categories, such as cats, ducks,
        and pandas.
      </Paragraph>
    </div>
  );
};

export default Description;
