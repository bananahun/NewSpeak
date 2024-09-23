import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { categories } from '../../utils/Categories';
import useCategoryStore from '../../store/CategoryStore';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './CategorySlider.module.scss';

interface CategorySliderProps {
  categoryRef: any;
  selectedCategory: number | null;
  handleCategoryClick: (index: number) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categoryRef,
  selectedCategory,
  handleCategoryClick,
}) => {
  const { id } = useCategoryStore();
  const sliderSettings = {
    infinite: true,
    speed: 200,
    initialSlide: id,
    slidesToShow: 5,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    draggable: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      handleCategoryClick(newIndex);
    },
  };

  return (
    <Slider ref={categoryRef} {...sliderSettings}>
      {categories.map((category, index) => (
        <div key={category}>
          <button
            className={`${styles.categoryButton} ${
              selectedCategory === index ? styles.active : ''
            }`}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </button>
        </div>
      ))}
    </Slider>
  );
};

export default CategorySlider;
