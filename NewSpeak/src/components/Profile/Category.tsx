  import React,{useEffect, useState} from 'react';
  import styles from './Category.module.scss';
  import { usePreferredCategoryStore } from '../../store/CategoryStore';
  import { categories } from '../../utils/Categories';
  // const Category: React.FC<CategoryProps> = ({ preferredCategories, updatePreferredCategory }) => {
    const Category: React.FC = () => {
      const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
      // 최대 선택 가능한 카테고리 수
      const maxSelectable = 3;
      // const { preferredCategories, getPreferredCategory, updatePreferredCategory } = usePreferredCategoryStore();
      const { preferredCategories, getPreferredCategory, updatePreferredCategory} = usePreferredCategoryStore();
      const [selectedCategories, setSelectedCategories] = useState<number[]>( preferredCategories)
      // 설정된 카테고리들
      
    useEffect(()=> {
      const fetchPreferredCategories = async () => {
        if (preferredCategories.length === 0) { // 값이 없으면
          await getPreferredCategory(); // 서버에 요청
        } 
      };
      console.log(preferredCategories)
      fetchPreferredCategories(); // 선호 카테고리 요청
    }, []
  )

  const handleCategoryClick = (category: number) => {
    setSelectedCategories(prev => {
      const currentCategories = prev || []; // prev가 null일 경우 빈 배열로 초기화
      
      // 이미 선택된 경우, 선택 해제
      if (currentCategories.includes(category)) {
        const updatedCategories = currentCategories.filter(c => c !== category);
        updatePreferredCategory(updatedCategories); // 서버에 변경된 데이터 업데이트
        return updatedCategories;
      }
      // 새로 선택하려는 경우, 최대 선택 수를 초과하지 않으면 추가
      else if (currentCategories.length < maxSelectable) {
        const updatedCategories = [...currentCategories, category];
        updatePreferredCategory(updatedCategories); // 서버에 변경된 데이터 업데이트
        return updatedCategories;
      }
      // 최대 선택 수를 초과하면 현재 상태 유지
      return currentCategories;
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
                {categories.slice(1).map((category, index) => (
                  <div
                    key={index+1}
                    className={`${styles.dropdownItem} ${
                      selectedCategories?.includes(index+1) ? styles.selected : ''
                    }`}
                    onClick={() => handleCategoryClick(index+1)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {/* 드롭다운 우측에 선택된 카테고리 태그 표시 */}
          <div className={styles.selectedCategories}>
            {selectedCategories?.map((categoryIndex, index) => (
              <span key={index} className={styles.selectedCategory}>
                {categories[categoryIndex]} {/* 선택된 카테고리 인덱스를 사용해 해당 카테고리 이름을 가져옴 */}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Category;
  