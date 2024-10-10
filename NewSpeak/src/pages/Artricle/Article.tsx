import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleOriginal from '../../components/Article/ArticleOriginal';
import ArticleTranslation from '../../components/Article/ArticleTranslation';
import useAuthStore from '../../store/AuthStore';
import useArticleStore from '../../store/ArticleStore';
import useConversationStore from '../../store/ConversationStore';
import { useWordSelectorState } from '../../store/ModalStore';
import WordSelector from '../../components/Modal/WordSelector';
import ArticleAbout from '../../components/Article/ArticleAbout';
import WSHelpAbout from '../../components/Article/WSHelpAbout';
import useArticleApi from '../../apis/ArticleApi';
import {
  FaRegBookmark,
  FaBookmark,
  FaRegCircleQuestion,
} from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { IconButton } from '@mui/material';
import styles from './Article.module.scss';
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
  const { tutorialActive, setTutorialActive } = useAuthStore();
  const { articleMeta, setArticleMeta } = useArticleStore();
  const { clearConvData } = useConversationStore();
  const { isOpen, setIsOpen } = useWordSelectorState();
  const [wordSelectorMode, setWordSelectorMode] = useState(false);
  const [articleData, setArticleData] = useState<ArticleDetail | null>(null);
  const [articleSentences, setArticleSentences] =
    useState<ArticleSentences | null>(null);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [activeTranslateMessage, setActiveTranslateMessage] =
    useState('전문 번역');
  const [isScrapped, setIsScrapped] = useState(false); // 스크랩 상태 관리
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpenHelpModal, setIsOpenHelpModal] = useState(false);
  const [isOpenWSHelpModal, setIsOpenWSHelpModal] = useState(false);
  const [helpButtonAccent, setHelpButtonAccent] = useState(true);
  const [wordSelectorButtonAccent, setWordSelectorButtonAccent] =
    useState(true);

  const getOrDefault = (value: any, defaultValue: string = '') => {
    return value || defaultValue;
  };

  const getOrDefaultDate = (value: any, defaultValue: string = '') => {
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return new Date(value).toDateString();
    }
    return value || defaultValue;
  };

  const openWordSelector = () => {
    setWordSelectorMode(true);
    setIsOpen(true);
  };

  const closeWordSelector = () => {
    setWordSelectorMode(false);
    setIsOpen(false);
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
    if (!articleMeta?.imageUrl) {
      setArticleMeta(response);
    }
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
    setHelpButtonAccent(false);
    setTutorialActive(false);
  };

  const openWSHelpModal = () => {
    setIsOpenWSHelpModal(true);
  };

  const closeWSHelpModal = () => {
    setIsOpenWSHelpModal(false);
    setWordSelectorButtonAccent(false);
    setTutorialActive(false);
  };

  useEffect(() => {
    if (articleData) return;
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
    console.log(tutorialActive);
    setHelpButtonAccent(tutorialActive);
    setWordSelectorButtonAccent(tutorialActive);
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
                {/* <span className={styles.overallTitleTooltip}>
                  {getOrDefault(articleMeta?.title)}
                </span> */}
              </h1>
              <div className={styles.publishDetail}>
                <p>{getOrDefault(articleData?.writer)}</p>
                <strong>|</strong>
                <p>{getOrDefaultDate(articleData?.publishedDate)}</p>
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
              className={`${styles.helpButton} ${helpButtonAccent ? styles.accent : ''}`}
            >
              <FaRegCircleQuestion />
            </div>
            <IconButton
              onClick={openWordSelector}
              onMouseEnter={openWSHelpModal}
              onMouseLeave={closeWSHelpModal}
              className={`${styles.wordSelectorButton} ${wordSelectorButtonAccent ? styles.accent : ''}`}
            >
              <IoSearch />
            </IconButton>
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
      {isOpenHelpModal && <ArticleAbout />}
      {isOpenWSHelpModal && <WSHelpAbout />}
      {wordSelectorMode && (
        <WordSelector closeWordSelector={closeWordSelector} />
      )}
      <div id="modal-root"></div>
    </>
  );
};

export default Article;
