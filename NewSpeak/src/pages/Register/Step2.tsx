import React, { useState } from 'react';
import useRegisterStore from '../../store/RegisterStore';
import Category from '../../components/Profile/Category';

const Step2 = () => {
  // const { formData, setFormData } = useRegisterStore();

  return (
    <article>
      <Category />
    </article>
  );
};

export default Step2;
