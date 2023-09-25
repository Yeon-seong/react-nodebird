/* -------------------- 트위터 포스트 폼 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../reducers/post';


// 포스트 폼 컴포넌트(사용자 정의 태그)
const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);
  /* ----- 포스트 폼 제출 시 포스트 카드 추가 ----- */
  const onSubmit = useCallback(() => {
    dispatch(addPost);
  }, []);
  
  return (
    <Form
      style={{ margin: '10px 0px 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        id="post-form"
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        {/* ---------- 파일 업로드 인풋 ---------- */}
        <input
          id="file-upload"
          type="file"
          multiple hidden
        />
        {/* ---------- 이미지 업로드 버튼 ---------- */}
        <Button>
          이미지 업로드
        </Button>
        {/* ---------- 포스트 작성 버튼 ---------- */}
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
        >
          트윗하기
        </Button>
      </div>
      <div>
        {/* ---------- 이미지 업로드 시 미리보기 ---------- */}
        {imagePaths.map((v) => {
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        })}
      </div>
    </Form>
  );
};



// 포스트 폼 컴포넌트 내보내기
export default PostForm;