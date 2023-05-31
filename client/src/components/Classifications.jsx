import React from 'react';
import { Typography, Card, Carousel, Row, Col, Divider } from 'antd';

const { Title } = Typography;

const Classifications = () => {

    // Get the path to the images folder
    const catsImagesContext = require.context('./../imgs/cats', false, /\.(png|jpe?g|svg)$/);
    const catsImages = catsImagesContext.keys().map(catsImagesContext);
    const ducksImagesContext = require.context('./../imgs/ducks', false, /\.(png|jpe?g|svg)$/);
    const ducksImages = ducksImagesContext.keys().map(ducksImagesContext);
    const pandasImagesContext = require.context('./../imgs/pandas', false, /\.(png|jpe?g|svg)$/);
    const pandasImages = pandasImagesContext.keys().map(pandasImagesContext);
    
    const graphsImagesContext = require.context('./../imgs/graphs', false, /\.(png|jpe?g|svg)$/);
    const graphsImages = graphsImagesContext.keys().map(graphsImagesContext);

  return (
    <div>
        <Title level={3}>Classifications</Title>
        <Row gutter={[48, 16]}>
            <Col span={8}>
            <Card title="Cats">
                <Carousel autoplay>
                {catsImages.map((image, index) => (
                    <div key={index}>
                    <img src={image} alt={`Cat ${index + 1}`} style={{ width: '100%' }} />
                    </div>
                ))}
                </Carousel>
                <Divider/>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <img src={graphsImages[0]} alt="Duck graph" style={{ width: '100%' }} />
                </div>
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Ducks">
                <Carousel autoplay>
                    {ducksImages.map((image, index) => (
                        <div key={index}>
                        <img src={image} alt={`Cat ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Carousel>
                <Divider/>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <img src={graphsImages[0]} alt="Duck graph" style={{ width: '100%' }} />
                </div>
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Pandas">
                <Carousel autoplay>
                    {pandasImages.map((image, index) => (
                        <div key={index} >
                        <img src={image} alt={`Cat ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Carousel>
                <Divider/>
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <img src={graphsImages[0]} alt="Duck graph" style={{ width: '100%' }} />
                </div>
            </Card>
            </Col>
        </Row>
    </div>
  );
};

export default Classifications;
