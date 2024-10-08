import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

interface WordSearchModalProps {
  open: boolean;
  onClose: () => void;
}

const WordSearchModal: React.FC<WordSearchModalProps> = ({ open, onClose }) => {
  const { vocaId, setVocaId } = useVocaStore();
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [searchedWords, setSearchedWords] = useState<WordData[]>([]); // 검색된 단어 데이터 상태
  const [searchedWord, setSearchedWord] = useState<{
    id: number;
    word: string;
  } | null>(null); // 검색된 단어의 ID 및 단어 정보

  // 검색어 입력 핸들러
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 단어장에 단어 추가 함수
  const addWordToVoca = async () => {
    if (!searchedWord) return; // 단어가 없는 경우 실행하지 않음
    if (!vocaId) {
      try {
        const fetchedVocaId = await userApi.getMyVocas();
        setVocaId(fetchedVocaId); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching vocaIds:", error);
      }
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
  const handleSearch = async () => {
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

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        {/* 검색 입력 필드 및 버튼 */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={styles.inputBar}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            className={styles.searchButton}
          >
            <FaSearch size={"20"} />
          </Button>
        </div>

        {/* 단어를 단어장에 추가하는 버튼 */}
        {searchedWord && (
          <div className={styles.addButtonContainer}>
            <Button onClick={addWordToVoca} variant="outlined" color="primary">
              "{searchedWord.word}"을/를 단어장에 추가
            </Button>
          </div>
        )}

        {/* 검색 결과 표시 */}
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
      </Box>
    </Modal>
  );
};

export default WordSearchModal;
