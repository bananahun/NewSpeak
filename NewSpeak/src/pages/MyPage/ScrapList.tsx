import React, { useEffect, useState } from 'react';
import styles from './ScrapList.module.scss';
import CategoryArticleList from '../../components/Article/CategoryArticleList';

const ScrapList = () => {
  return (
    <div className={styles.scrapListContainer}>
      <div className={styles.scrapListHeader}>스크랩한 기사 목록</div>
      <CategoryArticleList categoryId={0} isScrap={true} />
    </div>
  );
};

export default ScrapList;
