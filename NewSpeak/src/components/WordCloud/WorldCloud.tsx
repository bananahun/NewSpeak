import React, { useEffect, useState } from 'react';
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

// 화면 크기 설정
const width = window.innerWidth;
const height = window.innerHeight;

interface WordData {
  text: string;
  size: number;
}

interface HotelsResultProps {
  data: WordData[];
}

const HotelsResult: React.FC<HotelsResultProps> = ({ data }) => {
  useEffect(() => {
    cloud()
      .size([width, height])
      .words(
        data.map(d => ({
          text: d.text,
          size: d.size, // 단어의 크기를 데이터에서 가져옴
        })),
      )
      .padding(10) // 패딩 줘서 안겹치게
      .rotate(() => 0) // 모든 단어 회전 없애기 일거야 하니까
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', draw)
      .start();

    function draw(words) {
      // 기존 내용 제거
      d3.select('#word-cloud').html('');

      // 새로운 SVG 생성
      const svg = d3
        .select('#word-cloud')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('border', '1px solid black')
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      // 단어 데이터 바인딩 및 렌더링
      svg
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Impact')
        .style('fill', () => colors[Math.floor(Math.random() * colors.length)]) // 랜덤 색상
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${[d.x, d.y]})`)
        .text(d => d.text)
        .style('cursor', 'pointer') // 마우스 커서 포인터로 변경
        .on('mouseover', function () {
          d3.select(this)
            .transition()
            .duration(200) // 애니메이션 시간
            .style('font-size', d => `${d.size * 1.5}px`); // 호버 시 확대 (1.5배)
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', d => `${d.size}px`); // 호버 해제 시 원래 크기로
        });
    }
  }, [data]); // data가 변경될 때마다 useEffect가 실행됨

  return <div id="word-cloud"></div>;
};

export default HotelsResult;
