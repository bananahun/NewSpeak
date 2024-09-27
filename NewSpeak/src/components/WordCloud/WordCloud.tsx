import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

// 색상 배열 정의
const colors = [
  '#F56C00',
  '#F5B200',
  '#F59400',
  '#F54000',
  '#F5D000',
  '#F5B552',
  '#CD9466',
  '#CDB166',
  '#CC8166',
  '#CDBD66',
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
      const draw = (words: cloud.Word[]) => {
        const texts = svg
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
          .attr(
            'transform',
            (d: cloud.Word) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`,
          )
          .text((d: cloud.Word) => d.text as string)
          .style('cursor', 'pointer');

        // 각 단어가 계속 부드럽게 이동하도록 설정
        function moveWord(
          textElement: d3.Selection<
            SVGTextElement,
            cloud.Word,
            SVGGElement,
            unknown
          >,
          d: cloud.Word,
        ) {
          let currentX = d.x;
          let currentY = d.y;

          function continuousMove() {
            // 새로운 목표 위치 계산
            const targetX = currentX + (Math.random() * 30 - 15); // X축으로 15px 내외로 움직임
            const targetY = currentY + (Math.random() * 30 - 15); // Y축으로 15px 내외로 움직임

            // 텍스트의 실제 크기와 회전을 고려한 경계 계산
            const bbox = textElement.node()?.getBBox();
            const textWidth = bbox ? bbox.width : 0;
            const textHeight = bbox ? bbox.height : 0;

            // 단어가 이동할 때 경계 안에 있게 제한 (SVG 안에만 위치)
            const boundedTargetX = Math.max(
              -width / 2 + textWidth / 2,
              Math.min(targetX, width / 2 - textWidth / 2),
            );
            const boundedTargetY = Math.max(
              -height / 2.1 + textHeight / 2,
              Math.min(targetY, height / 2 - textHeight / 2),
            );

            textElement
              .transition()
              .duration(1000) // 1초 동안 부드럽게 이동
              .ease(d3.easeLinear) // 일정한 속도로 이동
              .attrTween('transform', function () {
                return d3.interpolateString(
                  `translate(${currentX}, ${currentY}) rotate(${d.rotate})`,
                  `translate(${boundedTargetX}, ${boundedTargetY}) rotate(${d.rotate})`,
                );
              })
              .on('end', function () {
                currentX = boundedTargetX; // 현재 위치 업데이트
                currentY = boundedTargetY; // 현재 위치 업데이트
                continuousMove(); // 이동이 끝나면 다시 이동
              });
          }

          continuousMove(); // 초기 움직임 시작
        }

        // 모든 단어에 대해 움직임 설정
        texts.each(function (d: cloud.Word) {
          moveWord(d3.select(this), d);
        });
      };

      // d3-cloud 레이아웃 설정
      cloud<WordData>()
        .size([width, height])
        .words(
          data.map(d => ({
            text: d.text,
            size: d.size + 10,
          })),
        )
        .padding(7)
        .rotate(() => 0) // 모든 단어는 가로로 유지
        .font('Impact')
        .fontSize(d => d.size)
        .on('end', draw)
        .start();
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
        width: '40vh',
        height: '40vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    />
  );
};

export default WordCloud;
