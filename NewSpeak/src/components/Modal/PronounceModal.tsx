import React, { useState, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3-fixed';
import styles from './PronounceModal.module.scss';
import ReactDOM from 'react-dom';
import userApi from '../../apis/UserApi';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import LoadingModal from './LoadingModal';

interface PronounceModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  sourcePage: string;
}

const PronounceModal = ({
  isOpen,
  onClose,
  text,
  sourcePage,
}: PronounceModalProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mp3Url, setMp3Url] = useState<string | null>(null); // MP3 URL 상태
  const [proScore, setProScore] = useState<number | null>(null); // 발음 점수 상태
  const recorderRef = useRef<MicRecorder | null>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [showScore, setShowScore] = useState(true);

  const toggleView = () => {
    setShowScore(prev => !prev);
  };

  const startRecording = async () => {
    setMp3Url(null);
    if (sourcePage !== 'WordList') {
      const mp3Recorder = new MicRecorder({ bitRate: 128 });
      try {
        await mp3Recorder.start();
        recorderRef.current = mp3Recorder;
        setIsRecording(true);
      } catch (error) {
        console.error('녹음 시작 중 오류 발생:', error);
      }
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        language: 'en-US',
        continuous: true,
      });
      setIsRecording(true);
    }
  };

  const stopRecording = async () => {
    if (sourcePage !== 'WordList') {
      if (recorderRef.current) {
        try {
          const [buffer, blob] = await recorderRef.current.stop().getMp3(); // MP3 데이터 가져오기
          const file = new File(buffer, 'recording.mp3', { type: blob.type });
          const mp3Url = URL.createObjectURL(file); // MP3 URL 생성
          setMp3Url(mp3Url);
          setIsRecording(false);
          const response = await userApi.fetchPronounce(file);
          setProScore(response.proScore);
          // console.log('발음 점수:', response.proScore); // proScore 응답 처리
        } catch (error) {
          console.error('녹음 중지 중 오류 발생:', error);
        }
      }
    } else {
      SpeechRecognition.stopListening();
      setIsRecording(false);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 클릭한 요소가 modalContent가 아닐 경우에만 onClose 호출
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const getScoreColor = (score: number | null) => {
    if (score === null) return;
    if (score <= 2) return '#909090'; // 기본 색상
    if (score <= 3) return '#f44336'; // 빨간색
    if (score <= 4) return '#ff9800'; // 주황색
    return '#4caf50'; // 초록색
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.modalContent}>
          <h2 className={styles.header}>발음 테스트</h2>
          <button className={styles.closeButton} onClick={onClose}>
            x
          </button>

          {!mp3Url ? (
            <>
              <p>{text}</p>
              {isRecording && <p style={{ marginTop: '10px' }}>녹음중...</p>}
            </>
          ) : (
            <>
              {showScore ? (
                <div>
                  <p
                    className={styles.point}
                    style={{ color: getScoreColor(proScore) }}
                  >
                    {proScore ? proScore : <LoadingModal />}/5
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.audioContainer}>
                    {mp3Url && <audio controls src={mp3Url}></audio>}
                  </div>
                </>
              )}
            </>
          )}
          <div className={styles.buttonContainer}>
            {mp3Url && !showScore && (
              <a
                className={styles.pronounceButton}
                href={mp3Url}
                download="recording.mp3"
              >
                다운로드
              </a>
            )}
            {mp3Url && (
              <button className={styles.pronounceButton} onClick={toggleView}>
                {showScore ? '오디오 듣기' : '점수 보기'}
              </button>
            )}
            {isRecording ? (
              <button
                className={styles.pronounceButton}
                onClick={stopRecording}
              >
                발음테스트 중지
              </button>
            ) : (
              <button
                className={styles.pronounceButton}
                onClick={startRecording}
              >
                발음테스트 시작
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.modalOverlayShadow}></div>
    </>,
    document.getElementById('modal-root'),
  );
};

export default PronounceModal;
