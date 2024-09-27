import React, { useState,useEffect } from 'react';
import WordTest from '../../components/Word/WordTest';
import Result from '../../components/Word/Result';
import userApi from '../../apis/UserApi';

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
  const [words,setWords] = useState<Word[]>([]);
  const vocaId = 0 // 임시

  useEffect(() => {
    const fetchTestWords = async () => {
      try {
        const fetchedTestWords = await userApi.getMyVocasQuiz(vocaId);
        setWords(fetchedTestWords || []); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchTestWords(); // API 요청


  }, [vocaId]); // 의존성 배열에 추가
  
//   const words: Word[] = [
//     {
//         "wordId": 1,
//         "answer": "Innovation",
//         "level": 5,
//         "createdAt": null,
//         "meaningDatas": [
//             {
//                 "meaning": "Innovation 1번째 뜻",
//                 "example": "Innovation drives progress in various fields.",
//                 "exampleKorean": "혁신은 다양한 분야에서 발전을 이끕니다."
//             },
//             {
//                 "meaning": "Innovation 2번째 뜻",
//                 "example": "Innovation 2번째 뜻 문장",
//                 "exampleKorean": "Innovation 2번째 뜻 문장 한국어뜻"
//             }
//         ]
//     },
//     {
//         "wordId": 2,
//         "answer": "Technology",
//         "level": 4,
//         "createdAt": null,
//         "meaningDatas": [
//             {
//                 "meaning": "Technology 1번째 뜻",
//                 "example": "Technology has revolutionized communication.",
//                 "exampleKorean": "기술은 통신에 혁신을 가져왔습니다."
//             }
//         ]
//     }
// ]

  const handleTestComplete = async (finalScore: number, userAnswers: string[]) => {
    const result = await userApi.gradeMyVocasQuiz(finalScore)
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
        <WordTest words={words} onTestComplete={handleTestComplete} />
      )}
    </div>
  );
};

export default Test;
