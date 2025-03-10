import React, { useState, useEffect, useRef } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export const renderRadarChart = (report: any, inDashboard: boolean = false) => {
  const data = [
    {
      subject: '명료성',
      score: report.feedback.clarity.score,
      fullMark: 20,
    },
    {
      subject: '이해력',
      score: report.feedback.comprehension.score,
      fullMark: 20,
    },
    {
      subject: '표현력',
      score: report.feedback.expressiveness.score,
      fullMark: 20,
    },
    {
      subject: '문법',
      score: report.feedback.grammar.score,
      fullMark: 20,
    },
    {
      subject: '어휘',
      score: report.feedback.vocabulary.score,
      fullMark: 20,
    },
  ];

  const renderCustomTick = (props: any) => {
    const { payload, x, y, textAnchor, ...rest } = props;
    return (
      <text
        {...rest}
        x={x}
        y={y + 1.55}
        textAnchor="middle"
        fill="var(--font-color)"
        fontSize="12px"
      >
        {payload.value}
      </text>
    );
  };

  const getColorByScore = (score: string) => {
    const intScore = parseInt(score, 10);
    const hue = (intScore / 100) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  const width = 230;
  const height = 220;

  return (
    <RadarChart
      width={width}
      height={height}
      cx="50%"
      cy="50%"
      // outerRadius="80%"
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
      <PolarRadiusAxis angle={18} domain={[0, 20]} tick={false} />
      <Radar
        name="Feedback"
        dataKey="score"
        stroke={getColorByScore(report.score)}
        fill={getColorByScore(report.score)}
        fillOpacity={0.7}
        isAnimationActive={true}
      />
    </RadarChart>
  );
};
