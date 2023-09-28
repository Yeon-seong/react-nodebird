/* -------------------- 트위터 포스트 카드 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Popover, Space, Button, Avatar, List, Comment } from 'antd';

import { RetweetOutlined, HeartOutlined, HeartTwoTone,
         MessageOutlined, EllipsisOutlined }
         from '@ant-design/icons';
         
// 내부 컴포넌트 불러오기
import PostImages from './PostImages';
import CommentForm from './CommentForm';



// 포스트 카드 컴포넌트(사용자 정의 태그)
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  /* ----- '좋아요'와 답글 버튼 토글 ----- */
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  /* 사용자 본인 글을 알아보기 위해 옵셔널 체이닝(?.) 연산자 사용 */
  const id = useSelector((state) =>
    state.user.me?.id
  );

  return (
    <div style={{ marginBottom: '20px' }}>
      <Card
        /* ---------- 이미지 ---------- */
        cover={post.Images[0]
        && <PostImages images={post.Images} />}
        /* ---------- 액션 버튼 ---------- */
        actions={[
          /* ----- 리트윗 버튼 ----- */
          <RetweetOutlined key="retweet" />,
          /* ----- 좋아요 버튼 ----- */
          liked
            // '좋아요'가 눌러진 상태
            ? <HeartTwoTone
                twoToneColor="#eb2f96"
                key="heart"
                onClick={onToggleLike}
              />
            // '좋아요'가 안 눌러진 상태
            : <HeartOutlined
                key="heart"
                onClick={onToggleLike}
              />,
          /* ----- 답글 버튼 ----- */
          <MessageOutlined
            key="comment"
            onClick={onToggleComment}
          />,
          /* ----- 더보기 버튼 ----- */
          <Popover key="more"
            content={(
              <Space>
                {/* 나의 id와 포스트 작성자의 id가 같으면 더보기 버튼에 수정 삭제 버튼 표시 */}
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  )
                  /* 나의 id와 포스트 작성자의 id가 다르면 더보기 버튼에 신고 버튼 표시 */
                  : <Button>신고</Button>}
              </Space>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {/* ---------- 포스트 ---------- */}
        <Card.Meta
          // mainPosts 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          // mainPosts 포스트 작성자 이름 
          title={post.User.nickname}
          // mainPosts 포스트 콘텐츠
          description={post.content}
        />
      </Card>
      {/* ---------- 답글 창 ---------- */}
      {commentFormOpened && (
        <div>
          {/* ----- 답글 작성 정보 ----- */}
          <CommentForm post={post} />
          <List
            /* ----- 답글 개수 ----- */
            header={`${post.Comments.length}개의 답글`}
            /* ----- 항목 레이아웃 ----- */
            itemLayout="horizontal"
            /* ----- 목록용 데이터소스 배열 ----- */
            dataSource={post.Comments}
            /* ----- 사용할 때 목록 항목을 사용자 정의 ----- */
            renderItem={(item) => (
              <li>
                <Comment
                  /* ----- 답글 작성자 ----- */
                  author={item.User.nickname}
                  /* 답글 작성자 닉네임의 첫 번째 글자를 아바타 아이콘으로 표시 */
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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



// 포스트 카드 컴포넌트의 post props 데이터 타입 검사
PostCard.propTypes = {
	/* ----- 구체적으로 post Object를 필수 검사 ----- */
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

// 포스트 카드 컴포넌트 내보내기
export default PostCard;