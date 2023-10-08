/* -------------------- 트위터 이미지 확대 화면 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';



// 오버레이 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;

// 상세 이미지 헤더 컴포넌트 : 스타일이 이미 적용된 header 컴포넌트
const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0px;
  text-align: center;

  & h1 {
    margin: 0px;
    font-size: 15px;
    color: #333;
    line-height: 44px;
  }
`;

// 닫기 버튼 컴포넌트 : CloseOutlined 아이콘이 적용된 컴포넌트
const CloseButton = styled(CloseOutlined)`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 15px;
  line-height: 12px;
  cursor: pointer;
`;

// 슬릭래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

// 이미지래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0px auto;
    max-height: 750px;
  }
`;

// 글로벌 컴포넌트 : 전역 스타일 정의
const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
  
  .antd-card-cover {
    transform: none !important;
  }
`;


// 이미지 줌 컴포넌트(사용자 정의 태그)
const ImagesZoom = ({ images, onClose }) => {
  /* 현재 슬라이드 상태 저장 */
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      {/* ---------- 상세 이미지 헤더 ---------- */}
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>

      {/* ---------- 슬릭 컴포넌트 ---------- */}
      <SlickWrapper>
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
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
        </div>
      </SlickWrapper>
    </Overlay>
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