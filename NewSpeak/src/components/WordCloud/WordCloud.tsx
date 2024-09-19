import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

// 색상 배열 정의
const colors = [
  '#FF6347',
  '#4682B4',
  '#32CD32',
  '#FFD700',
  '#FF69B4',
  '#8A2BE2',
  '#7FFF00',
  '#D2691E',
  '#DC143C',
  '#00BFFF',
];

interface WordData {
  text: string;
  size: number;
}

interface WordCloudProps {
  data: WordData[];
}

const WordCloud = ({ data }: WordCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawWordCloud = () => {
      const container = containerRef.current;
      if (!container) return;

      // 네비게이션 바 너비를 고려하여 오른쪽 공간의 너비를 설정
      const width = container.clientWidth;
      const height = container.clientHeight;

      const layout = cloud()
        .size([width, height])
        .words(
          data.map(d => ({
            text: d.text,
            size: d.size,
          })),
        )
        .padding(40)
        .rotate(() => 0)
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw);

      layout.start();

      function draw(words) {
        const svg = d3.select(container).select('svg').remove(); // 기존 svg 제거

        const newSvg = d3
          .select(container)
          .append('svg')
          .attr('width', '90%') // 부모 div의 너비를 채움
          .attr('height', '90%') // 부모 div의 높이를 채움
          .style('border', '1px solid black')
          .style('border-radius', '12px')
          .style('overflow', 'hidden') // 스크롤 방지
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`); // 중앙에 위치

        newSvg
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-family', 'Impact')
          .style(
            'fill',
            () => colors[Math.floor(Math.random() * colors.length)],
          )
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
          .text(d => d.text)
          .style('cursor', 'pointer')
          .on('mouseover', function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style('font-size', `${d.size * 1.5}px`);
          })
          .on('mouseout', function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style('font-size', `${d.size}px`);
          });
      }
    };

    drawWordCloud();
    window.addEventListener('resize', drawWordCloud);

    return () => window.removeEventListener('resize', drawWordCloud);
  }, [data]);

  return (
    <div
      ref={containerRef}
      id="word-cloud"
      style={{
        width: 'calc(100vw - 12rem)', // 네비게이션 바 너비를 제외한 전체 너비
        height: '90vh', // 전체 화면 높이
        overflow: 'hidden', // 스크롤 방지
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></div>
  );
};

export default WordCloud;
