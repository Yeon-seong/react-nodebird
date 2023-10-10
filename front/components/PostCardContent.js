/* -------------------- 트위터 포스트 카드 콘텐츠 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';



// 포스트 카드 콘텐츠 컴포넌트(사용자 정의 태그)
const PostCardContent = ({ postData }) => {
  <div>
    {}
  </div>
};



// 포스트 카드 콘텐츠 컴포넌트의 postData props 데이터 타입 검사
PostCardContent.propTypes = {
  /* String 객체 필수 검사 */
  postData: PropTypes.string.isRequired,
};

// 포스트 카드 콘텐츠 컴포넌트 내보내기
export default PostCardContent;