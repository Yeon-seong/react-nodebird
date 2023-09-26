/* -------------------- 트위터 포스트 이미지 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import PropTypes from 'prop-types';



// 포스트 이미지 컴포넌트(사용자 정의 태그)
const PostImages = ({ images }) => {
  return (
    <div>이미지 구현중...</div>
  );
};



// 포스트 이미지 컴포넌트의 images props 데이터 타입 검사
PostImages.propTypes = {
  /* PropTypes으로 구성된 객체들의 배열 검사 */
  images: PropTypes.arrayOf(PropTypes.object),
};

// 포스트 이미지 컴포넌트 내보내기
export default PostImages;