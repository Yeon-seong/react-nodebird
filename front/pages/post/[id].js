/* -------------------- 트위터 게시글 주소 페이지 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import { useRouter } from 'next/router';

// Axios 라이브러리 불러오기
import axios from 'axios';

// END 액션 불러오기
import { END } from 'redux-saga';

// 외부 컴포넌트 불러오기
import Head from 'next/head';

// 내부 컴포넌트 불러오기
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

// wrapper 불러오기
import wrapper from '../../store/configureStore';

// 나의 사용자 정보 불러오기 요청 액션 불러오기
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

// 단일 게시글 불러오기 요청 액션 불러오기
import { LOAD_POST_REQUEST } from '../../reducers/post';



// 게시글 컴포넌트(사용자 정의 태그)
const Post = () => {

  /* router = useRouter 함수라고 선언 */
  const router = useRouter();

  /* 구조분해로 아이디 받아오기 */
  const { id } = router.query;

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { singlePost } = useSelector((state) => state.post)



  return (
    <AppLayout>
      <Head>
        {/* 게시글 제목 : '누구 님의 글입니다.' */}
        <title>{singlePost.User.nickname}님의 글</title>

        {/* 게시글 설명 */}
        <meta name="description" content={singlePost.content} />

        {/* 게시글 제목 미리보기*/}
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />

        {/* 게시글 설명 미리보기*/}
        <meta property="og:description" content={singlePost.content} />
        
        {/* 게시글 이미지 미리보기
            ? 이미지가 없는 게시글을 공유하면 페비콘이 화면에 뜨게 하고,
            : 이미지가 있는 게시글을 공유하면 첫 번째 이미지를 공유 화면에 띄우기 */}
        <meta property="og:image"
          content={singlePost.Images[0]
            ? singlePost.Images[0].src
            : 'https://nodebird.com/favicon.ico'
          }
        />
        {/* 링크 주소 미리보기 */}
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>

      {/* 게시글 카드 */}
      <PostCard post={singlePost} />
    </AppLayout>
  );
};



// 서버사이드 렌더링(SSR) : getServerSideProps 사용
/* 게시글 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다. */
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

  /* 변수 cookie에 모든 cookie 정보 저장 */
  const cookie = context.req ? context.req.headers.cookie : '';

  console.log(context);

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

  /* 처음에 화면을 로딩하면 단일 게시글 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id, // 또는 context.query.id로 useRouter에 접근 가능
  });

  /* 나의 사용자 정보, 단일 게시글 불러오기 요청(REQUEST)이 성공(SUCCESS)으로 바뀔 때까지 기다리기 */
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});



// 게시글 컴포넌트 내보내기
export default Post;