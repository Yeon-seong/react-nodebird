/* -------------------- 트위터 게시글 카드 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useState, useCallback } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector, useDispatch } from 'react-redux';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import { Card, Popover, Space, Button, Avatar, List, Comment } from 'antd';

// Ant Design 아이콘 불러오기
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

// 외부 컴포넌트 불러오기
import Link from 'next/link';

// 내부 컴포넌트 불러오기
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

// 게시글 액션 불러오기
import {

  /* ---------- 게시글 삭제 요청 액션 ---------- */
  REMOVE_POST_REQUEST,

  /* ---------- 게시글 좋아요 요청 액션 ---------- */
  LIKE_POST_REQUEST,

  /* ---------- 게시글 좋아요 취소 요청 액션 ---------- */
  UNLIKE_POST_REQUEST,

  /* ---------- 리트윗 요청 액션 ---------- */
  RETWEET_REQUEST,

} from '../reducers/post';



// 게시글 카드 컴포넌트(사용자 정의 태그)
const PostCard = ({ post }) => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();
  
  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { removePostLoading } = useSelector((state) => state.post);

  /* 현재 답글 창 상태 저장 */
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  /* 사용자 본인 글을 알아보기 위해 옵셔널 체이닝(?.) 연산자 사용 */
  const id = useSelector((state) => state.user.me?.id);


  // 게시글 삭제 콜백 함수
  const onRemovePost = useCallback(() => {
    /* 로그인 안했을 때 게시글 삭제 시 '로그인이 필요합니다.' alert 창 띄우기 */
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    /* 게시글 삭제 시 게시글 삭제 요청 액션 객체 디스패치 */
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);


  // 게시글 좋아요 콜백 함수
  const onLike = useCallback(() => {
    /* 로그인 안했을 때 게시글 좋아요 시 '로그인이 필요합니다.' alert 창 띄우기 */
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    /* 게시글 좋아요 시 게시글 좋아요 요청 액션 객체 디스패치 */
    return dispatch({
      type: LIKE_POST_REQUEST,   // 게시글 좋아요 요청 액션
      data: post.id,             // 게시글 아이디
    });
  }, [id]);


  // 게시글 좋아요 취소 콜백 함수
  const onUnlike = useCallback(() => {
    /* 로그인 안했을 때 게시글 좋아요 취소 시 '로그인이 필요합니다.' alert 창 띄우기 */
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    /* 게시글 좋아요 취소 요청 액션 객체 디스패치 */
    return dispatch({
      type: UNLIKE_POST_REQUEST, // 게시글 좋아요 취소 요청 액션
      data: post.id,             // 게시글 아이디
    });
  }, [id]);


  // 답글 버튼 토글 콜백 함수
  const onToggleComment = useCallback(() => {
    /* 로그인 안했을 때 답글 버튼 클릭 시 '로그인이 필요합니다.' alert 창 띄우기 */
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    return (
      setCommentFormOpened((prev) => !prev)
    );
  }, [id]);

  
  // 리트윗 버튼 콜백 함수
  const onRetweet = useCallback(() => {
    // 로그인을 안했을 때 '로그인이 필요합니다.' alert 창 띄우기
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    /* 리트윗 요청 액션 객체 디스패치 */
    return dispatch({
      type: RETWEET_REQUEST, // 리트윗 요청 액션
      data: post.id,         // 게시글 아이디
    });
  }, [id]);


  // 게시글 좋아요 누른 사람 중에 내(id)가 있는지 찾기
  const liked = post.Likers.find((v) => v.id === id);



  return (
    <div style={{ marginBottom: '20px' }}>
      
      <Card
        /* ---------- 이미지 : 이미지는 1개 이상 ---------- */
        cover={post.Images[0] && <PostImages images={post.Images} />}
        /* ---------- 액션 버튼 ---------- */
        actions={[
          /* ---------- 리트윗 버튼 ---------- */
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          /* ---------- 좋아요 버튼 ---------- */
          liked
            // 좋아요를 누른 상태 : 좋아요 취소 버튼 보여주기
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            // 좋아요를 취소한 상태 : 좋아요 버튼 보여주기
            : <HeartOutlined key="heart" onClick={onLike} />,
          /* ---------- 답글 버튼 ---------- */
          <MessageOutlined key="comment" onClick={onToggleComment}
          />,
          /* ---------- 더보기 버튼 ---------- */
          <Popover key="more"
            content={(
              <Space>
                {/* 나의 id와 게시글 작성자의 id가 같으면 더보기 버튼에 수정 삭제 버튼 표시 */}
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button
                        type="danger"
                        loading={removePostLoading}
                        onClick={onRemovePost}>삭제
                      </Button>
                    </>
                  )
                  /* 나의 id와 게시글 작성자의 id가 다르면 더보기 버튼에 신고 버튼 표시 */
                  : <Button>신고</Button>}
              </Space>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        /* 카드 제목 */
        title={post.RetweetId
          // 리트윗 게시글이면 게시글 사용자 닉네임님이 리트윗 하셨습니다. 제목 써주기 
          ? `${post.User.nickname}님이 리트윗 하셨습니다.`
          // 일반 게시글이라면 제목 안 써주기
          : null
        }
        /* 로그인했을 때만 팔로우 버튼 보여주기 */
        extra={id && <FollowButton post={post} />}
      > {/* Card 닫기 */}

        {/* ---------- 리트윗 게시글 ---------- */}
        {post.RetweetId && post.Retweet
          ? (
            <Card
              /* ---------- 이미지 : 이미지는 1개 이상 ---------- */
              cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
            >
              <Card.Meta
                /* 리트윗 게시글 카드에서 아바타를 누르면 그 사용자가 쓴 게시글 페이지로 이동하기
                   메인 게시글을 리트윗한 사용자 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
                avatar={
                  <Link href={`/user/${post.Retweet.User.id}`}>
                    <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                  </Link>
                }
                // 메인 게시글 리트윗한 게시글 작성자 이름 
                title={post.Retweet.User.nickname}
                // 메인 게시글 게시글 콘텐츠
                description={<PostCardContent postData={post.Retweet.content} />}
              />
            </Card>
          )
          : (
            /* ---------- (리트윗을 하지않은) 일반 게시글 ---------- */
            <Card.Meta
              /* 일반 게시글 카드에서 아바타를 누르면 그 사용자가 쓴 게시글 페이지로 이동하기
                 메인 게시글 사용자 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                </Link>
              }
              // 메인 게시글 작성자 이름 
              title={post.User.nickname}
              // 메인 게시글 콘텐츠
              description={<PostCardContent postData={post.content} />}
            />
          )}
      </Card>

      {/* ---------- 답글 창 ---------- */}
      {commentFormOpened && (
        <div>
          {/* ---------- 답글 작성 정보 ---------- */}
          <CommentForm post={post} />
          <List
            /* ---------- 답글 개수 ---------- */
            header={`${post.Comments.length}개의 답글`}
            /* ---------- 항목 레이아웃 ---------- */
            itemLayout="horizontal"
            /* ---------- 목록용 데이터소스 배열 ---------- */
            dataSource={post.Comments}
            /* ---------- 사용할 때 목록 항목을 사용자 정의 ---------- */
            renderItem={(item) => (
              <li>
                <Comment
                  /* ---------- 답글 작성자 ---------- */
                  author={item.User.nickname}
                  avatar={(
                    /* 답글 작성자의 아바타를 누르면 그 사용자가 쓴 게시글 페이지로 이동하기
                       답글 작성자 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
                    <Link href={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};



// 게시글 카드 컴포넌트의 post props 데이터 타입 검사
PostCard.propTypes = {
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
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

// 게시글 카드 컴포넌트 내보내기
export default PostCard;