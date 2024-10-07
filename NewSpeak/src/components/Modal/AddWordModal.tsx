import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import useVocaStore from '../../store/VocaStore';
import styles from "./AddWordModal.module.scss";
import { useVocaStore } from "../../store/VocaStore";
import userApi from "../../apis/UserApi";
import { useSelectedSentenceStore } from "../../store/selectedSentenceStore";

interface AddWordModalProps {
  word: string;
  articleId: number;
  isOpen: boolean;
  onClose: () => void;
}

const AddWordModal = ({
  word,
  articleId,
  isOpen,
  onClose,
}: AddWordModalProps) => {
  const { vocaId, setVocaId } = useVocaStore();
  const { selectedSentenceId } =
    useSelectedSentenceStore();
  useEffect(() => {
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
  }, [vocaId, setVocaId]);
  if (!isOpen) return null;

  const handleAddWord = async () => { 
    // 클릭 이벤트 전파 방지

    if (!selectedSentenceId) {
      alert("단어 추가에 실패했습니다. 다시 시도해주세요");
      console.log("sentenceId 가져오기 실패");
      return;
    }

    if (!vocaId) {
      alert("단어 추가에 실패했습니다. 다시 시도해주세요");
      console.log("vocaId 가져오기 실패");
      return;
    }

    try {
      const response = await userApi.fetchMyWord(
        articleId,
        vocaId,
        word,
        selectedSentenceId
      );
      console.log(response);
      if (response && response.status === 200) {
        alert("단어가 성공적으로 추가되었습니다."); // 성공 메시지
      } else {
        alert("단어가 추가되지 않았습니다.");
      }
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Error adding word:", error);
      alert("단어 추가에 실패했습니다. 다시 시도해주세요."); // 오류 메시지
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>
          선택된 단어: <span>{word}</span>
        </p>
        <div>
          <button onClick={handleAddWord}>내 단어장에 추가하기</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddWordModal;
