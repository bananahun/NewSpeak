import React, { useState, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3-fixed';
import styles from './PronounceModal.module.scss';
import ReactDOM from 'react-dom';

interface PronounceModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const PronounceModal = ({ isOpen, onClose, text }: PronounceModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mp3Url, setMp3Url] = useState<string | null>(null); // MP3 URL 상태
  const recorderRef = useRef<MicRecorder | null>(null);

  const startRecording = async () => {
    const mp3Recorder = new MicRecorder({ bitRate: 64 });
    try {
      await mp3Recorder.start();
      recorderRef.current = mp3Recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('녹음 시작 중 오류 발생:', error);
    }
  };

  const stopRecording = async () => {
    if (recorderRef.current) {
      try {
        const [buffer, blob] = await recorderRef.current.stop().getMp3(); // MP3 데이터 가져오기
        const file = new File(buffer, 'recording.mp3', { type: blob.type });
        const mp3Url = URL.createObjectURL(file); // MP3 URL 생성
        setMp3Url(mp3Url);
        setIsRecording(false);
      } catch (error) {
        console.error('녹음 중지 중 오류 발생:', error);
      }
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{text}</p>

        {isRecording ? (
          <button onClick={stopRecording}>녹음 중지</button>
        ) : (
          <button onClick={startRecording}>녹음 시작</button>
        )}

        {mp3Url && (
          <div>
            <a href={mp3Url} download="recording.mp3">
              MP3 파일 다운로드
            </a>
            <audio controls src={mp3Url}></audio>
          </div>
        )}

        <button onClick={onClose}>닫기</button>
      </div>
    </div>,
    document.body,
  );
};

export default PronounceModal;
