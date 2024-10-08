import React, { useState,useEffect } from 'react';
import WordTest from '../../components/Word/WordTest';
import Result from '../../components/Word/Result';
import userApi from '../../apis/UserApi';
import { useVocaStore } from '../../store/VocaStore';
const Test = () => {
  
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

  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [words,setWords] = useState<Word[]>();
  const {vocaId , setVocaId} = useVocaStore() // 임시

  useEffect(() => {
    const fetchTestWords = async () => {
      try {
        if (!vocaId) {
          const fetchVocaIds = async () => {
            try {
              const fetchedVocaId = await userApi.getMyVocas();
              setVocaId(fetchedVocaId); // 가져온 데이터를 상태에 저장
            } catch (error) {
              console.error('Error fetching vocaIds:', error);
            }
          };
    
          fetchVocaIds(); 

        }
        if(vocaId !== null) {
        const fetchedTestWords = await userApi.getMyVocasQuiz(vocaId);
        setWords(fetchedTestWords || []); // 가져온 데이터를 상태에 저장
        } 
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchTestWords(); // API 요청


  }, [vocaId]); // 의존성 배열에 추가
  

  const handleTestComplete = async (finalScore: number, userAnswers: string[]) => {
    if (!vocaId) {
      alert('단어장이 선택되지 않습니다.'); // vocaId가 없을 때 알�� 추가
      return;
    }
    const result = await userApi.gradeMyVocasQuiz(finalScore,vocaId)
    console.log('API gradeMyVocasQuiz result:', result);
    setScore(finalScore);
    setAnswers(userAnswers); // 사용자의 답안을 상태에 저장
  };

  return (
    <div>
      {score !== null ? (
        <Result
          score={score}
          total={words.length}
          answers={answers}
          correctAnswers={words.map(word => word.answer)}
        />
      ) : (
        words && (
          <WordTest words={words} onTestComplete={handleTestComplete} />
        ))}
    </div>
  );
};

export default Test;
