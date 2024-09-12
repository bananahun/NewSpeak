import React from "react";
import useRegisterStore from "../../store/RegisterStore";

const Step1 = () => {
  const { formData, setFormData } = useRegisterStore();

  return (
    <>
      <article>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData("email", e.target.value)}
          placeholder="example@example.com"
        />
      </article>
      <article>
        <input
          type="text"
          value={formData.nickname}
          onChange={(e) => setFormData("nickname", e.target.value)}
          placeholder="닉네임"
        />
      </article>
      <article>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData("password", e.target.value)}
          placeholder="비밀번호"
        />
      </article>
      <article>
        <input
          type="password"
          value={formData.passwordConfirm}
          onChange={(e) => setFormData("passwordConfirm", e.target.value)}
          placeholder="비밀번호 확인"
        />
      </article>
    </>
  );
};

export default Step1;
