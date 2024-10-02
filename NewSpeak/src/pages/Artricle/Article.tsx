import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import useConversationStore from '../../store/ConversationStore';
import useArticleApi from '../../apis/ArticleApi';
import { getLogo } from '../../store/ThemeStore';
import { FaRegBookmark,FaBookmark } from 'react-icons/fa6';
import styles from './Article.module.scss';
import { IconButton } from '@mui/material';
import userApi from '../../apis/UserApi'; // API 파일 임포트

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
  const [isScrapped, setIsScrapped] = useState(false); // 스크랩 상태 관리

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

  const toggleScrap = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (articleMeta) {
      const articleId = articleMeta.id;

      try {
        if (isScrapped) {
          // 스크랩 해제
          await userApi.deleteMyArticles(articleId);
        } else {
          // 스크랩 추가
          await userApi.createMyArticles(articleId);
        }

        // DB의 상태를 다시 확인
        checkIfScrapped(articleId);

      } catch (error) {
        console.error('스크랩 처리 중 오류 발생:', error);
      }
    }
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

  const checkIfScrapped = async () => {
    if (articleMeta) {
      const articleId = articleMeta.id;
  
      // API 호출
      const response = await userApi.getMyArticles(0,10000);
      // 응답 데이터에서 content 배열을 추출
      const scrappedArticles = response.data;  // 여기서 content 배열을 할당
  
      // some() 메서드를 사용하여 해당 articleId가 있는지 확인
      const isAlreadyScrapped = scrappedArticles.some(
        (article: { id: number }) => article.id === articleId
      );
  
      setIsScrapped(isAlreadyScrapped);
    }
  };
  
 // 페이지 로드 시 스크랩 상태 확인
  useEffect(() => {
    if (articleMeta && articleMeta.id) {
      checkIfScrapped(articleMeta.id); // DB에서 스크랩 상태 확인
    }
  }, [articleMeta]);


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
            {isScrapped ? <FaBookmark /> : <FaRegBookmark />} {/* 스크랩 상태에 따라 아이콘 변경 */}
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
