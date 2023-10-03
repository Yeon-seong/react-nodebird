/* -------------------- 트위터 이미지 확대 화면 -------------------- */


import React from 'react';
import PropTypes from 'prop-types';



// 이미지 줌 컴포넌트(사용자 정의 태그)
const ImagesZoom = ({ images, onClose }) => {
  // 
};



// 이미지 줌 컴포넌트의 images props, onClose props 데이터 타입 검사
ImagesZoom.propTypes = {
  /* PropTypes으로 구성된 객체들의 배열 필수 검사 */
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* PropTypes으로 구성된 함수 필수 검사 */
  onClose: PropTypes.func.isRequired,
};

// 이미지 줌 컴포넌트 내보내기
export default ImagesZoom;