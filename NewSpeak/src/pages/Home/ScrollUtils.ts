import styles from "./Home.module.scss";

export const fullpageScroll = () => {
  let currentSectionIndex = 0;
  let isScrolling = false; // 스크롤 중인지 확인하는 플래그
  const sections = document.querySelectorAll(`.${styles.section}`);

  const scrollToSection = (index: number) => {
    if (!isScrolling) {
      isScrolling = true;
      sections[index].scrollIntoView({
        behavior: "smooth",
      });

      // 스크롤이 완료된 후에 플래그를 다시 false로 설정
      setTimeout(() => {
        isScrolling = false;
      }, 1000); // scrollIntoView의 전환 시간과 일치시키기
    }
  };

  const handleWheelEvent = (e: WheelEvent) => {
    // 휠 이벤트의 값이 매우 작을 때 이벤트를 무시하도록 설정
    if (Math.abs(e.deltaY) < 10) return;

    // 현재 스크롤 중이면 다음 이벤트 무시
    if (isScrolling) return;

    if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
      currentSectionIndex++;
    } else if (e.deltaY < 0 && currentSectionIndex > 0) {
      currentSectionIndex--;
    }

    scrollToSection(currentSectionIndex);
  };

  // 이벤트 리스너 추가
  window.addEventListener("wheel", handleWheelEvent);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  return () => {
    window.removeEventListener("wheel", handleWheelEvent);
  };
};
