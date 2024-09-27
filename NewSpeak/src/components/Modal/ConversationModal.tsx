import React, { useState, useEffect } from 'react';
import useConversationStore from '../../store/ConversationStore';
import styles from './ConversationModal.module.scss';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';

const ConversationModal = ({
  submitResponse,
}: {
  submitResponse: () => void;
}) => {
  const { setCurrentAnswer } = useConversationStore();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.code === 'Space' && !isListening) {
        SpeechRecognition.startListening({
          language: 'en-US',
          continuous: true,
        });
        setIsListening(true);
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
      if (event.code === 'Space' && isListening) {
        SpeechRecognition.stopListening();
        setIsListening(false);
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isListening]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTranscript(transcript);
  };

  const handleSaveEdit = () => {
    setCurrentAnswer(editedTranscript);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedTranscript(transcript);
  }, [transcript]);

  return (
    <div className={styles.conversationModal}>
      <div className={styles.modalHeader}>
        <p>Spacebar를 꾹 누른 채로, SPEAKO에게 보낼 메세지를 녹음 하세요!</p>
      </div>
      <div className={styles.modalContainer}>
        {!isEditing ? (
          <div>{editedTranscript}</div>
        ) : (
          <input
            type="text"
            value={editedTranscript}
            onChange={e => setEditedTranscript(e.target.value)}
            className={styles.editInput}
          />
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.sttButton}>
          {isListening ? (
            <CiMicrophoneOn size="48" />
          ) : (
            <CiMicrophoneOff size="48" />
          )}
        </button>
        <div className={styles.activeButtons}>
          <button onClick={resetTranscript}>다시 녹음할래요</button>
          {isEditing ? (
            <button onClick={handleSaveEdit}>완료</button>
          ) : (
            <button onClick={handleEdit}>조금만 수정할래요</button>
          )}
          <button onClick={submitResponse}>잘 녹음 됐어요</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
