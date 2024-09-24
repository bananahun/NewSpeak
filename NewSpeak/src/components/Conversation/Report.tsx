import React from 'react';
import styles from './Report.module.scss';

const data = {
  content: {
    title: '대화 보고서',
    score: '90',
    feedback: {
      vocabulary: {
        score: 18,
        feedback:
          '사용된 어휘는 주제에 적합했습니다. 기술 관련 용어들이 잘 사용되었습니다.',
      },
      expressiveness: {
        score: 18,
        feedback:
          '대화는 흥미롭고 표현력이 풍부했습니다. 기술 혁신에 대한 열정이 잘 드러났습니다.',
      },
      comprehension: {
        score: 18,
        feedback:
          '양쪽 참가자가 주제에 대한 명확한 이해를 보여주었으며, 통찰력 있는 교환이 이루어졌습니다.',
      },
      clarity: {
        score: 18,
        feedback:
          '대화는 명확하고 이해하기 쉬웠으며, 응답에 모호함이 없었습니다.',
      },
      grammar: {
        score: 18,
        feedback:
          '문법은 대부분 정확했으며, 이해를 방해하지 않는 사소한 오류가 있었습니다.',
      },
    },
    suggestions: [
      '더 많은 기술 용어를 포함하여 논의를 강화하세요.',
      '특정 기술의 예를 사용하여 포인트를 설명하세요.',
      '더 깊은 참여를 위해 개방형 질문을 장려하세요.',
    ],
    conversation: [
      {
        user: 'can i talk to you',
        assistant: null,
      },
      {
        user: null,
        assistant:
          'Of course! What would you like to discuss about the latest technology trends and innovations?',
      },
      {
        user: 'can i talk to you',
        assistant: null,
      },
      {
        user: null,
        assistant:
          'Of course! What would you like to discuss about the latest technology trends and innovations?',
      },
      {
        user: 'can i talk to you',
        assistant: null,
      },
      {
        user: null,
        assistant:
          'Of course! What would you like to discuss about the latest technology trends and innovations?',
      },
      {
        user: 'can i talk to you',
        assistant: null,
      },
      {
        user: null,
        assistant:
          'Of course! What would you like to discuss about the latest technology trends and innovations?',
      },
    ],
  },
};

const Report = () => {
  const { title, score, feedback, suggestions, conversation } = data.content;

  return (
    <div className={styles.reportContainer}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>
        {/* Left side with feedback and scores */}
        <div className={styles.leftSide}>
          <table className={styles.feedbackTable}>
            <thead>
              <tr>
                <th>항목</th>
                <th>내용</th>
                <th>점수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>어휘</td>
                <td>{feedback.vocabulary.feedback}</td>
                <td>{feedback.vocabulary.score}</td>
              </tr>
              <tr>
                <td>표현력</td>
                <td>{feedback.expressiveness.feedback}</td>
                <td>{feedback.expressiveness.score}</td>
              </tr>
              <tr>
                <td>이해력</td>
                <td>{feedback.comprehension.feedback}</td>
                <td>{feedback.comprehension.score}</td>
              </tr>
              <tr>
                <td>명료성</td>
                <td>{feedback.clarity.feedback}</td>
                <td>{feedback.clarity.score}</td>
              </tr>
              <tr>
                <td>문법</td>
                <td>{feedback.grammar.feedback}</td>
                <td>{feedback.grammar.score}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>총점</td>
                <td>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className={styles.fontSize}>
                        {suggestion}
                      </div>
                    ))}
                  </ul>
                </td>
                <td>{score}</td>
              </tr>
            </tfoot>
          </table>

          <div className={styles.suggestions}></div>
        </div>

        {/* Right side with conversation */}
        <div className={styles.rightSide}>
          <h2>대화 내용</h2>
          <div className={styles.conversation}>
            {conversation.map((item, index) => (
              <div key={index} className={styles.message}>
                {item.user && (
                  <div className={styles.userMessage}>
                    <strong>나: </strong>
                    {item.user}
                  </div>
                )}
                {item.assistant && (
                  <div className={styles.assistantMessage}>
                    <strong>AI: </strong>
                    {item.assistant}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
