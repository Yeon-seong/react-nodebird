/* -------------------- 트위터 프로필 페이지 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback, useEffect, useState } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector } from 'react-redux';

// Axios 라이브러리 불러오기
import axios from 'axios';

// React Hook SWR 라이브러리 불러오기
import useSWR from 'swr';

// END 액션 불러오기
import { END } from 'redux-saga';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import Router from 'next/router';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

// wrapper 불러오기
import wrapper from '../store/configureStore';

// 실제 백엔드 서버 주소 가져오기
import { backUrl } from '../config/config';

// 나의 사용자 정보 불러오기 요청 액션 불러오기
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';



// 실제로 주소 가져오기 : 데이터를 가져오는 API를 호출하는 fetcher 함수
const fetcher = (url) => 
  axios.get(url, { withCredentials: true }).then((result) => result.data
);



// 프로필 컴포넌트(사용자 정의 태그)
const Profile = () => {

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { me } = useSelector((state) => state.user);

  /* 팔로잉 리밋, 팔로워 리밋 상태 저장 */
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  /* 팔로잉 불러오기 구조분해 할당 */
  const { data: followingsData, error: followingError } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`, fetcher
  );

  /* 팔로워 불러오기 구조분해 할당 */
  const { data: followersData, error: followerError } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`, fetcher
  );



  // 프로필 페이지에서 로그아웃한 상태일(me가 없을 때)때 메인 페이지로 이동
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);



  // 팔로잉 목록 더 불러오기 콜백 함수
  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3); // 기존 limit보다 3 올려주기
  }, []);

  // 팔로워 목록 더 불러오기 콜백 함수
  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);  // 기존 limit보다 3 올려주기
  }, []);



  // 로그인 하지 않은 상태일(me가 없을)때 프로필 페이지로 이동 막기
  if (!me) {
    return '내 정보 로딩중...';
  };


  /* 팔로워 에러 or 팔로잉 에러 둘 중 하나가 에러났을 때 에러 콘솔하기 */
  // Hook은 항상 모두 다 실행되어야 하기에 return은 Hook보다 위에 위치할 수 없다.
  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로워/팔로잉 로딩 중 에러가 발생합니다.</div>;
  }



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
          data={followingsData}
          onClickMore={loadMoreFollowings}
          // SWR에서의 로딩 : 팔로잉 데이터와 팔로잉 에러가 없을 때
          loading={!followingsData && !followingError}
        />

        {/* ---------- 팔로워 목록 ---------- */}
        <FollowList
          header="팔로워"
          data={followersData}
          onClickMore={loadMoreFollowers}
          // SWR에서의 로딩 : 팔로워 데이터와 팔로워 에러가 없을 때
          loading={!followersData && !followerError}
        />
      </AppLayout>
    </>
  );
};



// 서버사이드 렌더링(SSR) : getServerSideProps 사용
/* 프로필 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다. */
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



// 프로필 컴포넌트 내보내기
export default Profile;