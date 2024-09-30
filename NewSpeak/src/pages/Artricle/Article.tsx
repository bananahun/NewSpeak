import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import useConversationStore from '../../store/ConversationStore';
import useArticleApi from '../../apis/ArticleApi';
import { getLogo } from '../../store/ThemeStore';
import { FaRegCircleQuestion, FaRegBookmark } from 'react-icons/fa6';
import styles from './Article.module.scss';
import { IconButton } from '@mui/material';

interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  contentKr: string;
  categoryId: number;
  articleUrl: string;
  imageUrl: string;
  level: number;
  publishedDate: string;
  publisher: string;
  writer: string;
  sentences: string[];
}

interface Sentence {
  id: number;
  content: string;
  translation: string;
}

interface ArticleSentences {
  sentences: string[];
  translatedSentences: string[];
}

const Article = () => {
  const navigate = useNavigate();
  const articleMeta = useArticleStore.getState().articleMeta;
  const { clearConvData } = useConversationStore();
  const logo = getLogo();
  const [articleData, setArticleData] = useState<ArticleDetail | null>(null);
  const [articleSentences, setArticleSentences] =
    useState<ArticleSentences | null>(null);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [activeTranslateMessage, setActiveTranslateMessage] =
    useState('전문 번역');

  const getOrDefault = (value: any, defaultValue: string = 'Loading..') => {
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return new Date(value).toDateString();
    }
    return value || defaultValue;
  };

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

  const handleGetArticleDetail = async (articleId: number) => {
    const response = await useArticleApi.getArticleDetail(articleId);
    setArticleData(response);

    if (response && response.sentences) {
      const sentences = response.sentences.map(
        (sentence: Sentence) => sentence.content,
      );
      const translatedSentences = response.sentences.map(
        (sentence: Sentence) => sentence.translation,
      );

      setArticleSentences({ sentences, translatedSentences });
    }
  };

  useEffect(() => {
    if (articleMeta) {
      handleGetArticleDetail(articleMeta.id);
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
        <div className={styles.articlePublishInfo}>
          <p>
            Publisher <strong> | </strong>
            {getOrDefault(articleData?.publisher)}
          </p>
          <h1 className={styles.articleTitle}>
            {getOrDefault(articleMeta?.title)}
          </h1>
          <div className={styles.publishDetail}>
            <p>{getOrDefault(articleData?.writer)}</p>
            <strong>|</strong>
            <p>{getOrDefault(articleData?.publishedDate)}</p>
          </div>
          <p>
            Lv <strong>|</strong> {getOrDefault(articleData?.level)}
          </p>
        </div>
        <span className={styles.overallTitleTooltip}>
          {getOrDefault(articleMeta?.title)}
        </span>
        <IconButton onClick={e => toggleScrap(e)} className={styles.bookmark}>
          <FaRegBookmark />
        </IconButton>
      </div>
      <div className={styles.articleContainer}>
        <div className={styles.articleBackground}>
          <div className={styles.articleDetail}>
            <div className={styles.articleImageContainer}>
              <img
                className={styles.articleImage}
                src={articleMeta?.imageUrl || logo}
              />
            </div>
            {isTranslateOpen ? (
              <ArticleTranslation
                sentences={articleSentences?.sentences || []}
                translatedSentences={
                  articleSentences?.translatedSentences || []
                }
              />
            ) : (
              <ArticleOriginal
                sentences={articleSentences?.sentences || []}
                translatedSentences={
                  articleSentences?.translatedSentences || []
                }
              />
            )}
          </div>
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
