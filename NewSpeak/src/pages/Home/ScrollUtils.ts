import styles from './Home.module.scss';

export const fullpageScroll = () => {
  let currentSectionIndex = 0;
  const sections = document.querySelectorAll(`.${styles.section}`);

  const scrollToSection = (index: number) => {
    sections[index].scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleWheelEvent = (e: WheelEvent) => {
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
