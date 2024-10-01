import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./WordSlider.module.scss";

interface FormattedWordData {
  text: string;
  id: number;
  size: number;
}

interface WordSliderProps {
  words: FormattedWordData[];
  onWordChange: (word: FormattedWordData) => void;
  selectedWordIndex: number | null;
  resetTrigger: number;
}

const WordSlider = ({
  words,
  onWordChange,
  selectedWordIndex,
  resetTrigger,
}: WordSliderProps) => {
  const sliderRef = useRef<any>(null); // 슬라이더 참조
  const isManualChange = useRef(false); // 수동 변경을 감지하는 플래그

  useEffect(() => {
    // WordCloud에서 단어를 선택할 때 해당 단어로 이동
    if (selectedWordIndex !== null && sliderRef.current) {
      isManualChange.current = true; // 수동 변경 플래그 설정
      sliderRef.current.slickGoTo(selectedWordIndex); // 특정 단어로 슬라이더 이동
    }
  }, [selectedWordIndex]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPause(); // 슬라이딩 일시정지
      // sliderRef.current.slickPlay(); // 슬라이딩 재시작
    }
  }, [resetTrigger]);

  const sliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      // 수동 변경이 아닐 때만 단어 변경 이벤트 호출
      if (!isManualChange.current) {
        onWordChange(words[newIndex]);
      }
      isManualChange.current = false; // 수동 변경 플래그 초기화
    },
  };

  return (
    <div className={styles.wordSlider}>
      <Slider {...sliderSettings} ref={sliderRef}>
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
