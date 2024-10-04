import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './WordList.module.scss';
import { FaMicrophone, FaBook } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import PronounceModal from '../Modal/PronounceModal';
import userApi from '../../apis/UserApi'; 
import { useVocaStore } from '../../store/VocaStore';

const WordList = () => {
  interface Word {
    wordId: number;
    content: string;
    level: number;
    createdAt: Date | null; // 수정: 날짜 혹은 null일 수 있는 필드
    meaningDatas: {
      meaning: string;
      example: string;
      exampleKorean: string;
    }[];
  }

  
  const [words, setWords] = useState<Word[]>([]);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [isPronounceModalOpen, setPronounceModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const {vocaId,setVocaId} = useVocaStore() 

  useEffect(() => {
    const fetchWordDetails = async () => {
      try {
        if (vocaId != null) { // vocaId가 null이 아닐 경우에만 호출
          const fetchedWords = await userApi.getMyVocasDetail(vocaId); // API 호출
          console.log(fetchedWords)
          setWords(fetchedWords); // 받아온 데이터를 상태로 저장
        } else {
          const fetchedVocaId = await userApi.getMyVocas();
          setVocaId(fetchedVocaId);
          console.error('[WordList] vocaId가 null입니다.');
        }
      } catch (error) {
        console.error('[WordList] 단어 데이터를 가져오는 중 오류:', error);
      }
    };
  

    fetchWordDetails(); // 컴포넌트가 처음 렌더링될 때 API 호출
  }, [vocaId,setVocaId]);

  const handleExampleClick = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  const openPronounceModal = (text: string) => {
    setSelectedText(text);
    setPronounceModalOpen(true);
  };

  const closePronounceModal = () => {
    setPronounceModalOpen(false);
  };

  return (
    <div>
      {(!words || words.length === 0) &&  (
            <div>단어가 없습니다.</div>
          )}
      <div className={styles.wordlist}>
        <Link to="/wordlist/test">
          <button className={styles.testButton}>테스트</button>
        </Link>
        {/* <Link to={`/wordlist/test?vocaId=${vocaId}`}>
          <button className={styles.testButton}>테스트</button>
        </Link> */}
      </div>
      <div className={styles.container}>
        <div className={styles.wordlist2}>
          {words && words.length !== 0 && words.map((word, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardInner}>
                <div className={styles.cardContent}>
                  {flipped === index ? (
                    <>
                      <h3>{word.content}</h3>
                      <div className={styles.examplesContainer}>
                        {word.meaningDatas.map((meaning, meaningIndex) => (
                          <div key={meaningIndex} className={styles.exampleBox}>
                            <p>예문: {meaning.example}</p>
                            <p>예문 (한국어): {meaning.exampleKorean}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        className={styles.backButton}
                        onClick={() => setFlipped(null)}
                      >
                        단어 확인
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{word.content}</h3>
                      <div className={styles.meaningsContainer}>
                        {word.meaningDatas.map((meaning, meaningIndex) => (
                          <div key={meaningIndex} className={styles.meaningBox}>
                            <p>{meaning.meaning}</p>
                          </div>
                        ))}
                      </div>
                      <div className={styles.buttonContainer}>
                        <div
                          className={styles.iconButton}
                          title="발음 평가"
                          onClick={() => openPronounceModal(word.content)} // 발음 평가 모달 열기
                        >
                          <FaMicrophone />
                        </div>
                        <div className={styles.iconButton} title="발음 듣기">
                          <GiSpeaker />
                        </div>
                        <div
                          className={styles.iconButton}
                          title="예문 확인"
                          onClick={() => handleExampleClick(index)}
                        >
                          <FaBook />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      {/* 발음 평가 모달창 */}
      <PronounceModal
        isOpen={isPronounceModalOpen}
        onClose={closePronounceModal}
        text={selectedText}
        sourcePage={'WordList'}
      />
    </div>
  );
};

export default WordList;
