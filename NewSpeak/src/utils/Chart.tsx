import React from 'react';
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
      fullMark: 100,
    },
    {
      subject: '이해력',
      score: report.feedback.comprehension.score,
      fullMark: 100,
    },
    {
      subject: '표현력',
      score: report.feedback.expressiveness.score,
      fullMark: 100,
    },
    {
      subject: '문법',
      score: report.feedback.grammar.score,
      fullMark: 100,
    },
    {
      subject: '어휘',
      score: report.feedback.vocabulary.score,
      fullMark: 100,
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

  const width = inDashboard ? 110 : 220;
  const height = inDashboard ? 100 : 220;

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
      {inDashboard ? (
        <></>
      ) : (
        <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
      )}
      <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} />
      <Radar
        name="Feedback"
        dataKey="score"
        stroke={getColorByScore(report.score)}
        fill={getColorByScore(report.score)}
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};
