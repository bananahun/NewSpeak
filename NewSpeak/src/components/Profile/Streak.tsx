import React from 'react';
import styles from './Streak.module.scss';

interface StreakProps {
  streaks: { [key: string]: number }; // 날짜를 키로 하는 스트릭 상태 객체 (0~4의 값)
}

const getColorForExp = (exp: number) => {
  if (exp >= 80) return 'rgb(255, 99, 71)'; // 높은 경험치: 빨간색
  if (exp >= 60) return 'rgb(255, 140, 0)'; // 중간 높은 경험치: 오렌지색
  if (exp >= 40) return 'rgb(255, 172, 90)'; // 중간 경험치: 주황색
  if (exp >= 20) return 'rgb(255, 215, 0)'; // 낮은 경험치: 노란색
  return 'lightgray'; // 기본값: 회색
};

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Streak({ streaks }: StreakProps) {
  const today = new Date();
  const days: { date: string; day: number }[] = [];

  // 오늘 날짜 기준으로 150일 전까지의 날짜를 넣습니다
  for (let i = 0; i < 150; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDay(),
    });
  }

  // 날짜를 요일에 맞춰 그룹화
  const groupedDays: string[][] = Array.from({ length: 7 }, () => []);
  days.forEach(({ date, day }) => {
    groupedDays[day].unshift(date);
  });

  return (
    <div className={styles.streakWrapper}>
      {/* 요일 표시 */}
      <div className={styles.weekdayColumn}>
        {weekdays.map((weekday, index) => (
          <div key={index} className={styles.weekday}>
            {weekday}
          </div>
        ))}
      </div>

      {/* 날짜별 스트릭 */}
      <div className={styles.streakGrid}>
        {groupedDays.map((dates, rowIndex) => (
          <div key={rowIndex} className={styles.dayRow}>
            {dates.map(date => (
              <div
                key={date}
                className={`${styles.streakDay} ${
                  (streaks[date] !== undefined && streaks[date] !== 0) ? styles.active : ''
                }`}
                style={{
                  backgroundColor:
                  (streaks[date] !== undefined && streaks[date] !== 0)
                      ? getColorForExp(streaks[date])
                      : 'lightgray', // 색상 통일
                }}
              >
                <div className={styles.tooltip}>{date}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Streak;
