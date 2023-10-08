/* -------------------- 트위터 이미지 확대 화면 스타일 컴포넌트 -------------------- */


// 외부 컴포넌트 불러오기
import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';



// 오버레이 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
`;


// 상세 이미지 헤더 컴포넌트 : 스타일이 이미 적용된 header 컴포넌트
export const Header = styled.header`
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
export const CloseButton = styled(CloseOutlined)`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 15px;
  line-height: 12px;
  cursor: pointer;
`;


// 슬릭래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;


// 이미지래퍼 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0px auto;
    max-height: 750px;
  }
`;


// 인디케이터 컴포넌트 : 스타일이 이미 적용된 div 컴포넌트
export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;


// 글로벌 컴포넌트 : 전역 스타일 정의
export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
  
  .antd-card-cover {
    transform: none !important;
  }
`;