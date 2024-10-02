import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./WordSlider.module.scss";

// Home 컴포넌트와 일관성을 유지하기 위해 FormattedWordData 사용
interface FormattedWordData {
  text: string;
  id: number;
  size: number; // WordCloud에서 사용하는 크기 필드
}

interface WordSliderProps {
  words: FormattedWordData[];
  onWordChange: (word: FormattedWordData) => void; // 단어 변경 시 호출될 핸들러
}

const WordSlider = ({ words, onWordChange }: WordSliderProps) => {
  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      onWordChange(words[newIndex]); // 슬라이드가 변경될 때 호출
    },
  };

  return (
    <div className={styles.wordSlider}>
      <Slider {...sliderSettings}>
        {words.map((word, index) => (
          <div key={index} className={styles.slide}>
            <h2 className={styles.wordText}>{word.text}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WordSlider;
