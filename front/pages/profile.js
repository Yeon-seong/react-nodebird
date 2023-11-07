/* -------------------- 트위터 프로필 페이지 -------------------- */



// 외부 컴포넌트 불러오기
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Router from 'next/router';


// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {
  const { me } = useSelector((state) => state.user);


  // 프로필 페이지에서 로그아웃한 상태일(me가 없을 때)때 메인 화면으로 이동
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    } 
  }, [me && me.id]);

  // 로그인 하지 않은 상태일(me가 없을)때 프로필 페이지로 이동 막기
  if (!me) {
    return null;
  };


  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      
      <AppLayout>
        {/* ---------- 닉네임 수정 폼 ---------- */}
        <NicknameEditForm />
        
        {/* ---------- 팔로잉 목록 ---------- */}
        <FollowList
          header="팔로잉 목록"
          data={me.Followings}
        />

        {/* ---------- 팔로워 목록 ---------- */}
        <FollowList
          header="팔로워 목록"
          data={me.Followers}
        />
      </AppLayout>
    </>
  );
};



// 프로필 컴포넌트 내보내기
export default Profile;