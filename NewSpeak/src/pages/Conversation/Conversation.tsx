import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArticleStore from '../../store/ArticleStore';
import AboutConv from '../../components/Conversation/AboutConv';
import ConversationSession from '../../components/Conversation/ConversationSession';
import ArticleInConversationModal from '../../components/Modal/ArticleInConversationModal';
import ConversationModal from '../../components/Modal/ConversationModal';
import styles from './Conversation.module.scss';
import Swal from 'sweetalert2';
import useConversationStore from '../../store/ConversationStore';
import useConversationApi from '../../apis/ConversationApi';
import { mySwal } from '../../components/Alert/CustomSwal';

const Conversation = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const { createReportThread } = useConversationApi();
  const { isGeneratingResponse, isGeneratingReport, clearConvData } =
    useConversationStore();
  const [step, setStep] = useState(1);
  const [articleTitle, setArticleTitle] = useState('');
  const [activeLeftButton, setActiveLeftButton] = useState('나가기');
  const [activeRightButton, setActiveRightButton] = useState('대화 시작하기');
  const [isConvStarted, setIsConvStarted] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  useEffect(() => {
    clearConvData();
  }, []);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <AboutConv />;
      default:
        return (
          <ConversationSession setConversationCount={setConversationCount} />
        );
    }
  };

  const reportAlert = () => {
    mySwal(
      '회화 끝내기.',
      '보고서를 생성할까요?',
      'question',
      '',
      true,
      true,
      '네',
      '아니요',
    ).then(async response => {
      if (response.isConfirmed) {
        Swal.fire({
          title: '회화 완료',
          text: 'SPEAKO가 보고서를 작성중입니다.',
          icon: 'info',
          footer: '완료될때까지 시간이 조금 걸릴 수 있어요.',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '취소',
          didOpen: () => {
            createReportThread();
            Swal.showLoading();
          },
        }).then(response => {
          if (response.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              '보고서 작성 취소',
              '보고서 작성을 취소하셨습니다.',
              'info',
            );
            return;
          }
          mySwal(
            '완료',
            '보고서가 성공적으로 생성되었습니다',
            'success',
            '',
            true,
            false,
            '확인',
            '',
          ).then(response => {
            if (response.isConfirmed) {
              navigate('/');
            }
          });
        });
      }
    });
  };

  useEffect(() => {
    if (!isGeneratingReport) {
      Swal.close();
    }
  }, [isGeneratingReport]);

  const leftButton = () => {
    if (step === 2) {
      mySwal(
        '돌아가기.',
        '저장하지 않고 나가시겠어요?',
        'question',
        '지금까지 진행된 대화가 사라질거에요.',
        true,
        true,
        '네',
        '아니요',
      ).then(response => {
        if (response.isConfirmed) {
          setStep(1);
          setConversationCount(0);
          clearConvData();
          setIsConvStarted(false);
        } else {
          return;
        }
      });
    } else {
      navigate('/article');
    }
  };

  const rightButton = () => {
    if (step === 2) {
      reportAlert();
    } else {
      if (isGeneratingReport) {
        return;
      }
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
  };

  const openModal = () => {
    setArticleModalOpen(true);
  };

  const closeModal = () => {
    setArticleModalOpen(false);
  };

  useEffect(() => {
    if (step === 2) {
      setActiveLeftButton('저장하지 않고 나가기');
      setActiveRightButton('회화 보고서 받기');
    } else {
      setActiveLeftButton('나가기');
      setActiveRightButton('대화 시작하기');
    }
  }, [step]);

  useEffect(() => {
    if (articleMeta) {
      setArticleTitle(articleMeta.title);
    }
  }, [articleMeta]);

  useEffect(() => {
    if (conversationCount > 10) {
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
      <div className={styles.conversation}>
        <div className={styles.conversationHeader}>
          <div className={styles.articleTitle}>
            Selected News <strong>|</strong> {articleTitle}
          </div>
          <div>
            <div className={styles.articleOriginalButton} onClick={openModal}>
              기사 전문 보기
            </div>
            {isConvStarted && (
              <div className={styles.count}>{conversationCount - 1} / 10</div>
            )}
          </div>
        </div>
        <div className={styles.conversationContainer}>{renderStep(step)}</div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={leftButton}>{activeLeftButton}</button>
        <button
          onClick={rightButton}
          disabled={isConvStarted && conversationCount <= 4}
        >
          {activeRightButton}
        </button>
        {isConvStarted && (
          <button
            disabled={!isUserTurn || isGeneratingResponse}
            onClick={userResponse}
          >
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
      {articleModalOpen && (
        <span className={styles.articleOriginal} onClick={closeModal}>
          <ArticleInConversationModal />
        </span>
      )}
    </>
  );
};

export default Conversation;
