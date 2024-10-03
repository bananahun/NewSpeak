import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useArticleStore from '../../store/ArticleStore';
import useConversationStore from '../../store/ConversationStore';
import useArticleApi from '../../apis/ArticleApi';
import { getLogo } from '../../store/ThemeStore';
import {
  FaRegBookmark,
  FaBookmark,
  FaRegCircleQuestion,
} from 'react-icons/fa6';
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
  sentences: ArticleSentences[];
}

interface Sentence {
  id: number;
  content: string;
  translation: string;
}

interface ArticleSentences {
  sentences: Sentence[];
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpenHelpModal, setIsOpenHelpModal] = useState(false);

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

        checkIfScrapped();

        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      } catch (error) {
        console.error('스크랩 처리 중 오류 발생:', error);
      }
    }
  };

  const handleGetArticleDetail = async (articleId: number) => {
    const response = await useArticleApi.getArticleDetail(articleId);
    setArticleData(response);

    if (response && response.sentences) {
      const sentences = response.sentences;
      const translatedSentences = response.sentences.map(
        (sentence: Sentence) => sentence.translation,
      );

      setArticleSentences({ sentences, translatedSentences });
    }
  };

  const checkIfScrapped = async () => {
    if (articleMeta) {
      const articleId = articleMeta.id;

      try {
        // API 호출
        const response = await userApi.getMyArticles(0, 10000);

        let scrappedArticles = [];

        if (response && response.data) {
          scrappedArticles = response.data;
        }

        // some() 메서드를 사용하여 해당 articleId가 있는지 확인
        const isAlreadyScrapped = scrappedArticles.some(
          (article: { id: number }) => article.id === articleId,
        );

        setIsScrapped(isAlreadyScrapped);
      } catch (error) {
        console.error('스크랩 확인 중 오류:', error);
      }
    }
  };

  const openHelpModal = () => {
    setIsOpenHelpModal(true);
  };

  const closeHelpModal = () => {
    setIsOpenHelpModal(false);
  };

  useEffect(() => {
    if (articleMeta && articleMeta.id) {
      handleGetArticleDetail(articleMeta.id);
      checkIfScrapped(); // DB에서 스크랩 상태 확인
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
      <div className={styles.articlePage}>
        <div className={styles.articleHeader}>
          <div className={styles.articlePublishInfo}>
            <p>
              Publisher <strong> | </strong>
              {getOrDefault(articleData?.publisher)}
            </p>
            <div className={styles.articleTitleWrapper}>
              <h1 className={styles.articleTitle}>
                {getOrDefault(articleMeta?.title)}
              </h1>
              <span className={styles.overallTitleTooltip}>
                {getOrDefault(articleMeta?.title)}
              </span>
              <div className={styles.publishDetail}>
                <p>{getOrDefault(articleData?.writer)}</p>
                <strong>|</strong>
                <p>{getOrDefault(articleData?.publishedDate)}</p>
              </div>
              <p>
                Lv <strong>|</strong> {getOrDefault(articleData?.level)}
              </p>
            </div>
          </div>
          <div className={styles.articleButtonContainer}>
            <div
              onMouseEnter={openHelpModal}
              onMouseLeave={closeHelpModal}
              className={styles.helpButton}
            >
              <FaRegCircleQuestion />
            </div>
            <IconButton
              onClick={e => toggleScrap(e)}
              className={`${styles.bookmark} ${
                isAnimating ? styles.animate : ''
              }`}
            >
              {isScrapped ? <FaBookmark /> : <FaRegBookmark />}{' '}
              {/* 스크랩 상태에 따라 아이콘 변경 */}
            </IconButton>
          </div>
        </div>
        <div className={styles.articleBackground}>
          <div className={styles.articleContainer}>
            {!isTranslateOpen && (
              <div className={styles.articleImageContainer}>
                <img
                  className={styles.articleImage}
                  src={articleMeta?.imageUrl || logo}
                />
              </div>
            )}
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
      {/* <div className={styles.helpModal}>도움말을 띄오보자</div> */}
      {isOpenHelpModal && (
        <div className={styles.helpModal}>
          <div className={styles.helpModalTitle}>NewSpeak 100% 사용법</div>
          <div className={styles.helpModalContent}>
            <li>기사 제목 아래에는, 기사의 난이도가 있어요</li>
            <li>
              문장을 <strong>좌클릭</strong>하면 문장을 듣고, 발음을 평가해볼 수
              있어요
            </li>
            <li>
              문장을 <strong>우클릭</strong>하면, 문장의 번역이 나와요
            </li>
            <li>
              <strong>전문 번역</strong>버튼을 누르면, 기사 전체 번역을 볼 수
              있어요
            </li>
            <li>
              <strong>회화 시작</strong>버튼을 누르고, 바로 회화를 시작해보세요!
            </li>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
