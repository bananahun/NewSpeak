import React from 'react';
import useRegisterStore from '../../store/RegisterStore';

const Step1: React.FC = () => {
  const { formData, setFormData } = useRegisterStore();

  return (
    <article>
      <label>이메일 </label>
      <input
        type="email"
        value={formData.email}
        onChange={e => setFormData('email', e.target.value)}
      />
    </article>
  );
};

export default Step1;
