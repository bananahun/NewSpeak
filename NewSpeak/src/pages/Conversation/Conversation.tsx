import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import useArticleStore from '../../store/ArticleStore';
import AboutConv from './AboutConv';
import ConversationSession from './ConversationSession';
import styles from './Conversation.module.scss';

const Conversation = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const [step, setStep] = useState(1);
  const [articleTitle, setArticleTitle] = useState('');
  const [activeLeftButton, setActiveLeftButton] = useState('나가기');
  const [activeRightButton, setActiveRightButton] = useState('대화 시작하기');
  const [conversationStart, setConversationStart] = useState(false);
  const [conversationCount, setConversationCount] = useState(0);

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return <AboutConv />;
      default:
        return <ConversationSession conversationCount={conversationCount} />;
    }
  };

  const leftButton = () => {
    if (step === 2) {
      // 저장하지 않고 나갈거냐는 알림 메시지
      setStep(1);
      setConversationStart(false);
      setConversationCount(0);
    } else {
      navigate(-1);
    }
  };

  const rightButton = () => {
    if (step === 1) {
      // 대화 시작 알림 메시지
      setConversationStart(true);
      setStep(2);
    } else {
      if (conversationCount === 10) {
        // 회화 보고서 받기
      } else {
        setConversationCount(conversationCount + 1);
      }
    }
  };

  useEffect(() => {
    if (step === 2) {
      setActiveLeftButton('저장하지 않고 나가기');
      if (conversationCount === 10) {
        setActiveRightButton('회화 보고서 받기');
      } else {
        setActiveRightButton('다음 대화');
      }
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

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.articleTitle}>
          Selected News <strong>|</strong> {articleTitle}
        </div>
        <div className={styles.conversationContainer}>{renderStep(step)}</div>
        <div className={styles.buttonContainer}>
          <button onClick={leftButton}>{activeLeftButton}</button>
          <button onClick={rightButton}>{activeRightButton}</button>
        </div>
      </main>
    </>
  );
};

export default Conversation;
