/* -------------------- 트위터 특정한 사용자의 정보를 보여주는 페이지 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector } from 'react-redux';

// END 액션 불러오기
import { END } from 'redux-saga';

// 외부 컴포넌트 불러오기
import Head from 'next/head';
import { Avatar, Card } from 'antd';

// 내부 컴포넌트 불러오기
import AppLayout from '../components/AppLayout';

// wrapper 불러오기
import wrapper from '../store/configureStore';

// 다른 사용자 정보 불러오기 요청 액션 불러오기
import { LOAD_USER_REQUEST } from '../reducers/user';



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
              <div key="twit">트윗<br />{userInfo.Posts.length}</div>,
              <div key="following">팔로잉<br />{userInfo.Followings.length}</div>,
              <div key="follower">팔로워<br />{userInfo.Followers.length}</div>,
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



// 서버사이드 렌더링(SSR) : getStaticProps 사용
/* 어바웃 컴포넌트보다 먼저 실행, 매개변수 context 안에 store가 들어있다. */
export const getStaticProps = wrapper.getStaticProps(async (context) => {
  /* 다른 사용자 정보 불러오기 요청 액션 객체 디스패치 */
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  /* 다른 사용자 정보 불러오기 요청(REQUEST)이 성공(SUCCESS)으로 바뀔 때까지 기다리기 */
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});



// 어바웃 컴포넌트 내보내기
export default About;