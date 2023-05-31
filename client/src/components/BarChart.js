import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, width, height }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const container = d3.select(chartRef.current);

    // Clear the existing content of the container
    container.selectAll('*').remove();

    const svg = container.append('svg').attr('width', width).attr('height', height);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => height - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');

    svg
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => height - 10 * d - 3);
  }, [data, width, height]);

  return <div ref={chartRef}></div>;
};

export default BarChart;