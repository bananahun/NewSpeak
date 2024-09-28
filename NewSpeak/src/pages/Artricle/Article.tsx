import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import useConversationStore from '../../store/ConversationStore';
import { getLogo } from '../../store/ThemeStore';
import { FaRegCircleQuestion, FaRegBookmark } from 'react-icons/fa6';
import styles from './Article.module.scss';
import { IconButton } from '@mui/material';

const Article = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const { clearConvData } = useConversationStore();
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
  }, [isTranslateOpen]);

  useEffect(() => {
    clearConvData();
  }, []);

  return (
    <>
      <div className={styles.articleHeader}>
        <span>
          <h1 className={styles.articleTitle}>{articleTitle}</h1>
          <IconButton onClick={e => toggleScrap(e)} className={styles.bookmark}>
            <FaRegBookmark />
          </IconButton>
        </span>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleBackground}>
          <img src={articleImageUrl || logo} />
          {isTranslateOpen ? <ArticleTranslation /> : <ArticleOriginal />}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <p onClick={toggleTranslate}>{activeTranslateMessage}</p>
        </button>
        <button onClick={goToConversation}>
          <p>회화 시작</p>
        </button>
      </div>
    </>
  );
};

export default Article;
