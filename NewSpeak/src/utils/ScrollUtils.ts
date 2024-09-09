export const scrollToSection = (index: number): void => {
  const sections = document.querySelectorAll<HTMLElement>('.section');
  if (index >= 0 && index < sections.length) {
    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const handleWheelEvent = (
  e: WheelEvent,
  setCurrentSectionIndex: React.Dispatch<React.SetStateAction<number>>,
): void => {
  setCurrentSectionIndex(prevIndex => {
    const newIndex =
      e.deltaY < 0
        ? Math.max(prevIndex - 1, 0)
        : Math.min(
            prevIndex + 1,
            document.querySelectorAll('.section').length - 1,
          );
    scrollToSection(newIndex);
    return newIndex;
  });
};
