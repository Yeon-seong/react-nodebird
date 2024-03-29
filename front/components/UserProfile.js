/* -------------------- 트위터 사용자 프로필 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import Link from 'next/link';
import { Card, Avatar, Button } from 'antd';

// 로그아웃 액션 생성함수 불러오기
import { logoutRequestAction } from '../reducers/user';



// 사용자 프로필 컴포넌트(사용자 정의 태그)
const UserProfile = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { me, logOutLoading } = useSelector((state) => state.user);
  console.log(me);


  // 더미데이터 로그아웃 콜백 함수
  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);



  return (
    <Card
      actions={[
        // 트윗을 누르면 내가 쓴 게시글 페이지로 이동하기
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>
              트윗
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,

        // 팔로잉을 누르면 프로필 페이지로 이동하기
        <div key="following">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,

        // 팔로워를 누르면 프로필 페이지로 이동하기
        <div key="follower">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >

      <Card.Meta
        avatar={(
          /* 나의 사용자 프로필 카드에서 아바타를 누르면 내가 쓴 게시글 페이지로 이동하기
             닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
          <Link href={`/user/${me.id}`}>
            <a><Avatar>{me.nickname[0]}</Avatar></a>
          </Link>
        )}
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