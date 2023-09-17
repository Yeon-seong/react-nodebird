/* -------------------- 트위터 사용자 프로필 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import { Card, Avatar } from 'antd';



// 사용자 프로필 컴포넌트(사용자 정의 태그)
const UserProfile = () => {
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
    </Card>
  );
};



// 사용자 프로필 컴포넌트 내보내기
export default UserProfile;