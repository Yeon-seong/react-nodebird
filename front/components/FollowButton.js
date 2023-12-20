/* -------------------- 트위터 팔로우 버튼 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useCallback } from 'react';

// Redux 라이브러리 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import { Button } from 'antd';

// 사용자 액션 불러오기
import {

  /* ---------- 팔로우 요청 액션 ---------- */
  FOLLOW_REQUEST,

  /* ---------- 언팔로우 요청 액션 ---------- */
  UNFOLLOW_REQUEST,

} from '../reducers/user';




// 팔로우 버튼 컴포넌트(사용자 정의 태그)
const FollowButton = ({ post }) => {
  const dispatch = useDispatch();


  // Redux 에서 내 정보(me), 팔로우 로딩, 언팔로우 로딩 상태 값 가져오기
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);


  // 팔로잉 여부 : 내가 팔로잉한 사람들 중에 게시글 작성한 사람의 아이디 찾기
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);


  // 팔로우, 언팔로우 버튼 : 액션 실행 시 게시글 작성자 아이디 정보 보내기 콜백 함수
  const onClickButton = useCallback(() => {
    /* 내가 팔로우 하고 있을 때, 버튼을 누르면 언팔로우 요청 액션 */
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    /* 내가 팔로우 안하고 있을 때, 버튼을 누르면 팔로우 요청 액션 */
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);


  // 게시글 작성자의 아이디가 내 아이디랑 같으면 팔로우, 언팔로우 버튼 안보이기
  if (post.User.id === me.id) {
    return null;
  };


  // (?) 내가 이미 팔로우 했다면 언팔로우, (:) 팔로우 안했다면 팔로우
  return (
    <Button
      loading={followLoading || unfollowLoading}
      onClick={onClickButton}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};



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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

// 팔로우 버튼 컴포넌트 내보내기
export default FollowButton;