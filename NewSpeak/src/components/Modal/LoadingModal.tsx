import React from 'react';
import styles from './LoadingModal.module.scss';

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className={styles.loadingDots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default LoadingModal;
