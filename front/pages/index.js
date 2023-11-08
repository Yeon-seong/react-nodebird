/* -------------------- 트위터 메인 홈페이지 -------------------- */



// 외부 컴포넌트 불러오기
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

// 게시글 불러오기 요청 액션 불러오기
import { LOAD_POSTS_REQUEST } from '../reducers/post';



// 홈 컴포넌트(사용자 정의 태그)
const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts } = useSelector((state) => state.post);


  /* 처음에 화면을 로딩하면 게시글 불러오기 요청 액션 호출 */
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);


  // Y축 스크롤 이동 값 + 현재 보고있는 화면 높이보다 스크롤을 내렸을 때 로딩 후 게시글 불러오기
  useEffect(() => {
    function onScroll() {
      console.log(
        window.scrollY,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight
      );
      /* 전체 스크롤 길이에서 위로 300 픽셀만큼 올라간 것보다 스크롤을 더 내렸을 때 */
      if (window.scrollY + document.documentElement.clientHeight
      > document.documentElement.scrollHeight - 300) {
        /* 게시글 불러오기 액션 디스패치 */
        if (hasMorePosts) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    /* 스크롤 이벤트 리스너 */
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts]);
  

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



// 홈 컴포넌트 내보내기
export default Home;