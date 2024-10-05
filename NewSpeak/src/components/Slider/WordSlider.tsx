import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { FaPause, FaPlay } from 'react-icons/fa6';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './WordSlider.module.scss';

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
  const sliderRef = useRef<any>(null);
  const isManualChange = useRef(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [newIndexBuffer, setNewIndexBuffer] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (words.length) {
      setIsLoading(false);
    }
  }, [words]);

  useEffect(() => {
    if (selectedWordIndex !== null && sliderRef.current) {
      isManualChange.current = true;
      sliderRef.current.slickGoTo(selectedWordIndex);
    }

    if (isSliding) {
      setNewIndexBuffer(selectedWordIndex);
    }
  }, [selectedWordIndex]);

  useEffect(() => {
    if (!isSliding && newIndexBuffer !== null) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(newIndexBuffer);
        setNewIndexBuffer(null);
      }, 100);
    }
  }, [isSliding]);

  useEffect(() => {
    console.log(newIndexBuffer);
  }, [newIndexBuffer]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      setAutoPlay(false);
    }
  }, [resetTrigger]);

  const sliderSettings = {
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 2500,
    arrows: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setIsSliding(true);
      if (!isManualChange.current) {
        onWordChange(words[newIndex]);
      }
      isManualChange.current = false;
    },
    afterChange: (index: number) => {
      setIsSliding(false);
    },
  };

  const handlePlayAutoChange = () => {
    setAutoPlay(true);
    sliderRef.current.slickPlay();
    setAnimationKey(prev => prev + 1);
  };

  const handleStopAutoChange = () => {
    setAutoPlay(false);
    sliderRef.current.slickPause();
    setAnimationKey(prev => prev + 1);
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className={styles.wordSlider}>
            <Slider {...sliderSettings} ref={sliderRef}>
              {words.map((word, index) => (
                <div key={index} className={styles.slide}>
                  <h2 className={styles.wordText}>{word.text}</h2>
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.slideButton} key={animationKey}>
            {autoPlay ? (
              <FaPause size={25} onClick={handleStopAutoChange} />
            ) : (
              <FaPlay size={25} onClick={handlePlayAutoChange} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default WordSlider;
