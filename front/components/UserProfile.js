/* -------------------- 트위터 사용자 프로필 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Button } from 'antd';

// 내부 컴포넌트 불러오기
import { logoutRequestAction } from '../reducers/user';


// 사용자 프로필 컴포넌트(사용자 정의 태그)
const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  /* 더미 데이터 로그아웃 */
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">트윗<br />0</div>,
        <div key="followings">팔로잉<br />0</div>,
        <div key="followers">팔로워<br />0</div>,
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