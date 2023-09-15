/* -------------------- 트위터 앱 레이아웃 페이지 -------------------- */


import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link'; 

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">노드버드</Link>
        <Link href="/profile">프로필</Link>
        <Link href="/signup">회원가입</Link>
      </div>
      { children }
    </div>
  );
};

AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;