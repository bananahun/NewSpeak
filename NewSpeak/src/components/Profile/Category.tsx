import React, { useEffect, useState } from 'react';
import styles from './Category.module.scss';
import { usePreferredCategoryStore } from '../../store/CategoryStore';
import { categories } from '../../utils/Categories';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';
import { mySwal } from '../Alert/CustomSwal';

const Category = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const maxSelectable = 5; // 최대 선택 가능 카테고리 수
  const minSelectable = 1; // 최소 선택 가능 카테고리 수
  const { preferredCategories, getPreferredCategory, updatePreferredCategory } =
    usePreferredCategoryStore();
  const [selectedCategories, setSelectedCategories] =
    useState<number[]>(preferredCategories);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferredCategories = async () => {
      if (preferredCategories.length === 0) {
        await getPreferredCategory(handleAuthError);
      }
    };
    fetchPreferredCategories();
  }, []);

  useEffect(() => {
    setSelectedCategories(preferredCategories);
  }, [preferredCategories]);

  const handleAuthError = () => {
    mySwal(
      '로그인이 필요합니다.',
      '확인을 누르면 로그인 페이지로 이동합니다.',
      'info',
    );
    // alert('로그인이 필요합니다. 확인을 누르면 로그인 페이지로 이동합니다.');
    navigate('/login');
  };

  // 카테고리 클릭 시 상태 업데이트 및 서버에 업데이트 요청
  const handleCategoryClick = (category: number) => {
    if (!isLoggedIn) {
      handleAuthError();
      return;
    }

    setSelectedCategories(prev => {
      const currentCategories = prev || [];

      // 이미 선택된 경우, 선택 해제 (단, 최소 선택 수 이상일 때만 해제 가능)
      if (currentCategories.includes(category)) {
        if (currentCategories.length <= minSelectable) {
          mySwal(
            '카테고리',
            `최소 ${minSelectable}개의 카테고리를 선택해야 합니다.`,
            'warning',
          );
          // alert(`최소 ${minSelectable}개의 카테고리를 선택해야 합니다.`);
          return currentCategories;
        }
        const updatedCategories = currentCategories.filter(c => c !== category);
        updatePreferredCategory(updatedCategories, handleAuthError);
        return updatedCategories;
      }

      // 새로 선택하려는 경우: 최대 선택 갯수를 초과하지 않으면 추가
      else if (currentCategories.length < maxSelectable) {
        const updatedCategories = [...currentCategories, category];
        updatePreferredCategory(updatedCategories, handleAuthError);
        return updatedCategories;
      } else {
        mySwal(
          '카테고리',
          `최대 ${maxSelectable}개의 카테고리를 선택해야 합니다.`,
          'warning',
        );
        // alert(`최대 ${maxSelectable}개의 카테고리만 선택할 수 있습니다.`);
        return currentCategories;
      }
    });
  };

  // 드롭다운 열기/닫기 함수
  const toggleDropdown = () => {
    if (!isLoggedIn) {
      handleAuthError();
      return;
    }

    // 최소 선택 갯수보다 적으면 드롭다운을 열 때 알림
    if (selectedCategories.length < minSelectable) {
      mySwal(
        '카테고리',
        `최소 ${minSelectable}개의 카테고리를 선택해야 합니다.`,
        'warning',
      );
      // alert(`최소 ${minSelectable}개의 카테고리를 선택해야 합니다.`);
    }

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
                  key={index + 1}
                  className={`${styles.dropdownItem} ${
                    selectedCategories.includes(index + 1)
                      ? styles.selected
                      : ''
                  }`}
                  onClick={() => handleCategoryClick(index + 1)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 드롭다운 우측에 선택된 카테고리 태그 표시, X 버튼 포함 */}
        <div className={styles.selectedCategories}>
          {selectedCategories.map((categoryIndex, index) => (
            <span key={index} className={styles.selectedCategory}>
              {categories[categoryIndex]}
              {/* X 버튼 추가하여 카테고리 제거 */}
              <span
                className={styles.removeButton}
                onClick={() => handleRemoveCategory(categoryIndex)}
              >
                &times; {/* × 문자 또는 다른 아이콘 사용 가능 */}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* 선택된 카테고리 수에 따른 메시지 또는 상태 표시 */}
      <div className={styles.categoryStatus}>
        {selectedCategories.length < minSelectable
          ? `최소 ${minSelectable}개의 카테고리를 선택해야 합니다.`
          : selectedCategories.length > maxSelectable
          ? `최대 ${maxSelectable}개의 카테고리만 선택할 수 있습니다.`
          : `선택된 카테고리: ${selectedCategories.length} / ${maxSelectable}`}
      </div>
    </div>
  );
};

export default Category;
