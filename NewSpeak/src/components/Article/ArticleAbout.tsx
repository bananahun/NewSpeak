import React from 'react';
import styles from './ArticleAbout.module.scss';

const ArticleAbout = () => {
  return (
    <div className={styles.helpModal}>
      <div className={styles.helpModalTitle}>NewSpeak 100% 활용 방법</div>
      <div className={styles.helpModalContent}>
        <li>
          기사 상단에는, 기사의 정보와 <strong>난이도</strong>가 있어요
        </li>
        <li>
          문장을 <strong>좌클릭</strong>하면 문장을 듣고, 발음을 평가해볼 수
          있어요
        </li>
        <li>
          문장을 <strong>우클릭</strong>하면, 문장의 번역이 나와요
        </li>
        <li>
          <strong>전문 번역</strong>버튼을 누르면, 기사 전체 번역을 볼 수 있어요
        </li>
        <li>
          <strong>회화 시작</strong>버튼을 누르고, 바로 회화를 시작해보세요!
        </li>
      </div>
    </div>
  );
};

export default ArticleAbout;
