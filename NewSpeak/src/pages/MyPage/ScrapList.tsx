import React from 'react';
import styles from './ScrapList.module.scss';
import ArticleListComponent from '../../components/Article/ArticleListComponent';

const ScrapList = () => {
  return (
    <div className={styles.scrapListContainer}>
      <div className={styles.scrapListHeader}>Scrapped Article List</div>
      <ArticleListComponent isScrap={true} />
    </div>
  );
};

export default ScrapList;
