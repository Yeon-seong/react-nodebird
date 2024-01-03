/* -------------------- 트위터 메인 홈페이지 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useEffect } from 'react';

// Redux 라이브러리 불러오기
import { useDispatch, useSelector } from 'react-redux';

// END 액션 불러오기
import { END } from 'redux-saga';

// wrapper 불러오기
import wrapper from '../store/configureStore';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

// 게시글 불러오기 요청 액션 불러오기
import { LOAD_POSTS_REQUEST } from '../reducers/post';

// 나의 사용자 정보 불러오기 요청 액션 불러오기
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';



// 홈 컴포넌트(사용자 정의 태그)
const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);


  // 리트윗 실패 시 리트윗 에러 alert 창 띄우기
  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);


  // Y축 스크롤 이동 값 + 현재 보고있는 화면 높이보다 스크롤을 내렸을 때 로딩 후 게시글 불러오기
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );
      /* 전체 스크롤 길이에서 위로 300 픽셀만큼 올라간 것보다 스크롤을 더 내렸을 때 */
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        /* 로딩이 아닐 때만 게시글 불러오기 액션 객체 디스패치 실행 
           이미 게시글을 다 불러온 상태에서 게시글을 불러오는 중이면 액션 제한 */
        if (hasMorePosts && !loadPostsLoading) {
          /* lastId : 메인 게시글 중 마지막 게시글의 id
             lastId가 undefined가 되지 않도록 ?을 추가해 보호한다. */
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    /* ---------- 스크롤 이벤트 리스너 ---------- */
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);



  return (
    <AppLayout>
      {/* ---------- 게시글 폼 ---------- */}
      {me && <PostForm />}
      
      {/* ---------- 게시글 카드 ---------- */}
      {mainPosts?.map((post) =>
        <PostCard key={post.id} post={post} />
      )}
    </AppLayout>
  );
};



// 홈 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다.
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log(context);

  /* 처음에 화면을 로딩하면 나의 사용자 정보 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  /* 처음에 화면을 로딩하면 게시글 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });

  /* 사용자 정보, 게시글 불러오기 요청(REQUEST)이 성공(SUCCESS)으로 바뀔 때까지 기다리기 */
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

// 홈 컴포넌트 내보내기
export default Home;