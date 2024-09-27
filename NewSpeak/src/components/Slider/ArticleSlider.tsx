import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useArticleStore from '../../store/ArticleStore';
import { categories } from '../../utils/Categories';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ArticleSlider.module.scss';

import { MdOutlineAddBox } from 'react-icons/md';

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  level: number;
  writer: string;
  publisher: string;
  publishedDate: number;
}

interface ArticleSliderProps {
  articles: Article[];
  sliderRef: any;
  setSelectedCategory: any;
  fetchMoreArticleList: (index: number) => void;
}

const ArticleSlider: React.FC<ArticleSliderProps> = ({
  articles,
  sliderRef,
  setSelectedCategory,
  fetchMoreArticleList,
}) => {
  const { articleMeta, setArticleMeta } = useArticleStore();
  const navigate = useNavigate();

  // categories 배열을 인덱스로 접근할 수 있도록 ID를 맞춤
  const categoryNames = ['All', ...categories.slice(1, 19)];

  const sliderSettings = {
    infinite: true,
    speed: 500,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setSelectedCategory(newIndex),
  };

  const loadArticleDetail = (
    event: React.MouseEvent<HTMLDivElement>,
    article: Article,
  ) => {
    setArticleMeta({
      id: article.id,
      title: article.title,
      imageUrl: article.imageUrl,
    });
    navigate('/article');
  };

  const articleList = articles ? articles : [];

  return (
    <Slider ref={sliderRef} {...sliderSettings}>
      {categoryNames.map((category, index) => {
        // 카테고리 ID와 인덱스가 매칭된 기사를 필터링
        const categoryArticles = articleList
          .filter(article => index === 0 || article.category === category) // index 0일 때 'All' 처리
          .slice(0, 5);

        return (
          <div key={index} className={styles.articleListContent}>
            {categoryArticles.length === 0
              ? '선택된 카테고리의 기사가 없습니다'
              : categoryArticles.map((article, idx) => (
                  <div
                    key={idx}
                    className={styles.articleCard}
                    onClick={e => loadArticleDetail(e, article)}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className={styles.articleImage}
                      />
                    </div>
                    <div className={styles.articleInfo}>
                      <p className={styles.title}>{article.title}</p>
                      <p className={styles.publishedDate}>
                        {new Date(article.publishedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            <div className={styles.loadMore}>
              <Link to="/articlelist">
                <MdOutlineAddBox
                  size={'50'}
                  className={styles.loadButton}
                  onClick={() => fetchMoreArticleList(index)}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default ArticleSlider;
