import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./WordSearch.module.scss";
import useWordApi from "../../apis/ArticleApi";
import userApi from "../../apis/UserApi";
import { useVocaStore } from "../../store/VocaStore";
import { mySwal } from "../Alert/CustomSwal";

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
  const { vocaId,setVocaId } = useVocaStore();
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [searchedWords, setSearchedWords] = useState<WordData[]>([]); // 검색된 단어 데이터 상태
  const [searchedWord, setSearchedWord] = useState<{
    id: number;
    word: string;
  } | null>(null); // 검색된 단어의 ID 및 단어 정보
  const animationClass = isFirstRender
    ? ""
    : isOpen
    ? styles.open
    : styles.close;

  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false); // 경고창 표시 상태

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
    if (!vocaId) {
      const fetchVocaIds = async () => {
        try {
          const fetchedVocaId = await userApi.getMyVocas();
          setVocaId(fetchedVocaId); // 가져온 데이터를 상태에 저장
        } catch (error) {
          console.error("Error fetching vocaIds:", error);
        }
      };

      fetchVocaIds();
    }
    try {
      if (!vocaId) return;
      const response = await userApi.getMyWord(vocaId, searchedWord.word); // 단어의 id 사용
      if (response && response.status === 200) {
        mySwal(
          "단어장추가",
          `"${searchedWord.word}" 단어가 단어장에 추가되었습니다!`,
          "success"
        );
      } else {
        mySwal(
          "단어장추가",
          `"${searchedWord.word}" 단어를 추가하는 데 실패했습니다.`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error adding word to voca:", error);
      mySwal("단어장추가", "단어를 추가하는 데 실패했습니다.", "error");
    }
  };

  // API 호출 및 검색 결과 업데이트 함수
  const handleSearch = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e) e.preventDefault(); // Enter 키의 기본 동작을 방지

    // 검색어 유효성 검사 (handleSearch 함수 내에서만 검사)
    if (!searchQuery.trim()) {
      mySwal("단어 검색 실패", "단어에 공백이 들어있습니다.", "error");
      return;
    }

    // 한국어 검색어 필터링 (영어 알파벳으로만 이루어진 단어가 아니면 처리)
    const koreanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanRegex.test(searchQuery)) {
      mySwal("단어 검색 실패", "단어에 한국어가 들어있습니다.", "error");
      return;
    }

    try {
      const response = await useWordApi.getWord(searchQuery);
      const result = response;

      if (result && result.id && Array.isArray(result.data)) {
        setSearchedWord({ id: result.id, word: result.word });
        setSearchedWords(result.data);
      } else {
        mySwal("단어 검색 실패", "다른 단어를 입력해주세요.", "error");
        setSearchedWord(null);
        setSearchedWords([]);
      }
    } catch (error) {
      console.error("Error fetching word data:", error);
      setSearchedWord(null);
      setSearchedWords([]);
    }
  };

  // 알림 표시 함수 (중복 방지)
  const showAlert = (message: string) => {
    if (isAlertVisible) return; // 이미 알림이 표시 중일 때는 중복 표시하지 않음
    setIsAlertVisible(true);
    alert(message);
    setTimeout(() => setIsAlertVisible(false), 1000); // 1초 후 중복 방지 해제
  };

  return (
    <>
      <div className={styles.searchBarOverlay} onClick={handleOverlayClick}>
        <div
          className={`${styles.searchBar} ${animationClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className={styles.inputBar}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(e); // Enter 키 입력 시 검색 실행
              }}
            />
            <button
              onClick={() => handleSearch()}
              className={styles.searchButton}
            >
              <FaSearch size={"20"} />
            </button>
          </div>

          {searchedWord && (
            <div className={styles.addButtonContainer}>
              <button className={styles.addButton} onClick={addWordToVoca}>
                "{searchedWord.word}"을/를 단어장에 추가
              </button>
            </div>
          )}

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
