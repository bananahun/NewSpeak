import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import { getLogo } from '../../store/ThemeStore';
import { FaRegCircleQuestion, FaRegBookmark,FaBookmark } from 'react-icons/fa6';
import styles from './Article.module.scss';
import { IconButton } from '@mui/material';
import userApi from '../../apis/UserApi'; // API 파일 임포트

const Article = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const logo = getLogo();
  const [articleTitle, setArticleTitle] = useState('');
  const [articleImageUrl, setArticleImageUrl] = useState('');
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [activeTranslateMessage, setActiveTranslateMessage] =
    useState('전문 번역');
  const [isScrapped, setIsScrapped] = useState(false); // 스크랩 상태 관리

  const toggleTranslate = () => {
    setIsTranslateOpen(!isTranslateOpen);
  };

  const goToConversation = () => {
    if (articleMeta) {
      navigate('/conversation');
    }
  };

  const toggleScrap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (articleMeta) {
      const articleId = articleMeta.id;

      if (isScrapped) {
        // 이미 스크랩된 기사면 삭제 요청
        await userApi.deleteMyArticles(articleId);
      } else {
        // 스크랩되지 않은 기사면 추가 요청
        await userApi.createMyArticles(articleId);
      }

      // 스크랩 상태를 반전시킴
      setIsScrapped(!isScrapped);
    }
  };

  useEffect(() => {
    // 기사가 있으면 해당 기사가 스크랩된 상태인지 확인
    const checkIfScrapped = async () => {
      if (articleMeta) {
        const articleId = articleMeta.id;
        const scrappedArticles = await userApi.getMyArticles();
        const isAlreadyScrapped = scrappedArticles.some(
          (article: { article_id: number }) => article.article_id === articleId
        );
        setIsScrapped(isAlreadyScrapped);
      }
    };

    checkIfScrapped();
  }, [articleMeta]);

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
      <div className={styles.articleHeader}>
        <span>
          <h1 className={styles.articleTitle}>{articleTitle}</h1>
          <IconButton onClick={e => toggleScrap(e)} className={styles.bookmark}>
            {isScrapped ? <FaBookmark /> : <FaRegBookmark />} {/* 스크랩 상태에 따라 아이콘 변경 */}
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
