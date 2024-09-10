import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import ArticleDetail from '../../components/Article/ArticleDetail';
import useArticleStore from '../../store/ArticleStore';
import styles from './Article.module.scss';

const Article: React.FC = () => {
  const articleMeta = useArticleStore.getState().articleMeta;
  const [articleTitle, setArticleTitle] = useState('');

  useEffect(() => {
    if (articleMeta) {
      setArticleTitle(articleMeta.title);
    }
  }, [articleMeta]);

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.articleContainer}>
          <div className={styles.articleBackground}>
            <h1 className={styles.articleTitle}>{articleTitle}</h1>
            <ArticleDetail />
          </div>
        </div>
      </main>
    </>
  );
};

export default Article;
