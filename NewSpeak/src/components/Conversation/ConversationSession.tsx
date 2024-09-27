import React, { useEffect, useState } from 'react';
import ConversationModal from '../Modal/ConversationModal';
import useConversationApi from '../../apis/ConversationApi';
import styles from './ConversationSession.module.scss';

interface Conversation {
  sender: 'user' | 'assistant';
  content: string;
}

const ConversationSession = ({
  conversationCount,
}: {
  conversationCount: number;
}) => {
  // const [conv, setConv] = useState(false);
  const {
    createThread,
    postSpeechToThread,
    getResponseAudio,
    createReportThread,
    postReportDetail,
    generateReport,
  } = useConversationApi();
  const [conversation, setConversation] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversation([
      {
        sender: 'user',
        content:
          'What are the main points of the latest news article on climate change?',
      },
      {
        sender: 'assistant',
        content:
          'The article discusses the rising global temperatures, the impact of climate change on ecosystems, and the urgent need for international cooperation to address the crisis.',
      },
      {
        sender: 'user',
        content: 'Who are the key figures mentioned in the article?',
      },
      {
        sender: 'assistant',
        content:
          'The article mentions several key figures, including climate scientists, government officials, and activists advocating for policy changes.',
      },
      {
        sender: 'user',
        content:
          'What actions are suggested to combat climate change in the article?',
      },
      {
        sender: 'assistant',
        content:
          'The article suggests several actions, such as reducing carbon emissions, investing in renewable energy, and implementing stricter regulations on pollutants.',
      },
      {
        sender: 'user',
        content:
          'Are there any statistics or studies referenced in the article?',
      },
      {
        sender: 'assistant',
        content:
          'Yes, the article references a recent study indicating that global temperatures could rise by 1.5 degrees Celsius by 2030 if current trends continue.',
      },
      {
        sender: 'user',
        content:
          'What are the potential consequences if these issues are not addressed?',
      },
      {
        sender: 'assistant',
        content:
          'The article warns of severe consequences, including increased natural disasters, loss of biodiversity, and negative impacts on human health and food security.',
      },
    ]);
  }, []);

  useEffect(() => {}, [conversationCount]);

  const flow1 = () => {
    createThread();
  };

  // 여기 STT자리

  const flow2 = () => {
    const answer = 'Hello, GPT.';
    postSpeechToThread(answer);
    // answer에 있는 내용 sender: user / content: text 해서 conversation에 저장
    // STT 구현 해야함
  };

  const flow3 = () => {
    getResponseAudio();
    // text 받아서 {sender: assistant}, {content: text} conversation 저장
    // mp3파일 bite형식 파일 변환 해야함
  };

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
      {/* {conv && <ConversationModal />} */}
    </div>
  );
};

export default ConversationSession;
