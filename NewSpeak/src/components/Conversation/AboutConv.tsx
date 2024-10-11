import React, { useState } from 'react';
import { RiRobot2Line } from 'react-icons/ri';
import styles from './AboutConv.module.scss';

const AboutConv = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content:
        '당신의 회화 도우미 SPEAKO에요! 대화 시작하기 버튼을 누르고, 선택된 기사에 대해 말해주세요! 아무 내용이나 좋아요.',
    },
    {
      role: 'bot',
      content:
        '혹시 말이 잘못 인식되어도, 걱정하지 마세요! 얼마든지 다시 녹음할 수 있어요.',
    },
    {
      role: 'bot',
      content:
        '대화가 전부 끝나면, 대화 내용을 요약해서 보고서로 만들어 드릴게요! 물론 저장하지 않고 중간에 그만둘 수도 있어요.',
    },
  ]);

  return (
    <div>
      <div className={styles.aboutConv}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.botMessage}>
            <RiRobot2Line className={styles.botIcon} size={35} />
            <div className={styles.messageContent}>{msg.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutConv;
