/* -------------------- 트위터 사용자 프로필 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import { Card, Avatar, Button } from 'antd';

// 로그아웃 액션 생성함수 불러오기
import { logoutRequestAction } from '../reducers/user';



// 사용자 프로필 컴포넌트(사용자 정의 태그)
const UserProfile = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { me, logOutLoading } = useSelector((state) => state.user);


  // 더미데이터 로그아웃 콜백 함수
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);



  return (
    <Card
    actions={[
        <div key="twit">트윗<br />{me.Posts.length}</div>,
        <div key="following">팔로잉<br />{me.Followings.length}</div>,
        <div key="follower">팔로워<br />{me.Followers.length}</div>,
      ]}
    >
      
      <Card.Meta
        /* 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      {/* ---------- 로딩 중 버튼 ---------- */}
      <Button
        onClick={onLogOut}
        loading={logOutLoading}
      >
        로그아웃
      </Button>
    </Card>
  );
};



// 사용자 프로필 컴포넌트 내보내기
export default UserProfile;