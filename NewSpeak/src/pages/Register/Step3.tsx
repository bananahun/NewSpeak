import React, { useState } from 'react';
import useRegisterStore from '../../store/RegisterStore';

const categories = ['기술', '건강', '경제', '교육', '연예'];

const Step3 = () => {
  const { formData, setFormData } = useRegisterStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleCategory = (category: string) => {
    const isSelected = formData.category.includes(category);

    if (isSelected) {
      setFormData(
        'category',
        formData.category.filter(item => item !== category),
      );
    } else {
      setFormData('category', [...formData.category, category]);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <article>
      <p>카테고리 선택</p>
      <div>
        <div>
          <p>선택된 카테고리:</p>
          <ul>
            {formData.category.map(category => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
        <button onClick={handleDropdownToggle}>카테고리 선택하기</button>
        {dropdownOpen && (
          <div
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              position: 'absolute',
              backgroundColor: 'white',
              zIndex: 1,
            }}
          >
            {categories.map(category => (
              <div key={category}>
                <button
                  onClick={() => {
                    toggleCategory(category);
                  }}
                  style={{
                    display: 'block',
                    backgroundColor: formData.category.includes(category)
                      ? 'green'
                      : 'lightgray',
                  }}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default Step3;
