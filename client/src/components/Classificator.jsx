import React, { useState } from 'react';
import { Typography, Button, Row, Col, Upload } from 'antd';
import * as d3 from 'd3';

const { Title } = Typography;
const { Dragger } = Upload;

const Classificator = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [graphData, setGraphData] = useState(d3.range(4));
  const [classification, setClassification] = useState('');


  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('http://localhost:3001/upload', { // Replace with your server URL
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const { graphData, message } = data;
  
        setUploadedImage(file);
        setGraphData(graphData);
        setClassification(message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setGraphData(d3.range(4)); // Reset graph data
    setClassification('');
  };

  return (
    <div style={{ height: '400px' }}>
      <Row gutter={[16, 16]} align="top" justify="center">
        <Col span={8} style={{ textAlign: 'center' }}>
          <div>
            <Title level={3}>Upload Image</Title>
            <Dragger beforeUpload={handleFileUpload}>
              <p className="ant-upload-drag-icon">{/* Add upload icon here */}</p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Dragger>
            {uploadedImage && (
              <Button type="primary" onClick={handleClearImage} style={{ marginTop: '25px' }}>
                Clear Image
              </Button>
            )}
          </div>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <div>
            <Title level={4}>{uploadedImage ? classification : "Not image uploaded"}</Title>
            {uploadedImage && (
              <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            )}
          </div>
        </Col>
        <Col span={8} style={{ textAlign: 'center' }}>
          <div>
            <Title level={4}>Image Graph</Title>
          </div>
          <svg width={300} height={300}>
            {graphData.map((value, index) => (
              <rect key={index} x={index * 80} y={300 - value * 300} width={80} height={value * 300} fill="#36BFB1" />
            ))}
          </svg>
        </Col>
      </Row>
    </div>
  );
};

export default Classificator;
