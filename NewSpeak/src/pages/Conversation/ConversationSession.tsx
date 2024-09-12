import React from 'react';
import styles from './ConversationSession.module.scss';

const ConversationSession = ({
  conversationCount,
}: {
  conversationCount: number;
}) => {
  return (
    <div>
      <div className={styles.count}>{conversationCount} / 10</div>
      <h2>Conversation Session</h2>
    </div>
  );
};

export default ConversationSession;
