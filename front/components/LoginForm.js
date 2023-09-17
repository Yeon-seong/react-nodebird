/* -------------------- 트위터 로그인 폼 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link'; 
import styled from 'styled-components';



// 버튼래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;


// 로그인 폼 컴포넌트(사용자 정의 태그)
const LoginForm = ({ setIsLoggedIn }) => {
  /* 컴포넌트 상태 저장 : 리액트 Hooks useState 사용 */
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  /* 컴포넌트의 속성(props)으로 넘겨주는 값들은 useCallback 사용 */
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);


  // 폼 제출
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <Form onFinish={onSubmitForm}>
      {/* 아이디 인풋 */}
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

      {/* 비밀번호 인풋 */}
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

      {/* 로그인 버튼, 회원가입 버튼 */}
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
    </Form>
  );
}



// 로그인 폼 컴포넌트 내보내기
export default LoginForm;