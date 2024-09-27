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

// 단어 데이터의 타입 정의
interface WordData {
  text: string;
  size: number;
}

// WordCloud 컴포넌트의 Props 타입 정의
interface WordCloudProps {
  data: WordData[];
}

const WordCloud: React.FC<WordCloudProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawWordCloud = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // 단어 구름 그리기 함수 정의
      const draw = (words: cloud.Word[]) => {
        // 기존 svg 제거
        d3.select(container).select('svg').remove();

        // 새로운 svg 추가
        const svg = d3
          .select(container)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // 단어 요소 추가
        svg
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d: cloud.Word) => `${d.size}px`) // 단어 크기 조정
          .style('font-family', 'Impact')
          .style(
            'fill',
            () => colors[Math.floor(Math.random() * colors.length)],
          )
          .attr('text-anchor', 'middle')
          .attr('transform', (d: cloud.Word) => {
            const angle = Math.random() * Math.PI * 2; // 원형 배치를 위한 각도 계산
            const radius = Math.sqrt(Math.random()) * (width / 2); // 반경 계산 (중앙으로부터 분포)
            const x = radius * Math.cos(angle); // X 좌표
            const y = radius * Math.sin(angle); // Y 좌표
            return `translate(${x}, ${y})`; // 원형 배치
          })
          .text((d: cloud.Word) => d.text as string)
          .style('cursor', 'pointer')
          .on('mouseover', function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style('font-size', `${d.size! * 1.5}px`); // 글씨 커지기
          })
          .on('mouseout', function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style('font-size', `${d.size}px`); // 원래 크기로 돌아가기
          });
      };

      // d3-cloud 레이아웃 설정
      const layout = cloud<WordData>()
        .size([width, height])
        .words(
          data.map(d => ({
            text: d.text,
            size: d.size,
          })),
        )
        .padding(5)
        .rotate(() => 0) // 모든 단어는 가로로 유지
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw); // 'end' 이벤트가 발생하면 draw 호출

      layout.start();
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
