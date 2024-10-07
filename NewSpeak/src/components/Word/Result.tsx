import React from 'react';
import styles from './Result.module.scss';
import { useNavigate } from 'react-router-dom';
interface ResultProps {
  score: number;
  total: number;
  answers: string[];
  correctAnswers: string[];
}

const Result = ({ score, total, answers, correctAnswers }: ResultProps) => {
  const navigate = useNavigate();

  const handleToWordList = () => {
    navigate('/word');
  };
  return (
    <div className={styles.resultContainer}>
      <div className={styles.headContainer}>
      <h2>시험 완료!</h2>
      <p>
        최종 점수: {score} / {total}
      </p>
      </div>
      <h3>답안 결과:</h3>
      <div className={styles.answersContainer}>
        <div className={styles.leftColumn}>
          {answers.slice(0, 5).map((answer, index) => (
            <div key={index} className={styles.answer}>
              <span className={styles.answerText}>
                {index + 1}. {answer}
              </span>
              {answer === correctAnswers[index] ? (
                <span className={styles.correct}>✔️</span>
              ) : (
                <span className={styles.incorrect}>❌</span>
              )}
              <span className={styles.correctAnswer}>
                (정답: {correctAnswers[index]})
              </span>
            </div>
          ))}
        </div>
        <div className={styles.rightColumn}>
          {answers.slice(5, 10).map((answer, index) => (
            <div key={index + 5} className={styles.answer}>
              <span className={styles.answerText}>
                {index + 6}. {answer}
              </span>
              {answer === correctAnswers[index + 5] ? (
                <span className={styles.correct}>✔️</span>
              ) : (
                <span className={styles.incorrect}>❌</span>
              )}
              <span className={styles.correctAnswer}>
                (정답: {correctAnswers[index + 5]})
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.returnContainer}>
      <button className={styles.returnButton} onClick={handleToWordList}>
        단어장으로
      </button>
      </div>
    </div>
  );
};

export default Result;
