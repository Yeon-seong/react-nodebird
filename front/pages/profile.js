/* -------------------- 트위터 프로필 페이지 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import Head from 'next/head';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>내 프로필</AppLayout>
    </>
  );
}



// 프로필 컴포넌트 내보내기
export default Profile;