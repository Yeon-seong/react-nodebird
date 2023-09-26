/* -------------------- 트위터 포스트 카드 -------------------- */


// 외부 컴포넌트 불러오기
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button } from 'antd';
import { RetweetOutlined, HeartOutlined,
         MessageOutlined, EllipsisOutlined }
         from '@ant-design/icons';



// 포스트 카드 컴포넌트(사용자 정의 태그)
const PostCard = ({ post }) => {
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
              <>
                {/* ----- 수정 버튼 ----- */}
                <Button>수정</Button>
                {/* ----- 삭제 버튼 ----- */}
                <Button type="danger">삭제</Button>
                {/* ----- 신고 버튼 ----- */}
                <Button>신고</Button>
              </>
            )}>
            <EllipsisOutlined />
          </Popover>
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