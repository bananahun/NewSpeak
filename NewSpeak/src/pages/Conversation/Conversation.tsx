import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArticleStore from '../../store/ArticleStore';
import AboutConv from '../../components/Conversation/AboutConv';
import ConversationSession from '../../components/Conversation/ConversationSession';
import ArticleModal from '../../components/Modal/ArticleModal';
import ConversationModal from '../../components/Modal/ConversationModal';
import styles from './Conversation.module.scss';
import Swal from 'sweetalert2';
import useConversationStore from '../../store/ConversationStore';

const Conversation = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const { currentAnswer } = useConversationStore();
  const [step, setStep] = useState(1);
  const [articleTitle, setArticleTitle] = useState('');
  const [activeLeftButton, setActiveLeftButton] = useState('나가기');
  const [activeRightButton, setActiveRightButton] = useState('대화 시작하기');
  const [isConvStarted, setIsConvStarted] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <AboutConv />;
      default:
        return <ConversationSession conversationCount={conversationCount} />;
    }
  };

  const reportAlert = () => {
    Swal.fire({
      title: '작성 완료.',
      text: '바로 보러 가시겠어요?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    });
  };

  const leftButton = () => {
    if (step === 2) {
      // 저장하지 않고 나갈거냐는 알림 메시지
      setStep(1);
      setConversationCount(0);
      setIsConvStarted(false);
    } else {
      navigate('/article');
    }
  };

  const rightButton = () => {
    if (step === 2) {
      reportAlert();
    } else {
      setStep(2);
      setIsConvStarted(true);
      setConversationCount(1);
    }
  };

  const userResponse = () => {
    setRecordModalOpen(true);
  };

  const submitResponse = () => {
    setRecordModalOpen(false);
    setConversationCount(conversationCount => conversationCount + 1);
    console.log(currentAnswer);
  };

  const toggleModal = () => {
    setArticleModalOpen(!articleModalOpen);
  };

  useEffect(() => {
    if (step === 2) {
      setActiveLeftButton('저장하지 않고 나가기');
      setActiveRightButton('회화 보고서 받기');
    } else {
      setActiveLeftButton('나가기');
      setActiveRightButton('대화 시작하기');
    }
  });

  useEffect(() => {
    if (articleMeta) {
      setArticleTitle(articleMeta.title);
    }
  }, [articleMeta]);

  useEffect(() => {
    if (conversationCount >= 10) {
      setIsUserTurn(false);
      setConversationCount(10);
    }
    if (conversationCount / 2 > 0) {
      setIsUserTurn(true);
    } else {
      setIsUserTurn(!isUserTurn);
    }
  }, [conversationCount]);

  return (
    <>
      <div className={styles.conversationHeader}>
        <div className={styles.articleTitle}>
          Selected News <strong>|</strong> {articleTitle}
        </div>
        <div>
          <div className={styles.articleOriginalButton} onClick={toggleModal}>
            기사 전문 보기
          </div>
          {isConvStarted && (
            <div className={styles.count}>{conversationCount} / 10</div>
          )}
        </div>
      </div>
      <div className={styles.conversationContainer}>
        {articleModalOpen && (
          <span className={styles.articleOriginal}>
            <ArticleModal />
          </span>
        )}
        {renderStep(step)}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={leftButton}>{activeLeftButton}</button>
        <button onClick={rightButton}>{activeRightButton}</button>
        {isConvStarted && (
          <button disabled={!isUserTurn} onClick={userResponse}>
            녹음하기
          </button>
        )}
      </div>
      {isConvStarted && recordModalOpen && (
        <span className={styles.recordModal}>
          <ConversationModal
            submitResponse={submitResponse}
            setRecordModalOpen={setRecordModalOpen}
          />
        </span>
      )}
    </>
  );
};

export default Conversation;
