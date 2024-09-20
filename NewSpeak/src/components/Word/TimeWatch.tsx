import React, { useEffect, useState } from 'react';
import styles from './TimeWatch.module.scss';

interface TimeWatchProps {
  timer: number; // 타이머 값을 props로 받음
}

const TimeWatch = ({ timer }: TimeWatchProps) => {
  const [rotation, setRotation] = useState(0); // 회전 각도를 상태로 관리

  useEffect(() => {
    // 타이머 값에 따라 초침 각도 설정
    if (timer > 0) {
      const totalRotation = (6 - timer) * 60; // 타이머 값에 따라 각도 설정
      setRotation(totalRotation);
    } else {
      setRotation(0); // 타이머가 0일 때 초침을 0도로 초기화
    }
  }, [timer]);

  // 초침을 일정한 속도로 회전하도록 설정
  useEffect(() => {
    const smoothInterval = setInterval(() => {
      setRotation(prev => (prev + 6) % 360); // 매 프레임마다 6도씩 증가
    }, 1000 / 60); // 약 60 FPS로 설정

    return () => clearInterval(smoothInterval);
  }, []);

  return (
    <div className={styles.clock}>
      <div className={styles.clockFace}>
        <div className={styles.centerDot} />
        <div
          className={styles.secondHand}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'none', // 트랜지션 제거
          }}
        />
      </div>
    </div>
  );
};

export default TimeWatch;
