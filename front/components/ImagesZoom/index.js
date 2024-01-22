/* -------------------- 트위터 이미지 확대 화면 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useState } from 'react';

// React Slick 라이브러리 불러오기
import Slick from 'react-slick';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 내부 스타일 컴포넌트 불러오기
import {
  Overlay,
  Global,
  Header,
  CloseButton,
  SlickWrapper,
  ImgWrapper,
  Indicator
} from './styles'

// 실제 백엔드 서버 URL IP 주소 가져오기
import { backUrl } from '../config/config';



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
        <CloseButton onClick={onClose} />
      </Header>

      {/* ---------- 슬릭 컴포넌트 ---------- */}
      <SlickWrapper>
        <div>
          <Slick
            /* 첫 번째 이미지를 0번째로 하기 */
            initialSlide={0}
            /* 현재 슬라이드에서 이미지를 넘기면 다음 이미지 나오기 */
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
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
                {/* 이미지 캐러셀 주소를 실제 백엔드 서버 URL IP 주소로 설정 */}
                <img src={`${backUrl}/${v.src}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>

          {/* 현재 몇 번째 슬라이드를 보고 있는지 표시 */}
          <Indicator>
            <div>
              {currentSlide + 1}
              {''}
              /
              {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};



// 이미지 줌 컴포넌트의 images props, onClose props 데이터 타입 검사
ImagesZoom.propTypes = {
  /* PropTypes으로 구성된 객체들의 배열 필수 검사 */
  // images: PropTypes.arrayOf(PropTypes.object).isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  /* PropTypes으로 구성된 함수 필수 검사 */
  onClose: PropTypes.func.isRequired,
};

// 이미지 줌 컴포넌트 내보내기
export default ImagesZoom;