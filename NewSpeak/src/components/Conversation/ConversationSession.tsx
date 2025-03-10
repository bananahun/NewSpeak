import React, { useEffect, useState } from 'react';
import useConversationApi from '../../apis/ConversationApi';
import useConversationStore from '../../store/ConversationStore';
import styles from './ConversationSession.module.scss';
import { LiaEdit } from 'react-icons/lia';
import { MdSend } from 'react-icons/md';

const ConversationSession = ({
  setConversationCount,
}: {
  setConversationCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { convRunId, createThread, postSpeechToThread, getResponseAudio } =
    useConversationApi();
  const {
    currentAnswer,
    conversation,
    recommendedAnswers,
    isGeneratingResponse,
    setCurrentAnswer,
    addConversation,
    clearConversation,
  } = useConversationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [activeAnswer, setActiveAnswer] = useState(currentAnswer);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [base64Mp3, setBase64Mp3] = useState('');
  const [activeResponse, setActiveResponse] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [toggleStates, setToggleStates] = useState<boolean[]>([]);
  const [showRecommend, setShowRecommend] = useState<boolean[]>([]);

  useEffect(() => {
    if (conversation && conversation.length > 0) {
      setToggleStates(prevStates => [
        ...prevStates,
        ...new Array(conversation.length - prevStates.length).fill(false),
      ]);
    }
  }, [conversation]);

  useEffect(() => {
    if (recommendedAnswers && recommendedAnswers.length > 0) {
      setShowRecommend(new Array(recommendedAnswers.length).fill(false));
    }
  }, [recommendedAnswers]);

  useEffect(() => {
    if (isFirstRender) {
      clearConversation();
      createThread();
      setIsFirstRender(false);
      setIsFirstMessage(true);
      return;
    }
  }, [isFirstRender]);

  useEffect(() => {
    setActiveAnswer(currentAnswer);
    setEditedAnswer(currentAnswer);
  }, [currentAnswer]);

  useEffect(() => {
    // console.log(recommendedAnswers);
  }, [recommendedAnswers]);

  useEffect(() => {
    // console.log(isGeneratingResponse);
  }, [isGeneratingResponse]);

  const submitAnswer = () => {
    addConversation('user', currentAnswer);
    setConversationCount(prev => prev + 1);
    postSpeechToThread(currentAnswer);
    setEditedAnswer('');
    setActiveAnswer('');
    setCurrentAnswer('');
    setIsFirstMessage(false);
  };

  useEffect(() => {
    if (isFirstMessage) {
      return;
    }
    if (convRunId) {
      const getBaseMp3 = async () => {
        try {
          const response = await getResponseAudio();
          setBase64Mp3(response.audio.body);
          setActiveResponse(response.dialog.assistant);
        } catch (error) {
          console.error(error);
        }
      };
      getBaseMp3();
    }
  }, [convRunId]);

  useEffect(() => {
    if (activeResponse) {
      addConversation('assistant', activeResponse);
      setConversationCount(prev => prev + 1);
    }
    setActiveAnswer('');
  }, [activeResponse]);

  const base64ToArrayBuffer = (base64: string) => {
    const binaryString = atob(base64);
    try {
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      console.error(error);
    }
  };

  const byteToMp3 = (byteData: string) => {
    const arrayBuffer = base64ToArrayBuffer(byteData);
    if (!arrayBuffer) return;
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url: string = URL.createObjectURL(blob);
    return url;
  };

  useEffect(() => {
    if (base64Mp3) {
      const audio = new Audio(byteToMp3(base64Mp3));
      audio.play();
      setBase64Mp3('');
    }
  }, [base64Mp3]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAnswer(editedAnswer);
  };

  const handleSaveEdit = () => {
    setCurrentAnswer(editedAnswer);
    setIsEditing(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value);

    if (hasKorean) {
      alert('한글은 입력할 수 없습니다.');
      const englishOnly = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
      setEditedAnswer(englishOnly);
    } else {
      setEditedAnswer(value);
    }
  };

  const toggleShowText = (index: number) => {
    setToggleStates(prev =>
      prev.map((state, idx) => (idx === index ? !state : state)),
    );
  };

  const handleShowRecommend = (index: number) => {
    setShowRecommend(prev =>
      prev.map((state, idx) => (idx === index ? !state : state)),
    );
  };

  return (
    <>
      <div className={styles.conversationSession}>
        {conversation.map((conv, index) => {
          return (
            <div key={index}>
              <div
                className={
                  conv.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                <div
                  className={styles.messageContent}
                  onClick={() => toggleShowText(index)}
                >
                  {conv.sender === 'user' ? (
                    <>{conv.content}</>
                  ) : (
                    <> {toggleStates[index] ? conv.content : '클릭해서 열기'}</>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.userMessageInput}>
        {activeAnswer && (
          <>
            {isEditing ? (
              <button onClick={handleSaveEdit}>완료</button>
            ) : (
              <div className={styles.buttonContainer}>
                <LiaEdit
                  size={25}
                  onClick={handleEdit}
                  className={styles.editButton}
                />
                <MdSend
                  size={25}
                  onClick={submitAnswer}
                  className={styles.submitButton}
                />
              </div>
            )}
            <div className={styles.messageContent}>
              {!isEditing ? (
                <>{editedAnswer}</>
              ) : (
                <textarea
                  value={editedAnswer}
                  onChange={e => handleTextChange(e)}
                  className={styles.editInput}
                  cols={Math.min(60, Math.max(editedAnswer.length, 40))}
                  rows={Math.max(2, editedAnswer.length / 120)}
                  maxLength={255}
                />
              )}
            </div>
          </>
        )}
      </div>
      {isGeneratingResponse && (
        <div className={styles.botMessage}>
          <div className={styles.messageContent}>
            SPEKAO가 대답을 준비중이에요
          </div>
        </div>
      )}
      {!isGeneratingResponse && (
        <div
          className={`${styles.recommendMessage} ${
            isFirstMessage ? styles.firstRecommend : ''
          }`}
        >
          <div className={styles.messageContent}>SPEAKO의 추천 문장</div>
          {recommendedAnswers.map((message, idx) => {
            return (
              <div
                key={idx}
                className={styles.messageContent}
                onClick={() => handleShowRecommend(idx)}
              >
                {showRecommend[idx] ? (
                  <>{`${idx + 1}. ${message}`}</>
                ) : (
                  <>{`${idx + 1}. 클릭해서 열기`}</>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ConversationSession;
