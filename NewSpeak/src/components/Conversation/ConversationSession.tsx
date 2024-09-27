import React, { useEffect, useState } from 'react';
import useConversationApi from '../../apis/ConversationApi';
import useConversationStore from '../../store/ConversationStore';
import styles from './ConversationSession.module.scss';
import { LiaEdit } from 'react-icons/lia';
import { MdSend } from 'react-icons/md';

interface Conversation {
  sender: 'user' | 'assistant';
  content: string;
}

const ConversationSession = ({
  conversationCount,
}: {
  conversationCount: number;
}) => {
  const {
    convRunId,
    isAudioReceived,
    createThread,
    postSpeechToThread,
    getResponseAudio,
    createReportThread,
    postReportDetail,
    generateReport,
  } = useConversationApi();
  const { currentAnswer, setCurrentAnswer } = useConversationStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeAnswer, setActiveAnswer] = useState(currentAnswer);
  const [editedAnswer, setEditedAnswer] = useState('');
  const [conversation, setConversation] = useState<Conversation[]>([]);

  useEffect(() => {
    setActiveAnswer(currentAnswer);
    setEditedAnswer(currentAnswer);
    console.log(activeAnswer);
  }, [currentAnswer]);

  useEffect(() => {
    if (conversationCount === 1) {
      flow1();
      return;
    }
  }, []);

  const flow1 = () => {
    createThread();
  };

  const flow2 = () => {
    setConversation(prev => [
      ...prev,
      { sender: 'user', content: currentAnswer },
    ]);
    postSpeechToThread(currentAnswer);
    setEditedAnswer('');
    setActiveAnswer('');
    setCurrentAnswer('');
  };

  useEffect(() => {
    if (convRunId) {
      getResponseAudio();
    }
  }, [convRunId]);

  useEffect(() => {
    if (isAudioReceived) {
      console.log('audio');
    }
  });

  const flow4 = () => {
    createReportThread();
  };

  const flow5 = () => {
    postReportDetail(conversation);
  };

  const flow6 = () => {
    generateReport();
    // 보고서 만드는 함수 호출, 완료 여부 어케암
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAnswer(editedAnswer);
  };

  const handleSaveEdit = () => {
    setCurrentAnswer(editedAnswer);
    setIsEditing(false);
  };

  return (
    <div>
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
      <div className={styles.userMessage}>
        {activeAnswer && (
          <>
            {isEditing ? (
              <button onClick={handleSaveEdit}>완료</button>
            ) : (
              <>
                <LiaEdit
                  size={25}
                  onClick={handleEdit}
                  className={styles.editButton}
                />
                <MdSend
                  size={25}
                  onClick={flow2}
                  className={styles.submitButton}
                />
              </>
            )}
            <div className={styles.messageContent}>
              {!isEditing ? (
                <div>{editedAnswer}</div>
              ) : (
                <textarea
                  value={editedAnswer}
                  onChange={e => setEditedAnswer(e.target.value)}
                  className={styles.editInput}
                  cols={Math.min(120, Math.max(editedAnswer.length, 40))}
                  rows={Math.max(2, editedAnswer.length / 120)}
                  maxLength={255}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationSession;
