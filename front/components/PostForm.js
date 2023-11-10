/* -------------------- 트위터 게시글 폼 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useCallback, useRef, useEffect } from 'react';

// Redux 라이브러리 불러오기
import { useSelector, useDispatch } from 'react-redux';

// 외부 컴포넌트 불러오기
import { Form, Input, Button } from 'antd';

// 커스텀 Hooks 불러오기
import useInput from '../hooks/useInput';

// 게시글 추가 요청 액션 생성함수 불러오기
import { addPost } from '../reducers/post';



// 게시글 폼 컴포넌트(사용자 정의 태그)
const PostForm = () => {
  const dispatch = useDispatch();
  const [postText, onChangePostText, setPostText] = useInput('');
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);


  /* ---------- 게시글 추가 완료 시 게시글 폼 글자 지우기 ---------- */
  useEffect(() => {
    if (addPostDone) {
      setPostText('');
    }
  }, [addPostDone]);


  /* ---------- 게시글 폼 제출 시 게시글 카드 추가 ---------- */
  const onSubmitForm = useCallback(() => {
    dispatch(addPost(postText));
  }, [postText]);


  /* ---------- 이미지 업로드 버튼 클릭 시 파일 업로드 창 띄우기 ---------- */
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  

  return (
    <Form
      style={{ margin: '10px 0px 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmitForm}
    >

      <Input.TextArea
        id="post-form"
        value={postText}
        onChange={onChangePostText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />

      <div>
        {/* ---------- 파일 업로드 인풋 ---------- */}
        <input
          id="file-upload"
          type="file"
          multiple hidden
          ref={imageInput}
        />

        {/* ---------- 이미지 업로드 버튼 ---------- */}
        <Button onClick={onClickImageUpload}>
          이미지 업로드
        </Button>

        {/* ---------- 게시글 작성 버튼 ---------- */}
        <Button
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
          loading={addPostLoading}
        >
          트윗하기
        </Button>
      </div>


      <div>
        {/* ---------- 이미지 업로드 시 미리보기 ---------- */}
        {imagePaths?.map((v) => {
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



// 게시글 폼 컴포넌트 내보내기
export default PostForm;