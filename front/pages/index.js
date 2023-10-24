/* -------------------- 트위터 메인 홈페이지 -------------------- */



// 외부 컴포넌트 불러오기
import React from 'react';
import { useSelector } from 'react-redux';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';



// 홈 컴포넌트(사용자 정의 태그)
const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {/* ----- 포스트 폼 ----- */}
      {me && <PostForm />}
      {/* ----- 포스트 카드 ----- */}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};



// 홈 컴포넌트 내보내기
export default Home;