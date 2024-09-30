import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './About.module.scss';

const About = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const scrollObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.fadeIn);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(`.${styles.fadeInSection}`);
        elements.forEach((el) => scrollObserver.observe(el));

        return () => {
            elements.forEach((el) => scrollObserver.unobserve(el));
        };
    }, []);

    return (
        <div className={styles.aboutContainer}>
            <p className={`${styles.introText} ${styles.chapter} ${styles.chapterDescription}`} style={{ backgroundColor: 'white', color:'black'}}>
            <img src="/src/assets/new+speak.jpg" alt="합성어" className={styles.chapterImage} />
                Newspeak 서비스는 News와 Speak의 합성어로, 최신 영어 뉴스를 통해 실시간으로 영어 듣기와 말하기 능력을 향상시키는 혁신적인 학습 플랫폼입니다!
                지금 Newspeak에서 새로운 방식의 영어 학습을 경험해 보세요.
            </p>

            {/* Chapter 1 */}
            <div className={`${styles.chapter} ${styles.fadeInSection}`}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.chapterTitle}>최신 영어 뉴스 제공</h2>
                    <p className={styles.chapterDescription}>
                        매일 갱신되는 최신 영어 뉴스 기사를 읽어보세요! 각 기사의 번역을 보면서 영어를 심층적으로 학습할 수 있습니다. 
                    </p>
                    <button onClick={() => navigate('/')} className={styles.button}>기사 보러가기</button>
                </div>
                <div className={styles.imageWrapper}>
                    <img src="/src/assets/news2.jpg" alt="뉴스" className={styles.chapterImage} />
                    <img src="/src/assets/news4.jpg" alt="뉴스" className={styles.chapterImage} />
                </div>
            </div>

            {/* Chapter 2 */}
            <div className={`${styles.chapter} ${styles.fadeInSection} ${styles.altBg}`}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.chapterTitle}>나만의 단어장!</h2>
                    <p className={styles.chapterDescription}>
                        기사를 보다가 모르는 단어, 외우고 싶은 단어를 단어장에 추가해보세요! 외우기 쉽도록 단어 테스트를 해볼 수도 있습니다!
                    </p>
                    <button onClick={() => navigate('/mypage')} className={styles.button}>Mypage로 가기</button>
                </div>
                <div className={styles.imageWrapper}>
                    <img src="/src/assets/mypage.jpg" alt="단어장" className={styles.chapterImage} />
                    <img src="/src/assets/word_add.jpg" alt="단어장 추가" className={styles.chapterImage} />
                </div>
            </div>

            {/* Chapter 3 */}
            <div className={`${styles.chapter} ${styles.fadeInSection}`}>
                <div className={styles.textWrapper}>
                    <h2 className={styles.chapterTitle}>영어 회화</h2>
                    <p className={styles.chapterDescription}>
                        해당 뉴스에 대해 Speako와 함께 토론해보세요! 실제 영어에 대해 회화하고, 보고서를 받아 보면서, 영어 실력을 향상시킬 수 있습니다.
                    </p>
                </div>
                <div className={styles.imageWrapper}>
                    <img src="/src/assets/conversations.jpg" alt="회화" className={styles.chapterImage} />
                    <img src="/src/assets/conversations2.jpg" alt="회화" className={styles.chapterImage} />
                </div>
            </div>
        </div>
    );
};

export default About;
