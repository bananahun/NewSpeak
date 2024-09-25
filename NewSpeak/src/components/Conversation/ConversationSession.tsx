import React, { useEffect, useState } from 'react';
import ConversationModal from '../Modal/ConversationModal';
import styles from './ConversationSession.module.scss';

const mockConv = {
  conversations: [
    {
      user: 'What are the main points of the latest news article on climate change?',
      assistant:
        'The article discusses the rising global temperatures, the impact of climate change on ecosystems, and the urgent need for international cooperation to address the crisis.',
    },
    {
      user: 'Who are the key figures mentioned in the article?',
      assistant:
        'The article mentions several key figures, including climate scientists, government officials, and activists advocating for policy changes.',
    },
    {
      user: 'What actions are suggested to combat climate change in the article?',
      assistant:
        'The article suggests several actions, such as reducing carbon emissions, investing in renewable energy, and implementing stricter regulations on pollutants.',
    },
    {
      user: 'Are there any statistics or studies referenced in the article?',
      assistant:
        'Yes, the article references a recent study indicating that global temperatures could rise by 1.5 degrees Celsius by 2030 if current trends continue.',
    },
    {
      user: 'What are the potential consequences if these issues are not addressed?',
      assistant:
        'The article warns of severe consequences, including increased natural disasters, loss of biodiversity, and negative impacts on human health and food security.',
    },
  ],
};

// conv:
// {
//    conversations: [
//        {
//            "user": 유저응답,
//            "assistant":gpt응답
//        }
//    ]
// }

const ConversationSession = ({
  conversationCount,
}: {
  conversationCount: number;
}) => {
  // const [conv, setConv] = useState(false);

  // articleId를 담아 threadId 생성 POST요청
  // /api/v1/conversation/dialog, params: {articleId: number}
  // ThreadResponse
  // {id: thread_~~~}

  // articleId로 생성한 threadId 로 POST요청
  // POST: DialogAnswer /api/v1/conversation/dialog/{threadId}
  // {answer: "STT변환한 text"}
  // run ID를 반환
  // res: {id: "run_ajdhjda"}

  // threadId, runId를 담아서 GET 요청
  // GET: /api/v1/conversation/dialog/{threadId}/{runId}
  // TTS 변환한 AI 대답 반환.mp3
  // text는 ?

  // 레포트 생성을 위한 Thread id를 받기 위해 POST 요청
  // POST: /api/v1/conversation/report
  // 보고서 생성을 위한 새로운 threadId 반환
  // res: {id: "thread_dahgjhadg"}

  // 레포트 생성 threadId, 대화 목록을 담아서 POST 요청
  // POST: /api/v1/conversation/report/{threadId}
  // 레포트가 담긴 run Id
  // res: {id: "run_djanbjf"}

  // 레포트 확인하는 POST 요청
  // POST: /api/v1/conversation/report/{threadId}/{runId}
  // res: 레포트.JSON
  return (
    <div>
      <div className={styles.converSationSession}>
        {mockConv.conversations
          .slice(0, (conversationCount - 1) / 2)
          .map((conv, index) => {
            return (
              <div key={index}>
                <div className={styles.userMessage}>
                  <div className={styles.messageContent}>{conv.user}</div>
                </div>
                <div className={styles.botMessage}>
                  <div className={styles.messageContent}>{conv.assistant}</div>
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
