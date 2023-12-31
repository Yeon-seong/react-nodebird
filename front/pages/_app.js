/* -------------------- 모든 페이지들의 공통 페이지 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import Head from 'next/head';

// antd CSS 불러오기
import 'antd/dist/antd.css';

// wrapper 불러오기
import wrapper from '../store/configureStore';



// 노드버드 컴포넌트(사용자 정의 태그)
const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  )
};



// 노드버드 컴포넌트의 Component props 데이터 타입 검사
NodeBird.propTypes = {
  /* props로 컴포넌트 이름을 집어넣을 때 필수 검사 */
  Component: PropTypes.elementType.isRequired,
};

// 노드버드 컴포넌트 내보내기
// export할 컴포넌트에 고차 컴포넌트(HOC) 적용
export default wrapper.withRedux(NodeBird);