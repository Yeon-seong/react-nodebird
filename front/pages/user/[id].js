/* -------------------- 트위터 사용자 주소 페이지 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useEffect } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// Axios 라이브러리 불러오기
import axios from 'axios';

// END 액션 불러오기
import { END } from 'redux-saga';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import { Avatar, Card } from 'antd';
import { useRouter } from 'next/router';

// 내부 컴포넌트 불러오기
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

// wrapper 불러오기
import wrapper from '../../store/configureStore';

// 특정 사용자의 게시글 불러오기 요청 액션 불러오기
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';

// 사용자 액션 불러오기
import {

  /* ---------- 나의 사용자 정보 불러오기 요청 액션 ---------- */
  LOAD_MY_INFO_REQUEST,

  /* ---------- 다른 사용자 정보 불러오기 요청 액션 ---------- */
  LOAD_USER_REQUEST,

} from '../../reducers/user';



// 사용자 컴포넌트(사용자 정의 태그)
const User = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* router = useRouter 함수라고 선언 */
  const router = useRouter();

  /* 구조분해로 아이디 받아오기 */
  const { id } = router.query;

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);



  // Y축 스크롤 이동 값 + 현재 보고있는 화면 높이보다 스크롤을 내렸을 때 로딩 후 여러 게시글 불러오기
  useEffect(() => {
    const onScroll = () => {
      /* 전체 스크롤 길이에서 위로 300 픽셀만큼 올라간 것보다 스크롤을 더 내렸을 때 */
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        /* 로딩이 아닐 때만 특정 사용자의 게시글 불러오기 요청 액션 객체 디스패치 실행 
           이미 게시글을 다 불러온 상태에서 게시글을 불러오는 중이면 액션 제한 */
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    /* ---------- 스크롤 이벤트 리스너 ---------- */
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);



  return (
    <AppLayout>
      <Head>
        {/* 게시글 제목 : '누구 님의 글입니다.' */}
        <title>{userInfo.nickname}님의 글</title>

        {/* 게시글 설명 */}
        <meta name="description" content={`${userInfo.nickname}님의 게시글`} />

        {/* 게시글 제목 미리보기*/}
        <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />

        {/* 게시글 설명 미리보기*/}
        <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        
        {/* 게시글 이미지 미리보기 : 이미지는 파비콘(favicon)으로 설정하기 */}
        <meta property="og:image" content="https://nodebird.com/favicon.ico" />
        {/* 링크 주소 미리보기 */}
        <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
      </Head>


      {/* ---------- 다른 사람의 정보 카드 ---------- */}
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">트윗<br />{userInfo.Posts.length}</div>,
              <div key="following">팔로잉<br />{userInfo.Followings.length}</div>,
              <div key="follower">팔로워<br />{userInfo.Followers.length}</div>,
            ]}
          >
            <Card.Meta
              /* 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};



// 서버사이드 렌더링(SSR) : getServerSideProps 사용
/* 사용자 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다. */
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  /* 변수 cookie에 모든 cookie 정보 저장 */
  const cookie = context.req ? context.req.headers.cookie : '';

  /* 쿠키를 안 써서 요청 보낼 때는 서버에서 공유하고 있는 쿠키를 제거하기 */
  axios.defaults.headers.Cookie = '';

  /* 서버일 때, 그리고 쿠키가 있을 때만 서버로 쿠키 전달하기 */
  if (context.req && cookie) {
    // 실제로 쿠키를 써서 요청을 보낼 때만 잠깐 쿠키를 넣어 놓는다.
    axios.defaults.headers.Cookie = cookie;
  }


  /* 처음에 화면을 로딩하면 특정 사용자의 게시글 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id, // 또는 context.query.id로 useRouter에 접근 가능
  });

  /* 처음에 화면을 로딩하면 나의 사용자 정보 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  /* 처음에 화면을 로딩하면 다른 사용자 정보 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id, // 또는 context.query.id로 useRouter에 접근 가능
  });


  /* 나의 사용자 정보, 다른 사용자 정보 불러오기, 여러 게시글 불러오기
     요청(REQUEST)이 성공(SUCCESS)으로 바뀔 때까지 기다리기 */
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  console.log('getState', context.store.getState().post.mainPosts);
  return { props: {} };
});



// 사용자 컴포넌트 내보내기
export default User;