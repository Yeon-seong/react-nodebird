/* -------------------- 트위터 프로필 페이지 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import Head from 'next/head';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {

  /* 팔로잉 목록, 팔로우 목록 더미 데이터 */
  const followingList = [{ nickname: '토끼' }, { nickname: '오리' }, { nickname: '물범' }];
  const followerList = [{ nickname: '개구리' }, { nickname: '강아지' }, { nickname: '고양이' }];

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* 닉네임 수정 폼 */}
        <NicknameEditForm />
        {/* 팔로우 리스트 - 팔로잉 */}
        <FollowList header="팔로잉 목록" data={followingList} />
        {/* 팔로우 리스트 - 팔로워 */}
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};



// 프로필 컴포넌트 내보내기
export default Profile;