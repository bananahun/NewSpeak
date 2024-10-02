import React, { useEffect, useRef } from 'react';
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
  onWordClick?: (word: string, id: number) => void; // 클릭 시 단어와 ID 전달
}

const WordCloud: React.FC<WordCloudProps> = ({ data, onWordClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawWordCloud = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

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
          .on('click', (event, d) => {
            if (onWordClick) {
              onWordClick(d.text as string, (d as WordData).id); // 클릭 시 단어와 ID 전달
            }
          });

        texts.each(function (d: cloud.Word) {
          return moveWord(d3.select(this), d);
        });
      };

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
          const targetX = currentX + (Math.random() * 30 - 15);
          const targetY = currentY + (Math.random() * 30 - 15);

          const bbox = textElement.node()?.getBBox();
          const textWidth = bbox ? bbox.width : 0;
          const textHeight = bbox ? bbox.height : 0;

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
            .duration(1000)
            .ease(d3.easeLinear)
            .attrTween('transform', function () {
              return d3.interpolateString(
                `translate(${currentX}, ${currentY}) rotate(${d.rotate})`,
                `translate(${boundedTargetX}, ${boundedTargetY}) rotate(${d.rotate})`,
              );
            })
            .on('end', function () {
              currentX = boundedTargetX;
              currentY = boundedTargetY;
              continuousMove();
            });
        }

        continuousMove();
      }

      cloud<WordData>()
        .size([width, height])
        .words(
          data.map(d => ({
            text: d.text,
            size: d.size + 10,
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
          width: '35vh',
          height: '80vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      />
    </div>
  );
};

export default WordCloud;
