/* -------------------- 트위터 게시글 주소 페이지 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// 외부 컴포넌트 불러오기
import { useRouter } from 'next/router';



// 게시글 컴포넌트(사용자 정의 태그)
const Post = () => {

  /* router = useRouter 함수라고 선언 */
  const router = useRouter();

  /* 구조분해로 아이디 받아오기 */
  const { id } = router.query;



  return (
    <div>{id}번 게시글</div>
  );
};



// 게시글 컴포넌트 내보내기
export default Post;