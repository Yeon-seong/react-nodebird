/* -------------------- 트위터 로그인 폼 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import Link from 'next/link'; 
import styled from 'styled-components';

// 내부 컴포넌트 불러오기
import useInput from '../hooks/useInput';



// 버튼래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

// 폼래퍼 컴포넌트 : Form 컴포넌트 커스텀 스타일링
const FormWrapper = styled(Form)`
  padding: 10px;
`;


// 로그인 폼 컴포넌트(사용자 정의 태그)
const LoginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 더미 데이터 로그인
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      {/* ---------- 아이디 인풋 ---------- */}
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input
          id="user-id"
          value={id}
          onChange={onChangeId}
          required
        />
      </div>

      {/* ---------- 비밀번호 인풋 ---------- */}
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          id="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>

      {/* ----------로그인 버튼, 회원가입 버튼 ---------- */}
      <ButtonWrapper>
        {/* 로그인 버튼 */}
        <Button
          type="primary"
          htmlType="submit"
          loading={false}
        >
          로그인
        </Button>

        {/* 회원가입 버튼 */}
        <Link href="/signup">
          <a><Button>회원가입</Button></a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};



// 로그인 폼 컴포넌트의 setIsLoggedIn props 데이터 타입 검사
LoginForm.propTypes = {
  /* Fucntion 객체 필수 검사 */
  setIsLoggedIn: PropTypes.func.isRequired,
};

// 로그인 폼 컴포넌트 내보내기
export default LoginForm;