import React, { useState, useEffect, useRef } from 'react';
import TimeWatch from './TimeWatch';
import styles from './WordTest.module.scss';

interface Word {
  wordId: number;
  answer: string;
  level: number;
  createdAt: Date | null; // 수정: 날짜 혹은 null일 수 있는 필드
  meaningDatas: {
    meaning: string;
    example: string;
    exampleKorean: string;
  }[];
}
interface WordTestProps {
  words: Word[];
  onTestComplete: (score: number, userAnswers: string[]) => void;
}

const WordTest = ({ words, onTestComplete }: WordTestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(
    Array(words.length).fill(''),
  );
  const [timer, setTimer] = useState(6); // 각 문제당 6초
  const inputRef = useRef<HTMLInputElement | null>(null); // input ref

  const currentWord = words[currentQuestionIndex];

  const handleAnswerSubmit = (isCorrect: boolean, answer: string) => {
    setUserAnswers(prev => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = answer; // 현재 질문에 대한 답변 저장
      return updatedAnswers;
    });

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < words.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimer(6); // 타이머 리셋
    } else {
      onTestComplete(score + (isCorrect ? 1 : 0), userAnswers); // 최종 점수와 답안 전달
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleAnswerSubmit(false, ''); // 시간이 다 지나면 자동으로 문제 제출
          return 0; // 타이머를 0으로 설정
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    inputRef.current?.focus(); // 컴포넌트가 마운트될 때 입력창에 포커스
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAnswerSubmit(
        currentWord.answer === userAnswers[currentQuestionIndex],
        userAnswers[currentQuestionIndex],
      );
    }
  };

  return (
    <div className={styles.wordTestContainer}>
      <h1>단어 시험</h1>
      <h2>{currentWord.meaningDatas[0].meaning}</h2>
      <p>
        문제 {currentQuestionIndex + 1} / {words.length}
      </p>
      <input
        type="text"
        className={styles.answerInput}
        placeholder="영어 단어를 입력하세요"
        value={userAnswers[currentQuestionIndex]} // 현재 문제에 대한 답변 표시
        onChange={e => {
          const newAnswer = e.target.value;
          setUserAnswers(prev => {
            const updatedAnswers = [...prev];
            updatedAnswers[currentQuestionIndex] = newAnswer; // 답변 업데이트
            return updatedAnswers;
          });
        }}
        onKeyPress={handleKeyPress} // Enter 키 이벤트 핸들링
        ref={inputRef} // ref 연결
      />
      <button
        onClick={() =>
          handleAnswerSubmit(
            currentWord.answer === userAnswers[currentQuestionIndex],
            userAnswers[currentQuestionIndex],
          )
        }
        className={styles.submitButton}
      >
        제출
      </button>
      <TimeWatch timer={timer} />
      <p className={styles.timer}>남은 시간: {timer}초</p>
    </div>
  );
};

export default WordTest;
