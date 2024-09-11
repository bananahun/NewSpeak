import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import { getLogo } from '../../store/ThemeStore';
import { FaRegCircleQuestion, FaRegBookmark } from 'react-icons/fa6';
import styles from './Article.module.scss';

const Article: React.FC = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const logo = getLogo();
  const [articleTitle, setArticleTitle] = useState('');
  const [articleImageUrl, setArticleImageUrl] = useState('');
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [activeTranslateMessage, setActiveTranslateMessage] =
    useState('전문 번역');

  const toggleTranslate = () => {
    setIsTranslateOpen(!isTranslateOpen);
  };

  const goToConversation = () => {
    if (articleMeta) {
      navigate('/conversation');
    }
  };

  const toggleScrap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 스크랩 api -> articleMeta.id
  };

  useEffect(() => {
    if (articleMeta) {
      setArticleTitle(articleMeta.title);
      setArticleImageUrl(articleMeta.imageUrl);
    }
  }, [articleMeta]);

  useEffect(() => {
    if (isTranslateOpen) {
      setActiveTranslateMessage('원문 보기');
    } else {
      setActiveTranslateMessage('전문 번역');
    }
  });

  return (
    <>
      <Nav />
      <main className={styles.main}>
        <div className={styles.articleContainer}>
          <div className={styles.articleBackground}>
            <h1 className={styles.articleTitle}>{articleTitle}</h1>
            <img src={articleImageUrl || logo} />
            {isTranslateOpen ? <ArticleTranslation /> : <ArticleOriginal />}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <span>
            <p onClick={toggleTranslate}>{activeTranslateMessage}</p>
          </span>
          <span onClick={goToConversation}>
            <p>회화 시작</p>
          </span>
          <button onClick={e => toggleScrap(e)}>
            <FaRegBookmark />
          </button>
          <button>
            <FaRegCircleQuestion />
          </button>
        </div>
      </main>
    </>
  );
};

export default Article;
