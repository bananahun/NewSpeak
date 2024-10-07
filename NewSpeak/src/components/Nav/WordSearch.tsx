import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./WordSearch.module.scss";
import useWordApi from "../../apis/ArticleApi"; // Word API를 불러오기 위한 import
import userApi from "../../apis/UserApi"; // 단어장 추가 API를 불러오기 위한 import
import { useVocaStore } from "../../store/VocaStore";
interface WordData {
  meaning: string;
  example: string;
  exampleKorean: string;
}

interface WordSearchProps {
  isOpen: boolean;
  isFirstRender: boolean;
  toggleWordSearchBar: () => void;
}

const WordSearch = ({
  isOpen,
  isFirstRender,
  toggleWordSearchBar,
}: WordSearchProps) => {
  const { vocaId } = useVocaStore();
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [searchedWords, setSearchedWords] = useState<WordData[]>([]); // 검색된 단어 데이터 상태 (의미, 예문 등)
  const [searchedWord, setSearchedWord] = useState<{
    id: number;
    word: string;
  } | null>(null); // 검색된 단어의 ID 및 단어 정보
  const animationClass = isFirstRender
    ? ""
    : isOpen
    ? styles.open
    : styles.close;

  const handleOverlayClick = () => {
    toggleWordSearchBar();
  };

  // 검색어 입력 핸들러
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 단어장에 단어 추가 함수
  const addWordToVoca = async () => {
    if (!searchedWord) return; // 단어가 없는 경우 실행하지 않음

    try {
      const response = await userApi.getMyWord(vocaId, searchedWord.word); // 단어의 id 사용
      if (response && response.status === 200) {
        alert(`"${searchedWord.word}" 단어가 단어장에 추가되었습니다!`);
      } else {
        alert(`"${searchedWord.word}" 단어를 추가하는 데 실패했습니다.`);
      }
    } catch (error) {
      console.error("Error adding word to voca:", error);
      alert("단어를 추가하는 중 오류가 발생했습니다.");
    }
  };

  // API 호출 및 검색 결과 업데이트 함수
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 검색어가 빈 값일 때는 실행하지 않음

    try {
      // getWord API 호출
      const response = await useWordApi.getWord(searchQuery);
      const result = response;
      console.log(result, "[API] 호출된 데이터 확인");

      // 결과가 있으면 검색된 단어 객체에 저장하고, 의미 리스트를 설정
      if (result && result.id && Array.isArray(result.data)) {
        setSearchedWord({ id: result.id, word: result.word }); // 단어의 id와 word 저장
        setSearchedWords(result.data); // 단어 리스트 저장
      } else {
        setSearchedWord(null); // 검색 결과가 없으면 초기화
        setSearchedWords([]);
      }
    } catch (error) {
      console.error("Error fetching word data:", error);
      setSearchedWord(null); // 에러 발생 시 초기화
      setSearchedWords([]); // 리스트 초기화
    }
  };

  return (
    <>
      <div className={styles.searchBarOverlay} onClick={handleOverlayClick}>
        <div
          className={`${styles.searchBar} ${animationClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.inputContainer}>
            {/* 검색어 입력 인풋 */}
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchQuery}
              onChange={handleSearchInputChange} // 입력 값 업데이트
              className={styles.inputBar}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(); // Enter 키 입력 시 검색 실행
              }}
            />
            {/* 검색 버튼 */}
            <button onClick={handleSearch} className={styles.searchButton}>
              <FaSearch size={"20"} />
            </button>
          </div>

          {/* 단어장에 단어 추가 버튼 */}
          {searchedWord && (
            <div className={styles.addButtonContainer}>
              <button className={styles.addButton} onClick={addWordToVoca}>
                "{searchedWord.word}"을/를 단어장에 추가
              </button>
            </div>
          )}

          {/* 검색 결과 리스트 */}
          <div className={styles.searchedWords}>
            {searchedWords.length > 0 ? (
              searchedWords.map((wordData, index) => (
                <div key={index} className={styles.wordCard}>
                  <div className={styles.wordMeaning}>
                    <strong>뜻:</strong> {wordData.meaning}
                  </div>
                  <hr className={styles.divider} />
                  <div className={styles.wordExample}>
                    <strong>예문:</strong> {wordData.example}
                  </div>
                  <hr className={styles.divider} />
                  <div className={styles.wordExampleKorean}>
                    <strong>해석:</strong> {wordData.exampleKorean}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordSearch;
