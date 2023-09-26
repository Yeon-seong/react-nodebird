/* -------------------- 트위터 포스트 카드 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Popover, Space, Button, Avatar } from 'antd';

import { RetweetOutlined, HeartOutlined,
         MessageOutlined, EllipsisOutlined }
         from '@ant-design/icons';
         
// 내부 컴포넌트 불러오기
import PostImages from './PostImages';



// 포스트 카드 컴포넌트(사용자 정의 태그)
const PostCard = ({ post }) => {
  /* 사용자 본인 글을 알아보기 위해 옵셔널 체이닝(?.) 연산자 사용 */
  const id = useSelector((state) =>
    state.user.me?.id
  );
  return (
    <div>
      <Card
        /* ---------- 이미지 ---------- */
        cover={post.Images[0] && <PostImages images={post.Images} />}
        /* ---------- 액션 버튼 ---------- */
        actions={[
          /* ----- 리트윗 버튼 ----- */
          <RetweetOutlined key="retweet" />,
          /* ----- 좋아요 버튼 ----- */
          <HeartOutlined key="heart" />,
          /* ----- 답글 버튼 ----- */
          <MessageOutlined key="comment" />,
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
      </Card>
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