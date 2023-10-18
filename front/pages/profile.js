/* -------------------- 트위터 프로필 페이지 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* ---------- 닉네임 수정 폼 ---------- */}
        <NicknameEditForm />
        {/* ---------- 팔로잉 목록 ---------- */}
        <FollowList header="팔로잉" data={me.Followings} />
        {/* ---------- 팔로워 목록 ---------- */}
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
  );
};



// 프로필 컴포넌트 내보내기
export default Profile;