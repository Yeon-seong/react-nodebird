/* -------------------- 트위터 특정한 사용자의 정보를 보여주는 페이지 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import { Avatar, Card } from 'antd';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';



// 어바웃 컴포넌트(사용자 정의 태그)
const About = () => {
  
  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { userInfo } = useSelector((state) => state.user);



  return (
    <AppLayout>
      <Head>
        <title>다랑 | NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              /* ---------- 트윗 ---------- */
              <div key="twit">
                트윗하기
                <br />
                {userInfo.Posts}
              </div>,
              /* ---------- 팔로잉 ---------- */
              <div key="following">
                팔로잉
                <br />
                {userInfo.Following}
            </div>,
              /* ---------- 팔로워 ---------- */
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
            </div>,
            ]}
          >
            <Card.Meta
              /* 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="연성술사"
            />
          </Card>
        )
        : null}
    </AppLayout>
  );
};



// 어바웃 컴포넌트 내보내기
export default About;