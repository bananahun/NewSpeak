import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const ConversationModal = () => {
  const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValue(result);
    },
    lang: 'en-US',
  });

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <div>{value}</div>
      <button onMouseDown={listen} onMouseUp={stop}>
        mic
      </button>
      {listening && <div>음성인식중</div>}
    </div>
  );
};

export default ConversationModal;
