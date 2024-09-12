import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import styles from './WordList.module.scss';

const WordList = () => {
  interface Word {
    content: string;
    meanings: {
      meaning: string;
      example: string;
      exampleKorean: string;
    }[];
  }

  const words: Word[] = [
    {
      content: 'get',
      meanings: [
        {
          meaning: '받다',
          example: 'I got a letter from Dave this morning.',
          exampleKorean: '내가 오늘 아침 데이브에게서 온 편지를 한 통 받았다.',
        },
        {
          meaning: '얻다, 구하다, 마련하다',
          example: 'Where did you get that skirt?',
          exampleKorean: '그 치마 어디서 샀니?',
        },
      ],
    },
    {
      content: 'set',
      meanings: [
        {
          meaning: '놓다, 배치하다',
          example: 'She set the book on the table.',
          exampleKorean: '그녀는 책을 탁자 위에 놓았다.',
        },
        {
          meaning: '설정하다',
          example: 'Set your alarm for 6 a.m.',
          exampleKorean: '알람을 오전 6시로 맞춰라.',
        },
      ],
    },
    {
      content: 'run',
      meanings: [
        {
          meaning: '달리다',
          example: 'He runs five miles every morning.',
          exampleKorean: '그는 매일 아침 5마일을 달린다.',
        },
        {
          meaning: '운영하다',
          example: 'She runs a successful bakery.',
          exampleKorean: '그녀는 성공적인 제과점을 운영한다.',
        },
      ],
    },
    {
      content: 'take',
      meanings: [
        {
          meaning: '가져가다',
          example: 'Take an umbrella with you.',
          exampleKorean: '우산을 챙겨 가세요.',
        },
        {
          meaning: '잡다, 쥐다',
          example: 'He took my hand and led me through the crowd.',
          exampleKorean: '그는 내 손을 잡고 군중을 헤쳐 나갔다.',
        },
      ],
    },
    {
      content: 'make',
      meanings: [
        {
          meaning: '만들다',
          example: 'She made a beautiful cake.',
          exampleKorean: '그녀는 아름다운 케이크를 만들었다.',
        },
        {
          meaning: '~하게 하다',
          example: 'You make me happy.',
          exampleKorean: '넌 날 행복하게 해.',
        },
      ],
    },
    {
      content: 'look',
      meanings: [
        {
          meaning: '보다',
          example: 'Look at the stars.',
          exampleKorean: '별들을 봐.',
        },
        {
          meaning: '찾다',
          example: "I'm looking for my keys.",
          exampleKorean: '내 열쇠를 찾고 있어.',
        },
      ],
    },
    {
      content: 'give',
      meanings: [
        {
          meaning: '주다',
          example: 'I gave him a gift.',
          exampleKorean: '나는 그에게 선물을 줬다.',
        },
        {
          meaning: '건네주다',
          example: 'Can you give me the book?',
          exampleKorean: '책을 건네줄 수 있니?',
        },
      ],
    },
    {
      content: 'find',
      meanings: [
        {
          meaning: '찾다',
          example: 'I finally found my keys.',
          exampleKorean: '마침내 내 열쇠를 찾았다.',
        },
        {
          meaning: '발견하다',
          example: 'They found a solution to the problem.',
          exampleKorean: '그들은 문제에 대한 해결책을 발견했다.',
        },
      ],
    },
    {
      content: 'tell',
      meanings: [
        {
          meaning: '말하다',
          example: 'Tell me the truth.',
          exampleKorean: '진실을 말해줘.',
        },
        {
          meaning: '알리다',
          example: 'Can you tell him the news?',
          exampleKorean: '그에게 소식을 전해줄 수 있니?',
        },
      ],
    },
    {
      content: 'keep',
      meanings: [
        {
          meaning: '유지하다',
          example: 'Keep the door open.',
          exampleKorean: '문을 열어 둬.',
        },
        {
          meaning: '보관하다',
          example: 'She keeps all her letters in a box.',
          exampleKorean: '그녀는 편지를 모두 상자에 보관한다.',
        },
      ],
    },
  ];

  const [flipped, setFlipped] = useState<number | null>(null);
  const handleCardClick = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <>
      <Nav />
      <div className={styles.wordlistContainer}>
        <div className={styles.header}>
          <h1>나만의 단어장</h1>
          <Link to="/wordlist/test">
            <button className={styles.testButton}>테스트</button>
          </Link>
        </div>
        <div className={styles.wordlist}>
          {words.map((word, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                flipped === index ? styles.flipped : ''
              }`}
              onClick={() => handleCardClick(index)}
            >
              <div className={styles.cardInner}>
                {/* 앞면: 단어와 뜻 */}
                <div className={styles.cardFront}>
                  <h3>{word.content}</h3>
                  <ul>
                    {word.meanings.map((meaning, meaningIndex) => (
                      <li key={meaningIndex}>
                        <p>의미: {meaning.meaning}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* 뒷면: 예문 */}
                <div className={styles.cardBack}>
                  <h3>{word.content}</h3>
                  <ul>
                    {word.meanings.map((meaning, meaningIndex) => (
                      <li key={meaningIndex}>
                        <p>예문: {meaning.example}</p>
                        <p>예문 (한국어): {meaning.exampleKorean}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WordList;
