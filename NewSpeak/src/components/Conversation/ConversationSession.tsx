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
  const {
    convRunId,
    recommendedAnswers,
    createThread,
    postSpeechToThread,
    getResponseAudio,
  } = useConversationApi();
  const {
    currentAnswer,
    conversation,
    setCurrentAnswer,
    addConversation,
    clearConversation,
  } = useConversationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [activeAnswer, setActiveAnswer] = useState(currentAnswer);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [byteMp3, setByteMp3] = useState('');
  const [activeResponse, setActiveResponse] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      clearConversation();
      // createThread();
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
    console.log(recommendedAnswers);
  }, [recommendedAnswers]);

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
      const getByteMp3 = async () => {
        try {
          const response = await getResponseAudio();
          setByteMp3(response.audio.body.byteArray);
          setActiveResponse(response.dialog.assistant);
        } catch (error) {
          console.error(error);
        }
      };
      getByteMp3();
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
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const byteToMp3 = (byteData: string) => {
    const arrayBuffer = base64ToArrayBuffer(byteData);
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const url: string = URL.createObjectURL(blob);
    return url;
  };

  useEffect(() => {
    if (byteMp3) {
      const audio = new Audio(byteToMp3(byteMp3));
      audio.play();
      setByteMp3('');
    }
  }, [byteMp3]);

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

  // TODO: 추천받은 문장 어디 띄우지
  // TODO: 녹음다하고 수정할 때 영어만 적을 수 있게 + 255자 제한
  // TODO: mp3 플레이될 때 녹음하기 비활성화 찍기
  // TODO: ai 응답 스크립트 on / off
  return (
    <>
      <div className={styles.converSationSession}>
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
                <div className={styles.messageContent}>{conv.content}</div>
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
    </>
  );
};

export default ConversationSession;
