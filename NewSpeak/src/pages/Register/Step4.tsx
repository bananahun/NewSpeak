import React from 'react';
import useRegisterStore from '../../store/RegisterStore';

const Step4 = () => {
  const { formData, setFormData } = useRegisterStore();

  return (
    <>
      <article>
        <label>닉네임 </label>
        <input
          type="text"
          value={formData.nickname}
          onChange={e => setFormData('nickname', e.target.value)}
        />
      </article>
      <article>
        <label>비밀번호 </label>
        <input
          type="password"
          value={formData.password}
          onChange={e => setFormData('password', e.target.value)}
        />
      </article>
      <article>
        <label>비밀번호 확인 </label>
        <input
          type="password"
          value={formData.passwordConfirm}
          onChange={e => setFormData('passwordConfirm', e.target.value)}
        />
      </article>
    </>
  );
};

export default Step4;
