/* -------------------- 트위터 회원가입 페이지 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useCallback, useEffect, useState, } from 'react';

// Redux 라이브러리 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

// 회원가입 요청 액션 불러오기
import { SIGN_UP_REQUEST } from '../reducers/user';



// 에러 메시지 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const ErrorMessage = styled.div`
  color: red;
`;

// 제출 버튼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const SubmitButton = styled.div`
  margin-top: 10px;
`;


// 회원가입 컴포넌트(사용자 정의 태그)
const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);
  
  // 회원가입이 완료되면 메인 페이지로 돌아가기
  useEffect(() => {
    if (signUpDone) {
      Router.push('/');
    }
  }, [signUpDone]);

  
  /* ---------- 중복 체크 ---------- */
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');


  /* ---------- 비밀번호와 비밀번호 확인의 일치 여부 체크 ---------- */
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);


  /* ---------- 약관 동의 체크 ---------- */
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);


  /* 제출할 때 체크 */
  const onSubmit = useCallback(() => {

    // 만약에 비밀번호랑 비밀번호 체크랑 같지 않으면 에러 표시
    if (password !== passwordCheck) {
      return setPasswordError(true);
    };

    // 만약에 약관 동의에 체크하지 않으면 에러 표시
    if (!term) {
      return setTermError(true);
    };
    console.log(email, nickname, password, term);
    
    // 가입하기 완료 시 회원가입 요청 액션 객체 디스패치
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);


  return (
    <AppLayout>

      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>

      <Form onFinish={onSubmit}>
        {/* ---------- 사용자 이메일 인풋 ---------- */}
        <div>
          <label htmlFor="user-sign-email">이메일</label>
          <br />
          <Input
            id="user-sign-email"
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>


        {/* ---------- 사용자 닉네임 인풋 ---------- */}
        <div>
          <label htmlFor="user-sign-nickname">닉네임</label>
          <br />
          <Input
            id="user-sign-nickname"
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>


        {/* ---------- 사용자 비밀번호 인풋 ---------- */}
        <div>
          <label htmlFor="user-sign-password">비밀번호</label>
          <br />
          <Input
            id="user-sign-password"
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>


        {/* ---------- 사용자 비밀번호 체크 인풋 ---------- */}
        <div>
          <label htmlFor="user-sign-password-check">비밀번호 체크</label>
          <br />
          <Input
            id="user-sign-password-check"
            name="user-password-check"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {/* ---------- 에러 메시지 표시 ---------- */}
          {passwordError
            && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          }
        </div>


        {/* ---------- 약관동의 체크박스 ---------- */}
        <div>
          <Checkbox
            name="user-term"
            checked={term}
            onChange={onChangeTerm}
          >
            약관에 동의합니다.
          </Checkbox>
          {termError
            && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
          }
        </div>


        {/* ---------- 제출 버튼 ---------- */}
        <div>
          <SubmitButton>
            <Button
              name="submit-btn"
              type="primary"
              htmlType="submit"
              loading={signUpLoading}
            >
              가입하기
            </Button>
          </SubmitButton>
        </div>
      </Form>
    </AppLayout>
  );
};



// 회원가입 컴포넌트 내보내기
export default Signup;