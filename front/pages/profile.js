/* -------------------- 트위터 프로필 페이지 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useEffect } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import Router from 'next/router';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

// 사용자 액션 불러오기
import {
  
  /* ---------- 팔로워 불러오기 요청 액션 ---------- */
  LOAD_FOLLOWERS_REQUEST,
  
  /* ---------- 팔로잉 불러오기 요청 액션 ---------- */
  LOAD_FOLLOWINGS_REQUEST,

} from '../reducers/user';



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { me } = useSelector((state) => state.user);

  
  useEffect(() => {
    // 프로필 페이지로 가면 사용자의 팔로워 불러오기 요청 액션 객체 디스패치
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })
    // 프로필 페이지로 가면 사용자의 팔로잉 불러오기 요청 액션 객체 디스패치
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    })
  }, []);


  // 프로필 페이지에서 로그아웃한 상태일(me가 없을 때)때 메인 페이지로 이동
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
          header="팔로잉"
          data={me.Followings}
        />

        {/* ---------- 팔로워 목록 ---------- */}
        <FollowList
          header="팔로워"
          data={me.Followers}
        />
      </AppLayout>
    </>
  );
};



// 프로필 컴포넌트 내보내기
export default Profile;