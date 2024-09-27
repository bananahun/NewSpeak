import React, { useState, useRef, useEffect } from 'react';
import useArticleApi from '../../apis/ArticleApi';
import { categories } from '../../utils/Categories';
import useCategoryStore from '../../store/CategoryStore';
import ArticleSlider from '../Slider/ArticleSlider';
import CategorySlider from '../Slider/CategorySlider';
import styles from './ArticleList.module.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface SliderRef {
  slickGoTo: (slide: number) => void;
  slickPrev: () => void;
  slickNext: () => void;
}

const ArticleList = () => {
  const { id: categoryId, setCategory } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [articleList, setArticleList] = useState([]);
  const sliderRef = useRef<SliderRef>(null);
  const categoryRef = useRef<SliderRef>(null);
  // const sliderRef = useRef(null);
  // const categoryRef = useRef(null);

  useEffect(() => {
    setSelectedCategory(categoryId);
    const fetchData = async () => {
      const data = await useArticleApi.getArticleList();
      setArticleList(data);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    if (categoryRef.current) {
      categoryRef.current.slickGoTo(index);
    }
    setCategory(index, categories[index]);
    setSelectedCategory(index);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
    if (categoryRef.current) {
      categoryRef.current.slickPrev();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
    if (categoryRef.current) {
      categoryRef.current.slickNext();
    }
  };

  const fetchMoreArticleList = (index: number) => {
    // 기사 더 불러오는 api
    console.log(index);
  };

  return (
    <div className={styles.articleList}>
      <div className={styles.categoryContainer}>
        <div className={styles.scrollButton} onClick={scrollLeft}>
          <MdKeyboardArrowLeft size={'40'} />
        </div>
        <div className={styles.categorySlider}>
          <CategorySlider
            categoryRef={categoryRef}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </div>
        <div className={styles.scrollButton} onClick={scrollRight}>
          <MdKeyboardArrowRight size={'40'} />
        </div>
      </div>
      <div className={styles.articleContainer}>
        <ArticleSlider
          articles={articleList}
          sliderRef={sliderRef}
          setSelectedCategory={setSelectedCategory}
          fetchMoreArticleList={fetchMoreArticleList}
        />
      </div>
    </div>
  );
};

export default ArticleList;
