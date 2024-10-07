import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import styles from './WordCLoud.module.scss';

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

interface WordData {
  text: string;
  size: number;
  id: number; // ID 추가
}

interface WordCloudProps {
  data: WordData[];
  dashboard?: boolean;
  onWordClick?: (word: string, id: number) => void; // 클릭 시 단어와 ID 전달
}

const WordCloud: React.FC<WordCloudProps> = ({ data, onWordClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawWordCloud = () => {
      const container = containerRef.current;
      if (!container) return;
      let width: number;
      let height: number;

      width = Math.max(container.clientWidth - 160, 160);
      height = container.clientHeight;

      const maxSize = Math.max(...data.map(d => d.size));
      const minSize = Math.min(...data.map(d => d.size));

      const relativeData = data.map(d => ({
        ...d,
        size: (d.size - minSize) / (maxSize - minSize) + 30,
      }));

      d3.select(container).select('svg').remove();

      const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const draw = (words: cloud.Word[]) => {
        const texts = svg
          .selectAll<SVGTextElement, cloud.Word>('text') // 제네릭 타입 명시
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d: cloud.Word) => `${d.size}px`)
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
          .style('cursor', 'pointer')
          .on('mouseenter', function (event, d) {
            d3.select(this).style('transform', function () {
              return `translate(${d.x}px, ${d.y}px) rotate(${d.rotate}deg) scale(1.05)`;
            });
          })
          .on('mouseleave', function (event, d) {
            d3.select(this).style('transform', function () {
              return `translate(${d.x}px, ${d.y}px) rotate(${d.rotate}deg) scale(1)`;
            });
          })
          .on('click', (event, d) => {
            if (onWordClick) {
              onWordClick(d.text as string, (d as WordData).id); // 클릭 시 단어와 ID 전달
            }
          });
      };

      cloud<WordData>()
        .size([width, height])
        .words(
          relativeData.map(d => ({
            text: d.text,
            size: d.size,
            id: d.id,
          })),
        )
        .padding(7)
        .rotate(() => 0)
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
    <div className={styles.wordCloudContainer}>
      <div
        ref={containerRef}
        id="word-cloud"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          marginTop: '10px',
        }}
      />
    </div>
  );
};

export default WordCloud;
