/* -------------------- 트위터 회원가입 페이지 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback, useEffect, useState, } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// Axios 라이브러리 불러오기
import axios from 'axios';

// END 액션 불러오기
import { END } from 'redux-saga';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

// wrapper 불러오기
import wrapper from '../store/configureStore';

// 사용자 액션 불러오기
import {

  /* ---------- 회원가입 요청 액션 ---------- */
  SIGN_UP_REQUEST,

  /* ---------- 나의 사용자 정보 불러오기 요청 액션 ---------- */
  LOAD_MY_INFO_REQUEST,

} from '../reducers/user';



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

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { signUpLoading, signUpDone, signUpError, loginDone } = useSelector((state) => state.user);


  // 로그인 완료 시 메인 페이지로 나가기 및 이전 페이지 기록 삭제
  useEffect(() => {
    if (loginDone) {
      Router.replace('/');
    } 
  }, [loginDone]);

  // 회원가입 완료 시 메인 페이지로 나가기 및 이전 페이지 기록 삭제
  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  // 회원가입 실패 시 '이미 사용중인 아이디입니다.' alert 창 띄우기
  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  
  /* ---------- 중복 체크 ---------- */
  
  // 이메일, 닉네임, 비밀번호 인풋 창에 값을 입력했을 때 상태 변경
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');



  /* ---------- 비밀번호와 비밀번호 확인의 일치 여부 체크 ---------- */

  // 현재 비밀번호 체크, 비밀번호 에러 상태 저장
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // 컴포넌트의 속성(props)으로 비밀번호 체크와 에러 정보를 넘기는 콜백 함수
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);



  /* ---------- 약관동의 체크 ---------- */

  // 현재 약관동의 상태, 약관동의 에러 상태 저장
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  // 컴포넌트의 속성(props)으로 약관동의와 에러 정보를 넘기는 콜백 함수
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);



  // 회원가입 제출 시 체크 콜백 함수
  const onSubmit = useCallback(() => {

    /* 만약에 비밀번호랑 비밀번호 체크랑 같지 않으면 에러 표시 */
    if (password !== passwordCheck) {
      return setPasswordError(true);
    };

    /* 만약에 약관동의에 체크하지 않으면 에러 표시 */
    if (!term) {
      return setTermError(true);
    };
    console.log(email, nickname, password, term);
    
    /* 가입하기 완료 시 회원가입 요청 액션 객체 디스패치 */
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



// 서버사이드 렌더링(SSR) : getServerSideProps 사용
/* 회원가입 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다. */
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  console.log('getServerSideProps start');
  console.log(context.req.headers);

  /* 변수 cookie에 모든 cookie 정보 저장 */
  const cookie = context.req ? context.req.headers.cookie : '';

  /* 쿠키를 안 써서 요청 보낼 때는 서버에서 공유하고 있는 쿠키를 제거하기 */
  axios.defaults.headers.Cookie = '';

  /* 서버일 때, 그리고 쿠키가 있을 때만 서버로 쿠키 전달하기 */
  if (context.req && cookie) {
    // 실제로 쿠키를 써서 요청을 보낼 때만 잠깐 쿠키를 넣어 놓는다.
    axios.defaults.headers.Cookie = cookie;
  }


  /* 처음에 화면을 로딩하면 나의 사용자 정보 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  /* 나의 사용자 정보 요청(REQUEST)이 성공(SUCCESS)으로 바뀔 때까지 기다리기 */
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});



// 회원가입 컴포넌트 내보내기
export default Signup;