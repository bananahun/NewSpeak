import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./WordSearch.module.scss";
import useWordApi from "../../apis/ArticleApi"; // Word API를 불러오기 위한 import

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
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [searchedWords, setSearchedWords] = useState<WordData[]>([]); // 검색된 단어 데이터 상태
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

  // API 호출 및 검색 결과 업데이트 함수
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 검색어가 빈 값일 때는 실행하지 않음

    try {
      // getWord API 호출
      const result = await useWordApi.getWord(searchQuery);
      console.log(result, "[API] 호출된 데이터 확인");

      // result가 비어 있거나 data 필드가 없다면 빈 배열을 설정
      if (result && Array.isArray(result)) {
        setSearchedWords(result); // 데이터가 배열 형태일 때만 상태 설정
      } else {
        setSearchedWords([]);
      }
    } catch (error) {
      console.error("Error fetching word data:", error);
      setSearchedWords([]); // 에러 발생 시 빈 리스트로 초기화
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
