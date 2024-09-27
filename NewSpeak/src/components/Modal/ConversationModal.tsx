import React, { useState, useEffect } from 'react';
import useConversationStore from '../../store/ConversationStore';
import styles from './ConversationModal.module.scss';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { CiMicrophoneOff, CiMicrophoneOn } from 'react-icons/ci';
import spacebar from '../../assets/spacebar.png';
import spacebarWhite from '../../assets/spacebarWhite.png';
import useThemeStore from '../../store/ThemeStore';

const ConversationModal = ({
  submitResponse,
  setRecordModalOpen,
}: {
  submitResponse: () => void;
  setRecordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setCurrentAnswer } = useConversationStore();
  const { theme } = useThemeStore();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [spacebarLogo, setSpacebarLogo] = useState(spacebar);

  const closeModal = () => {
    setIsListening(false);
    setCurrentAnswer('');
    resetTranscript();
    setRecordModalOpen(false);
  };

  useEffect(() => {
    if (theme === 'light') {
      setSpacebarLogo(spacebar);
    } else {
      setSpacebarLogo(spacebarWhite);
    }
  }, [theme]);

  useEffect(() => {
    setCurrentAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    setCurrentAnswer('');
    resetTranscript();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isListening) {
        SpeechRecognition.startListening({
          language: 'en-US',
          continuous: true,
        });
        setIsListening(true);
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
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

  return (
    <div className={styles.conversationModal}>
      <div className={styles.modalHeader}>
        <div className={styles.title}>
          <p>Press </p>
          <img
            src={spacebarLogo}
            alt="'spacebar'"
            className={styles.spacebar}
          />
        </div>
        <button onClick={() => closeModal()}>x</button>
      </div>
      <div className={styles.modalContainer}>{transcript}</div>
      <div className={styles.buttonContainer}>
        <div className={styles.sttButton}>
          {isListening ? (
            <CiMicrophoneOn size="48" />
          ) : (
            <CiMicrophoneOff size="48" />
          )}
        </div>
        <div className={styles.activeButtons}>
          <button onClick={resetTranscript}>다시 녹음할래요</button>
          <button onClick={submitResponse}>잘 녹음 됐어요</button>
        </div>
      </div>
    </div>
  );
};

export default ConversationModal;
