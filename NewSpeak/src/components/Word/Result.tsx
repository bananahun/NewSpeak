import React from 'react';
import styles from './Result.module.scss';

interface ResultProps {
  score: number;
  total: number;
  answers: string[];
  correctAnswers: string[];
}

const Result = ({ score, total, answers, correctAnswers }: ResultProps) => {
  return (
    <div className={styles.resultContainer}>
      <h2>시험 완료!</h2>
      <p>
        최종 점수: {score} / {total}
      </p>
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
    </div>
  );
};

export default Result;
