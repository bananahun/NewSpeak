import React, { useEffect, useState } from 'react';
import styles from './ScrapList.module.scss';
import ArticleListComponent from '../../components/Article/ArticleListComponent';

const ScrapList = () => {
  return (
    <div className={styles.scrapListContainer}>
      <div className={styles.scrapListHeader}>스크랩한 기사 목록</div>
      <ArticleListComponent isScrap={true} />
    </div>
  );
};

export default ScrapList;
