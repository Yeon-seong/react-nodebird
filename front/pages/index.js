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
  /* 처음에 화면을 로딩하면 게시글 불러오기 요청 액션 호출 */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
  
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

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