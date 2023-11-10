/* -------------------- 트위터 팔로우 버튼 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import { Button } from 'antd';



// 팔로우 버튼 컴포넌트(사용자 정의 태그)
const FollowButton = ({ post }) => <Button>팔로우</Button>



// 팔로우 버튼 컴포넌트의 post props 데이터 타입 검사
FollowButton.propTypes = {
  /*  구체적으로 post Object를 필수 검사  */
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

// 팔로우 버튼 컴포넌트 내보내기
export default FollowButton;