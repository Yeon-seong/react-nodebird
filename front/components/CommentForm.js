/* -------------------- 트위터 답글 폼 -------------------- */



// 외부 컴포넌트 불러오기
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

// 커스텀 Hooks 불러오기
import useInput from '../hooks/useInput';

// reducer 답글 추가 요청 액션 불러오기
import { ADD_COMMENT_REQUEST } from '../reducers/post';



// 코멘트 폼 컴포넌트(사용자 정의 태그)
const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  /* 사용자 본인 글을 알아보기 위해 옵셔널 체이닝(?.) 연산자 사용 */
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');


  /* ----- 답글 추가 완료 시 답글 폼 글자 지우기 ----- */
  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);


  /* ----- 답글 폼 제출 시 답글 요청 액션 객체 디스패치 ----- */
  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);


  return (
    /* ---------- 답글 폼 ---------- */
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: '0px' }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
          placeholder="무슨 일이 일어나고 있나요?"
        />
        {/* ----- 답글 작성 버튼 ----- */}
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
        >
          게시하기
        </Button>
      </Form.Item>
    </Form>
  );
};



// 코멘트 폼 컴포넌트의 post props 데이터 타입 검사
CommentForm.propTypes = {
	/* Object 객체 필수 검사 */
  post: PropTypes.object.isRequired,
};

// 코멘트 폼 컴포넌트 내보내기
export default CommentForm;