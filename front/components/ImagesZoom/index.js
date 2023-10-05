/* -------------------- 트위터 이미지 확대 화면 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';



// 이미지 줌 컴포넌트(사용자 정의 태그)
const ImagesZoom = ({ images, onClose }) => {
  /* 현재 슬라이드 상태 저장 */
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      {/* ---------- 상세 이미지 헤더 ---------- */}
      <header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
      </header>

      {/* ---------- 슬랙 컴포넌트 ---------- */}
      <div>
        <Slick
          /* 첫 번째 이미지를 0번째로 하기 */
          initialSlide={0}
          /* 현재 슬라이드에서 이미지를 넘기면 다음 이미지 나오기 */
          afterChange={(slide) => setCurrentSlide(slide)}
          /* 무한 반복 : 마지막 이미지를 넘기면 첫 번째 이미지 나오기 */
          infinite
          /* 슬라이드 화살표 지우기 */
          arrows={false}
          /* 한 번에 하나의 이미지만 보이기 */
          slidesToShow={1}
          /* 한 번에 이미지 하나씩만 넘기기 */
          slidesToScroll={1}
        >
          {/* ---------- 이미지 캐러셀 ---------- */}
          {images.map((v) => (
            <div key={v.src}>
              <img src={v.src} alt={v.src} />
            </div>
          ))}
        </Slick>
      </div>

    </div>
  );
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