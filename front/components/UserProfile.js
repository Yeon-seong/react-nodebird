/* -------------------- 트위터 사용자 프로필 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';



// 사용자 프로필 컴포넌트(사용자 정의 태그)
const UserProfile = ({ setIsLoggedIn }) => {
  
  /* 더미 데이터 로그아웃 */
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
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
        avatar={<Avatar>YS</Avatar>}
        title="YeonSeong"
      />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};



// 사용자 프로필 컴포넌트 내보내기
export default UserProfile;