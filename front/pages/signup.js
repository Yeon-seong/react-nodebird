/* -------------------- 트위터 회원가입 페이지 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import Head from 'next/head';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';



// 회원가입 컴포넌트(사용자 정의 태그)
const Signup = () => {
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>회원가입 페이지</AppLayout>
    </>
  );
}



// 회원가입 컴포넌트 내보내기
export default Signup;