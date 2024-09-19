import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import styles from './ArticleList.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddBox,
} from 'react-icons/md';

const ArticleList = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const sliderRef = useRef(null);
  const categoryRef = useRef(null);

  // 더미 데이터
  const categories = [
    '전체',
    '기술',
    '날씨',
    '경제',
    '건강',
    '여행',
    '스포츠',
    '문화',
    '음악',
  ];

  const newsData = {
    count: 20,
    data: [
      {
        id: 1,
        title: '최신 기술 혁신 소식',
        content:
          '최근 기술 혁신에 대한 자세한 기사입니다. 다양한 기술 발전과 연구 결과를 다룹니다.',
        category: '기술',
        imageUrl: 'https://example.com/image1.jpg',
        level: 3,
        writer: '김철수',
        publisher: 'TechNews',
        publishedDate: 1694601600,
      },
      {
        id: 2,
        title: '전국 날씨 예보',
        content:
          '이번 주 날씨 예보를 상세히 알려드립니다. 각 지역별 날씨 변화에 대한 정보입니다.',
        category: '날씨',
        imageUrl: 'https://example.com/image2.jpg',
        level: 2,
        writer: '이영희',
        publisher: 'WeatherToday',
        publishedDate: 1694688000,
      },
      {
        id: 3,
        title: '주식 시장 동향',
        content:
          '오늘 주식 시장의 주요 동향과 분석을 제공하는 기사입니다. 투자에 도움이 될 정보가 포함되어 있습니다.',
        category: '경제',
        imageUrl: 'https://example.com/image3.jpg',
        level: 4,
        writer: '박지민',
        publisher: 'FinanceDaily',
        publishedDate: 1694774400,
      },
      {
        id: 4,
        title: '건강 관리 팁',
        content:
          '건강을 유지하기 위한 유용한 팁과 조언을 제공합니다. 생활 속 건강 관리 방법에 대해 알아보세요.',
        category: '건강',
        imageUrl: 'https://example.com/image4.jpg',
        level: 1,
        writer: '홍길동',
        publisher: 'HealthLife',
        publishedDate: 1694860800,
      },
      {
        id: 5,
        title: '세계 여행 추천지',
        content:
          '세계 여러 나라의 추천 여행지를 소개합니다. 아름다운 경관과 문화 체험이 가득한 여행지입니다.',
        category: '여행',
        imageUrl: 'https://example.com/image5.jpg',
        level: 3,
        writer: '최서연',
        publisher: 'TravelGuide',
        publishedDate: 1694947200,
      },
      {
        id: 6,
        title: '영화 리뷰: 최신 블록버스터',
        content:
          '최신 블록버스터 영화에 대한 리뷰와 평가를 제공합니다. 관람에 도움이 될 내용이 담겨 있습니다.',
        category: '문화',
        imageUrl: 'https://example.com/image6.jpg',
        level: 2,
        writer: '오민수',
        publisher: 'MovieCritic',
        publishedDate: 1695033600,
      },
      {
        id: 7,
        title: '음악 차트 업데이트',
        content:
          '최신 음악 차트와 인기 곡에 대한 정보를 제공합니다. 음악 팬들을 위한 필수 뉴스입니다.',
        category: '음악',
        imageUrl: 'https://example.com/image7.jpg',
        level: 3,
        writer: '서준호',
        publisher: 'MusicWeekly',
        publishedDate: 1695120000,
      },
      {
        id: 8,
        title: '스포츠 경기 결과',
        content:
          '최근 스포츠 경기의 결과와 주요 하이라이트를 제공합니다. 경기 리뷰와 선수 분석이 포함되어 있습니다.',
        category: '스포츠',
        imageUrl: 'https://example.com/image8.jpg',
        level: 4,
        writer: '이민호',
        publisher: 'SportsNews',
        publishedDate: 1695206400,
      },
      {
        id: 9,
        title: '요리 레시피: 쉬운 가정식',
        content:
          '간단하면서도 맛있는 가정식 요리 레시피를 소개합니다. 요리 초보자에게 적합한 레시피입니다.',
        category: '요리',
        imageUrl: 'https://example.com/image9.jpg',
        level: 1,
        writer: '정혜진',
        publisher: 'FoodLovers',
        publishedDate: 1695292800,
      },
      {
        id: 10,
        title: '기술 스타트업 뉴스',
        content:
          '최근 기술 스타트업의 성장과 새로운 혁신에 대한 소식을 전합니다. 주목할 만한 스타트업 정보를 확인하세요.',
        category: '기술',
        imageUrl: 'https://example.com/image10.jpg',
        level: 3,
        writer: '김미래',
        publisher: 'TechCrunch',
        publishedDate: 1695379200,
      },
      {
        id: 11,
        title: '환경 보호 캠페인',
        content:
          '환경 보호를 위한 캠페인과 활동을 소개합니다. 지속 가능한 삶을 위한 정보와 팁이 포함되어 있습니다.',
        category: '환경',
        imageUrl: 'https://example.com/image11.jpg',
        level: 2,
        writer: '최준희',
        publisher: 'GreenPlanet',
        publishedDate: 1695465600,
      },
      {
        id: 12,
        title: '경제 성장 전망',
        content:
          '미래의 경제 성장 전망과 주요 경제 지표에 대한 분석을 제공합니다. 경제 동향을 이해하는 데 도움이 됩니다.',
        category: '경제',
        imageUrl: 'https://example.com/image12.jpg',
        level: 4,
        writer: '김철호',
        publisher: 'EconomyToday',
        publishedDate: 1695552000,
      },
      {
        id: 13,
        title: '사회 이슈 분석',
        content:
          '최근 사회 이슈와 문제점에 대한 분석을 제공합니다. 사회적 논의와 정책 변화에 대한 정보입니다.',
        category: '사회',
        imageUrl: 'https://example.com/image13.jpg',
        level: 3,
        writer: '이서원',
        publisher: 'SocialWatch',
        publishedDate: 1695638400,
      },
      {
        id: 14,
        title: '부동산 시장 동향',
        content:
          '부동산 시장의 최신 동향과 분석을 제공합니다. 투자 및 구매를 고려하는 데 유용한 정보입니다.',
        category: '부동산',
        imageUrl: 'https://example.com/image14.jpg',
        level: 2,
        writer: '정상훈',
        publisher: 'RealEstateNews',
        publishedDate: 1695724800,
      },
      {
        id: 15,
        title: '국제 뉴스 업데이트',
        content:
          '전 세계의 주요 뉴스와 사건을 업데이트합니다. 국제 정세와 관련된 정보가 포함되어 있습니다.',
        category: '국제',
        imageUrl: 'https://example.com/image15.jpg',
        level: 3,
        writer: '박수진',
        publisher: 'GlobalReport',
        publishedDate: 1695811200,
      },
      {
        id: 16,
        title: '패션 트렌드',
        content:
          '현재 패션 트렌드와 최신 스타일을 소개합니다. 트렌디한 패션 아이템을 확인해 보세요.',
        category: '패션',
        imageUrl: 'https://example.com/image16.jpg',
        level: 2,
        writer: '임지영',
        publisher: 'FashionDaily',
        publishedDate: 1695897600,
      },
      {
        id: 17,
        title: '스타트업 성공 사례',
        content:
          '성공적인 스타트업 사례와 그들의 전략을 소개합니다. 창업에 관한 유용한 정보가 포함되어 있습니다.',
        category: '비즈니스',
        imageUrl: 'https://example.com/image17.jpg',
        level: 4,
        writer: '송미래',
        publisher: 'StartupStories',
        publishedDate: 1695984000,
      },
      {
        id: 18,
        title: '건강한 식생활',
        content:
          '건강한 식생활을 위한 식단과 조리법을 제공합니다. 균형 잡힌 식단을 유지하는 방법에 대한 정보입니다.',
        category: '건강',
        imageUrl: 'https://example.com/image18.jpg',
        level: 1,
        writer: '윤지혜',
        publisher: 'HealthyLiving',
        publishedDate: 1696070400,
      },
      {
        id: 19,
        title: '모바일 앱 리뷰',
        content:
          '최신 모바일 앱에 대한 리뷰와 기능 분석을 제공합니다. 유용한 앱을 찾는 데 도움이 됩니다.',
        category: '기술',
        imageUrl: 'https://example.com/image19.jpg',
        level: 3,
        writer: '한승우',
        publisher: 'AppReview',
        publishedDate: 1696156800,
      },
      {
        id: 20,
        title: '사회적 기업 소개',
        content:
          '사회적 기업과 그들의 활동에 대한 소개를 제공합니다. 사회적 가치와 기업의 역할에 대한 정보입니다.',
        category: '사회',
        imageUrl: 'https://example.com/image20.jpg',
        level: 2,
        writer: '이수연',
        publisher: 'SocialEnterprise',
        publishedDate: 1696243200,
      },
    ],
  };

  // 카테고리별로 슬라이드의 인덱스를 반환하는 함수
  const getCategoryIndex = (category: string) => {
    return categories.indexOf(category);
  };

  // 슬라이더 설정
  const sliderSettings = {
    speed: 500,
    arrows: false,
    centerMode: true,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setSelectedCategory(categories[newIndex]),
  };

  const handleCategoryClick = (category: string) => {
    const index = getCategoryIndex(category);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    setSelectedCategory(category);
  };

  const scrollLeft = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const fetchMoreArticle = (index: number) => {
    // 기사 더 불러오는 api
    console.log(index);
  };

  return (
    <div className={styles.articleList}>
      <div className={styles.categoryContainer}>
        <div className={styles.scrollButton} onClick={scrollLeft}>
          <MdKeyboardArrowLeft size={'40'} />
        </div>
        <div className={styles.categoryButtons} ref={categoryRef}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.scrollButton} onClick={scrollRight}>
          <MdKeyboardArrowRight size={'40'} />
        </div>
      </div>
      <Slider ref={sliderRef} {...sliderSettings}>
        {categories.map((category, index) => {
          const categoryArticles = newsData.data
            .filter(
              article => category === '전체' || article.category === category,
            )
            .slice(0, 5);
          return (
            <div key={index} className={styles.articleListContent}>
              {categoryArticles.map((article, idx) => (
                <div key={idx} className={styles.article}>
                  <h3 className={styles.title}>{article.title}</h3>
                  <p className={styles.content}>{article.content}</p>
                </div>
              ))}
              <div className={styles.loadMore}>
                <MdOutlineAddBox
                  size={'50'}
                  className={styles.loadButton}
                  onClick={() => fetchMoreArticle(index)}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ArticleList;
