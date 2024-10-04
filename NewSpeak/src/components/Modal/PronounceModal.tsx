import React, { useState, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3-fixed';
import styles from './PronounceModal.module.scss';
import ReactDOM from 'react-dom';
import userApi from '../../apis/UserApi';
import 'regenerator-runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

interface PronounceModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  sourcePage:string;
}

const PronounceModal = ({ isOpen, onClose, text, sourcePage }: PronounceModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mp3Url, setMp3Url] = useState<string | null>(null); // MP3 URL 상태
  const [proScore, setProScore] = useState<number | null>(null); // 발음 점수 상태
  const recorderRef = useRef<MicRecorder | null>(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  


  const startRecording = async () => {
    if (sourcePage === 'WordList') {
    const mp3Recorder = new MicRecorder({ bitRate: 128 });
    try {
      await mp3Recorder.start();
      recorderRef.current = mp3Recorder;
      setIsRecording(true);
    } catch (error) {
      console.error('녹음 시작 중 오류 발생:', error);
    }
  } else {
    SpeechRecognition.startListening({
      language: 'en-US',
      continuous: true,
    });
    setIsListening(true);
  }
  };

  const stopRecording = async () => {
    if (sourcePage === 'WordList') {
    if (recorderRef.current) {
      try {
        const [buffer, blob] = await recorderRef.current.stop().getMp3(); // MP3 데이터 가져오기
        const file = new File(buffer, 'recording.mp3', { type: blob.type });
        const mp3Url = URL.createObjectURL(file); // MP3 URL 생성
        setMp3Url(mp3Url);
        setIsRecording(false);
        const response = await userApi.fetchPronounce(file);
        setProScore(response.proScore);
        console.log('발음 점수:', response.proScore); // proScore 응답 처리
      } catch (error) {
        console.error('녹음 중지 중 오류 발생:', error);
      }
    }
  } else {
    SpeechRecognition.stopListening();
        setIsListening(false);
  }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
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

        {proScore !== null && (
          <div>
            <p>발음 점수: {proScore}</p>
          </div>
        )}
        {transcript !== null && (
          <div>
            <p>발음 text: {transcript}</p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default PronounceModal;
