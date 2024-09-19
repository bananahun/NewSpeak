-- 카테고리
INSERT INTO category (category_name)
VALUES ('Technology');
INSERT INTO category (category_name)
VALUES ('Health');
INSERT INTO category (category_name)
VALUES ('Sports');

-- 기사

INSERT INTO article (title, content, content_kr, published_date, image_url, article_url, publisher, writer, level, category_id)
VALUES ('Breaking News', 'This is the content of the breaking news article.', '이것은 속보 기사 내용입니다.', '2024-09-10T08:00:00', 'http://example.com/image1.jpg', 'http://example.com/breaking-news', 'News Publisher', 'John Doe', 3, 1);
INSERT INTO article (title, content, content_kr, published_date, image_url, article_url, publisher, writer, level, category_id)
VALUES ('Technology Trends', 'Explore the latest technology trends and innovations.', '최신 기술 트렌드와 혁신을 살펴보세요.', '2024-09-11T10:30:00', 'http://example.com/image2.jpg', 'http://example.com/technology-trends', 'Tech Publisher', 'Jane Smith', 3, 2);
INSERT INTO article (title, content, content_kr, published_date, image_url, article_url, publisher, writer, level, category_id)
VALUES ('Health Tips', 'Important health tips for a better lifestyle.', '더 나은 생활을 위한 중요한 건강 팁.', '2024-09-12T14:00:00', 'http://example.com/image3.jpg', 'http://example.com/health-tips', 'Health Publisher', 'Alice Johnson', 3, 3);
INSERT INTO article (title, content, content_kr, published_date, image_url, article_url, publisher, writer, level, category_id)
VALUES ('Sports Update', 'Latest updates from the world of sports.', '스포츠 세계의 최신 업데이트.', '2024-09-13T16:45:00', 'http://example.com/image4.jpg', 'http://example.com/sports-update', 'Sports Publisher', 'Bob Brown', 2, 1);
INSERT INTO article (title, content, content_kr, published_date, image_url, article_url, publisher, writer, level, category_id)
VALUES ('Travel Guide', 'Your ultimate guide to travel destinations.', '여행 목적지에 대한 최고의 가이드.', '2024-09-14T18:30:00', 'http://example.com/image5.jpg', 'http://example.com/travel-guide', 'Travel Publisher', 'Charlie Davis', 1, 2);

-- 키워드

INSERT INTO keyword (content, cnt, article_id)
VALUES ('Technology', 100, 1);
INSERT INTO keyword (content, cnt, article_id)
VALUES ('Health', 50, 2);
INSERT INTO keyword (content, cnt, article_id)
VALUES ('Sports', 75, 3);

-- 문장

INSERT INTO sentence (content, translation, article_id)
VALUES ('This is the first sentence of the article.', '이것은 기사의 첫 번째 문장입니다.', 1);
INSERT INTO sentence (content, translation, article_id)
VALUES ('Here is another important detail.', '여기 또 다른 중요한 세부사항이 있습니다.', 1);
INSERT INTO sentence (content, translation, article_id)
VALUES ('The article continues with more information.', '기사는 더 많은 정보로 계속됩니다.', 1);
INSERT INTO sentence (content, translation, article_id)
VALUES ('This sentence provides additional insights.', '이 문장은 추가적인 통찰을 제공합니다.', 1);
INSERT INTO sentence (content, translation, article_id)
VALUES ('Finally, the article concludes with a summary.', '마지막으로, 기사는 요약으로 결론을 내립니다.', 1);

-- 단어

INSERT INTO word (content, level)
VALUES ('Innovation', 5);
INSERT INTO word (content, level)
VALUES ('Technology', 4);
INSERT INTO word (content, level)
VALUES ('Healthcare', 3);

-- 뜻

INSERT INTO word_meaning (word_meaning, word_id)
VALUES ('The process of creating new ideas or methods.', 1);
INSERT INTO word_meaning (word_meaning, word_id)
VALUES ('The application of scientific knowledge for practical purposes.', 2);
INSERT INTO word_meaning (word_meaning, word_id)
VALUES ('The organized provision of medical care to individuals.', 3);

-- 예문

INSERT INTO meaning_sentence (word_meaning_id, meaning_sentence, sentence_korean)
VALUES (1, 'Innovation drives progress in various fields.', '혁신은 다양한 분야에서 발전을 이끕니다.');
INSERT INTO meaning_sentence (word_meaning_id, meaning_sentence, sentence_korean)
VALUES (2, 'Technology has revolutionized communication.', '기술은 통신에 혁신을 가져왔습니다.');
INSERT INTO meaning_sentence (word_meaning_id, meaning_sentence, sentence_korean)
VALUES (3, 'Healthcare is essential for maintaining public health.', '의료 서비스는 공공 건강을 유지하는 데 필수적입니다.');

