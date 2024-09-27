import React, { useState } from 'react';
import useArticleApi from '../apis/ArticleApi';

const TestApiComponent = () => {
  const [data, setData] = useState(null);

  // 각 API 호출에 대한 핸들러
  const handleGetCategory = async () => {
    try {
      const result = await useArticleApi.getCategory();
      setData(result);
      console.log(result, '[컴포넌트] 카테고리 데이터');
    } catch (error) {
      console.error('[컴포넌트] 카테고리 데이터 가져오기 에러:', error);
    }
  };

  const handleGetArticleList = async () => {
    try {
      const result = await useArticleApi.getArticleList();
      setData(result);
      console.log(result, '[컴포넌트] 기사 리스트 데이터');
    } catch (error) {
      console.error('[컴포넌트] 기사 리스트 가져오기 에러:', error);
    }
  };

  const handleGetArticleLevel = async () => {
    try {
      const level = 1; // 임의의 level 값
      const result = await useArticleApi.getArticleLevel(level);
      setData(result);
      console.log(result, `[컴포넌트] 레벨 ${level}에 따른 기사 데이터`);
    } catch (error) {
      console.error(
        `[컴포넌트] 레벨 ${level}에 따른 기사 가져오기 에러:`,
        error,
      );
    }
  };

  const handleGetArticleCategory = async () => {
    try {
      const categoryId = 1; // 임의의 category_id 값
      const result = await useArticleApi.getArticleCategory(categoryId);
      setData(result);
      console.log(
        result,
        `[컴포넌트] 카테고리 ${categoryId}에 따른 기사 데이터`,
      );
    } catch (error) {
      console.error(
        `[컴포넌트] 카테고리 ${categoryId}에 따른 기사 가져오기 에러:`,
        error,
      );
    }
  };

  const handleGetArticleSearch = async () => {
    try {
      const title = 'example'; // 임의의 검색어
      const result = await useArticleApi.getArticleSearch(title);
      setData(result);
      console.log(result, `[컴포넌트] "${title}"로 검색한 기사 데이터`);
    } catch (error) {
      console.error(
        `[컴포넌트] "${title}"로 검색한 기사 가져오기 에러:`,
        error,
      );
    }
  };

  const handleGetWordCloud = async () => {
    try {
      const result = await useArticleApi.getWordCloud();
      setData(result);
      console.log(result, '[컴포넌트] 워드 클라우드 데이터');
    } catch (error) {
      console.error('[컴포넌트] 워드 클라우드 데이터 가져오기 에러:', error);
    }
  };

  const handleGetArticleWordCloud = async () => {
    try {
      const keywordId = 1; // 임의의 keyword_id 값
      const result = await useArticleApi.getArticleWordCloud(keywordId);
      setData(result);
      console.log(
        result,
        `[컴포넌트] 키워드 ${keywordId}에 따른 워드 클라우드 데이터`,
      );
    } catch (error) {
      console.error(
        `[컴포넌트] 키워드 ${keywordId}에 따른 워드 클라우드 가져오기 에러:`,
        error,
      );
    }
  };

  const handleGetArticleDetail = async () => {
    try {
      const articleId = 373; // 임의의 article_id 값
      const result = await useArticleApi.getArticleDetail(articleId);
      setData(result);
      console.log(result, `[컴포넌트] 기사 ${articleId}의 상세 데이터`);
    } catch (error) {
      console.error(
        `[컴포넌트] 기사 ${articleId}의 상세 데이터 가져오기 에러:`,
        error,
      );
    }
  };

  return (
    <div>
      <h1>API 테스트 컴포넌트</h1>
      <button onClick={handleGetCategory}>카테고리 조회</button>
      <button onClick={handleGetArticleList}>기사 리스트 조회</button>
      <button onClick={handleGetArticleLevel}>레벨별 기사 조회</button>
      <button onClick={handleGetArticleCategory}>카테고리별 기사 조회</button>
      <button onClick={handleGetArticleSearch}>기사 검색</button>
      <button onClick={handleGetWordCloud}>워드 클라우드 조회</button>
      <button onClick={handleGetArticleWordCloud}>
        키워드별 워드 클라우드 조회
      </button>
      <button onClick={handleGetArticleDetail}>기사 상세 조회</button>

      {/* 데이터 출력 */}
      {data && (
        <div>
          <h3>API 호출 결과:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestApiComponent;
