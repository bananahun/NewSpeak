  import React,{useState} from 'react';
  import styles from './Category.module.scss';
  
  interface CategoryProps {
    preferredCategories: string[]; // 부모로부터 받아올 선택된 카테고리
    // updatePreferredCategory: (categories: string[]) => void; // 상태 업데이트 함수
  }
  
  // const Category: React.FC<CategoryProps> = ({ preferredCategories, updatePreferredCategory }) => {
  const Category: React.FC<CategoryProps> = ({ preferredCategories}) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>( preferredCategories)
    // 최대 선택 가능한 카테고리 수
    const maxSelectable = 3;

      // 설정된 카테고리들
    const categories = [
      'Category 1',
      'Category 2',
      'Category 3',
      'Category 4',
      'Category 5',
      'Category 6',
      'Category 7',
      'Category 8',
      'Category 9',
    ];
  
    const handleCategoryClick = (category: string) => {
      setSelectedCategories(prev => {
        // 이미 선택된 경우, 선택 해제
        if (prev.includes(category)) {
          return prev.filter(c => c !== category);
        }
        // 새로 선택하려는 경우, 최대 선택 수를 초과하지 않으면 추가
        else if (prev.length < maxSelectable) {
          return [...prev, category];
        }
        // 최대 선택 수를 초과하면 현재 상태 유지
        return prev;
      });
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <div className={styles.categoryContainer}>
        {/* 드롭다운 버튼과 선택된 카테고리 표시 */}
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdown}>
            <button
              onClick={toggleDropdown}
              className={`${styles.dropdownButton} ${
                isDropdownOpen ? styles.open : ''
              }`}
            >
              Select Categories
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`${styles.dropdownItem} ${
                      selectedCategories.includes(category) ? styles.selected : ''
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {/* 드롭다운 우측에 선택된 카테고리 태그 표시 */}
          <div className={styles.selectedCategories}>
            {selectedCategories.map((category, index) => (
              <span key={index} className={styles.selectedCategory}>
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Category;
  