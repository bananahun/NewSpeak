import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WordList.module.scss';
import { FaMicrophone, FaBook } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import PronounceModal from '../Modal/PronounceModal';
import userApi from '../../apis/UserApi'; 
import { useVocaStore } from '../../store/VocaStore';
import WordModal from '../Modal/WordModal';

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
  const [isWordModalOpen, setWordModalOpen] = useState(false); // 모달 상태 추가
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const {vocaId,setVocaId} = useVocaStore() 
  const nav = useNavigate()

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

  const openWordModal = (word: Word) => {
    setSelectedWord(word); // 선택한 단어 저장
    setWordModalOpen(true); // 모달 열기
  };

  const closeWordModal = () => {
    setWordModalOpen(false); // 모달 닫기
    setSelectedWord(null); // 선택한 단어 초기화
  };


  const handleTestButtonClick = () => {
    if (words.length <= 10) {
      alert('단어 수가 10개 이하입니다. 더 많은 단어를 추가하세요.');
    } else {
      nav('/wordlist/test')
    }
  };

  const handleWordDeleteClick = async (wordId: number) => {
    if (!vocaId) {
      return
    }
    if (window.confirm('이 단어를 삭제하시겠습니까?')) {
      try {
        await userApi.deleteMyWord(vocaId, wordId);
        // 단어 삭제 후 상태 업데이트
        setWords(prevWords => prevWords.filter(word => word.wordId !== wordId));
        alert('단어가 삭제되었습니다.');
      } catch (error) {
        console.error('[WordList] 단어 삭제 중 오류:', error);
        alert('단어 삭제 중 오류가 발생했습니다.');
      }
    }
  };


  return (
    <div>
      {(!words || words.length === 0) &&  (
            <div>단어가 없습니다.</div>
          )}
      <div className={styles.wordlist}>
          <button className={styles.testButton}  onClick={handleTestButtonClick}>
            테스트
          </button>
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
                          onClick={() => openWordModal(word)}
                        >
                          <FaBook />
                        </div>
                        <div
                          className={styles.iconButton}
                          title="단어 삭제"
                          onClick={() => handleWordDeleteClick(word.wordId)} // 단어 삭제 핸들러 호출
                        >
                          🗑️
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
      <WordModal
        isOpen={isWordModalOpen}
        onClose={closeWordModal}
        word={selectedWord?.content || ''}
        meanings={selectedWord?.meaningDatas || []} // 단어의 모든 의미를 모달로 전달
      />
    </div>
  );
};

export default WordList;
