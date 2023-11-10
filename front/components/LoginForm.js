/* -------------------- 트위터 로그인 폼 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useCallback } from 'react';

// Redux 라이브러리 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import Link from 'next/link'; 
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';

// 내부 컴포넌트 불러오기
import useInput from '../hooks/useInput';

// 사용자 추가 요청 액션 생성함수 불러오기
import { loginRequestAction } from '../reducers/user';



// 버튼래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

// 폼래퍼 컴포넌트 : Form 컴포넌트 커스텀 스타일링
const FormWrapper = styled(Form)`
  padding: 10px;
`;


// 로그인 폼 컴포넌트(사용자 정의 태그)
const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 더미데이터 로그인
  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction(email, password));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      {/* ---------- 이메일 인풋 ---------- */}
      <div>
        <label htmlFor="user-main-email">이메일</label>
        <br />
        <Input
          id="user-main-email"
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
      </div>

      {/* ---------- 비밀번호 인풋 ---------- */}
      <div>
        <label htmlFor="user-main-password">비밀번호</label>
        <br />
        <Input
          id="user-main-password"
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>

      {/* ---------- 로그인 버튼, 회원가입 버튼 ---------- */}
      <ButtonWrapper>
        {/* 로그인 버튼 */}
        <Button
          name="login-btn"
          type="primary"
          htmlType="submit"
          /* ---------- 로딩 중 버튼 ---------- */
          loading={logInLoading}
        >
          로그인
        </Button>

        {/* ---------- 회원가입 버튼 ---------- */}
        <Link href="/signup">
          <a><Button>회원가입</Button></a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};



// 로그인 폼 컴포넌트 내보내기
export default LoginForm;