import styles from './Home.module.scss';

export const fullpageScroll = () => {
  let currentSectionIndex = 0;
  let isScrolling = false; // 스크롤 중인지 확인하는 플래그
  const sections = document.querySelectorAll(`.${styles.section}`);

  const scrollToSection = (index: number) => {
    if (!isScrolling) {
      isScrolling = true;
      sections[index].scrollIntoView({
        behavior: 'smooth',
      });

      // 스크롤이 완료된 후에 플래그를 다시 false로 설정
      setTimeout(() => {
        isScrolling = false;
      }, 800); // scrollIntoView의 전환 시간과 일치시키기
    }
  };

  const handleWheelEvent = (e: WheelEvent) => {
    if (isScrolling) return; // 스크롤 중이면 이벤트 무시

    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      currentSectionIndex--;
    }
    scrollToSection(currentSectionIndex);
  };

  window.addEventListener('wheel', handleWheelEvent);

  return () => {
    window.removeEventListener('wheel', handleWheelEvent);
  };
};
