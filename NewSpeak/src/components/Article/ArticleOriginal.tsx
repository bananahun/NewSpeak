import React, { useState, useEffect } from 'react';
import useThemeStore from '../../store/ThemeStore';
import useArticleStore from '../../store/ArticleStore';
import styles from './ArticleOriginal.module.scss';
import translateIconBlack from '../../assets/translate.png';
import translateIconWhite from '../../assets/translate-white.png';
import { IoMicSharp, IoVolumeMedium } from 'react-icons/io5';
import PronounceModal from '../Modal/PronounceModal';

const article = {
  sentence: [
    {
      id: 1,
      content:
        'As demand for pure electric vehicles (BEVs) is expected to fall short of the existing market forecast, a national research institute suggested that large-scale investments by domestic secondary battery companies based on this need to be adjusted.',
      translation:
        '순수 전기차(BEV) 수요가 기존 시장 전망에 미치지 못할 것으로 예상되는 만큼 이를 기반으로 추진된 국내 이차전지 업체들의 대규모 투자가 조정될 필요가 있다는 국책 연구 기관의 제언이 나왔다.',
    },
    {
      id: 2,
      content:
        'In a report titled "Major Issues and Implications of the Electric Vehicle and Battery Industry" published on the 10th, the Korea Institute for Industrial Economics and Trade said, "The demand for battery electric vehicles is likely to be lower than the previous forecast as environmental regulations are eased and safety problems such as fires act as costs."',
      translation:
        '산업연구원은 10일 펴낸 \'전기차·배터리 산업의 주요 이슈와 시사점\' 보고서에서 "환경 규제 등이 완화되고 화재 등 안전 문제가 비용으로 작용해 배터리 전기차 수요는 기존 전망보다 낮아질 가능성이 커지고 있다"고 밝혔다.',
    },
    {
      id: 3,
      content:
        'The Korea Institute of Industrial Economics and Trade said that the market has been dominated by optimistic prospects, and that only pure electric vehicles will account for 35% of total car sales by 2030, and battery demand is expected to grow at an annual average of 30% by 2030, but the revision is inevitable.',
      translation:
        '산업연구원은 그간 시장에서 낙관적 전망이 우세해 2030년 순수 전기차만 전체 자동차 판매의 35% 수준이 되고, 이에 맞춰 배터리 수요도 2030년까지 연평균 30% 내외의 성장을 할 것으로 전망됐지만 수정이 불가피하다고 본 것이다.',
    },
    {
      id: 4,
      content:
        'The Korea Institute of Industrial Economics and Trade (KRI) believes that the industry needs to respond to such changes in the electric vehicle and battery markets.',
      translation:
        '이러한 전기차·배터리 시장 상황 변화에 따라 업계 대응이 필요하다는 게 산업연구원의 진단이다.',
    },
    {
      id: 5,
      content:
        'The Korea Institute of Industrial Economics and Trade suggested, "The battery industry has pursued or is planning a very large investment, and it is necessary to adjust the investment plan and operation timing based on the trends in the battery electric vehicle market and new prospects."',
      translation:
        '산업연구원은 "낙관적 전망에 의존해 배터리 업계는 매우 큰 규모의 투자를 추진했거나 계획 중에 있는데 배터리 전기차 시장 동향과 새 전망 등을 기반으로 투자 계획, 가동 시기를 조정할 필요가 있다"고 제언했다',
    },
  ],
};

const ArticleOriginal = () => {
  const { theme } = useThemeStore();
  const { articleMeta } = useArticleStore();
  const [articleId, setArticleId] = useState(0);
  const [articleOriginal, setArticleOriginal] = useState(article.sentence);
  const [translateIcon, setTranslateIcon] = useState(translateIconWhite);
  const [visibleTranslations, setVisibleTranslations] = useState<boolean[]>(
    new Array(article.sentence.length).fill(false),
  );
  const [isPronounceModalOpen, setPronounceModalOpen] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<string>('');

  const toggleOpenSentenceDetail = (index: number) => {
    setVisibleTranslations(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const openPronounceModal = (text: string) => {
    setSelectedSentence(text);
    setPronounceModalOpen(true);
  };

  const closePronounceModal = () => {
    setPronounceModalOpen(false);
  };

  useEffect(() => {
    if (theme === 'dark') {
      setTranslateIcon(translateIconWhite);
    } else {
      setTranslateIcon(translateIconBlack);
    }
  }, [theme]);

  useEffect(() => {
    if (articleMeta) {
      setArticleId(articleMeta.id);
    }
  }, []);

  useEffect(() => {
    if (articleId !== 0) {
      const fetchArticleDetail = async (articleId: number) => {
        // api 호출
      };

      fetchArticleDetail(articleId);
    }
  }, [articleId]);

  return (
    <>
      <div className={styles.articleContent}>
        {articleOriginal.map((sentence, index) => (
          <div key={sentence.id} className={styles.sentenceContainer}>
            <p className={styles.sentence}>{sentence.content}</p>
            <span className={styles.sentenceButtonContainer}>
              <img
                src={translateIcon}
                alt="translate"
                className={styles.translateButton}
                onClick={() => toggleOpenSentenceDetail(index)}
              />
              |
              <IoMicSharp
                size={20}
                onClick={() => openPronounceModal(sentence.content)} // 마이크 클릭 시 모달 열기
              />
              |
              <IoVolumeMedium size={20} />
            </span>
            {visibleTranslations[index] && (
              <span className={styles.translateDetail}>
                {sentence.translation}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* PronounceModal */}
      <PronounceModal
        isOpen={isPronounceModalOpen}
        onClose={closePronounceModal}
        text={selectedSentence} // 선택된 문장 전달
      />
    </>
  );
};

export default ArticleOriginal;
