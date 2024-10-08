import React from 'react';
import styles from './WSHelpAbout.module.scss';

const WSHelpAbout = () => {
  return (
    <div className={styles.helpModal}>
      <div className={styles.helpModalTitle}>Word Select Mode 사용 방법</div>
      <div className={styles.helpModalContent}>
        <li>
          돋보기 버튼을 눌러, <strong>Word Select Mode</strong>를 켤 수 있어요
        </li>
        <li>
          기사 내의 단어를 <strong>드래그</strong>해서 선택해보세요
        </li>
        <li>
          조금 더 편하게, <strong>더블 클릭</strong>해도 선택할 수 있어요
        </li>
        <li>
          선택한 단어가 사전에 있다면, <strong>나만의 단어장</strong>에 추가할
          수 있어요
        </li>
        <li>
          단어를 선택하거나, <strong>우클릭</strong> 해서 종료 할 수 있어요
        </li>
      </div>
    </div>
  );
};

export default WSHelpAbout;
