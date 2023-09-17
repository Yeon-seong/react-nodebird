/* -------------------- 모든 페이지 공통 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';

// antd CSS 불러오기
import 'antd/dist/antd.css';



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
  Component: propTypes.elementType.isRequired,
}

// 노드버드 컴포넌트 내보내기
export default NodeBird;