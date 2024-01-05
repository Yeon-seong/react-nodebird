/* -------------------- 트위터 게시글 폼 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback, useRef, useEffect } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useSelector, useDispatch } from 'react-redux';

// 외부 컴포넌트 불러오기
import { Form, Input, Button } from 'antd';

// 커스텀 Hooks 불러오기
import useInput from '../hooks/useInput';

// 게시글 액션 불러오기
import {
  
  /* ---------- 게시글 추가 요청 액션 ---------- */
  ADD_POST_REQUEST,

  /* ---------- 이미지 업로드 요청 액션 ---------- */
  UPLOAD_IMAGES_REQUEST,

  /* ---------- 이미지 제거 동기 액션 ---------- */
  REMOVE_IMAGE,

} from '../reducers/post';



// 게시글 폼 컴포넌트(사용자 정의 태그)
const PostForm = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 게시글 인풋 창에 값을 입력했을 때 상태 변경 */
  const [postText, onChangePostText, setPostText] = useInput('');

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);


  
  // 게시글 추가 완료 시 게시글 폼 글자 지우기
  useEffect(() => {
    if (addPostDone) {
      setPostText('');
    }
  }, [addPostDone]);


  
  // 게시글 폼 제출 콜백 함수
  const onSubmitForm = useCallback(() => {
    /* 만약 게시글을 안 쓰면 '게시글을 작성하세요.' alert 창 띄우기 */
    if (!postText || !postText.trim()) {
      return alert('게시글을 작성하세요.');
    }
    /* 폼 데이터 : 'upload.none' 미들웨어를 써보기 위한 연습 */
    const formData = new FormData();
    imagePaths.forEach((p) => {
      // key인 'image'는 백엔드로 데이터 전달 시 req.body.image가 된다.
      formData.append('image', p);
    });
    // key인 'content'는 백엔드로 데이터 전달 시 req.body.content가 된다.
    formData.append('content', postText);
    // 게시글 폼 제출 시 게시글 추가 요청 액션 객체 디스패치
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData, // formData를 게시글 추가 요청 액션에 전달
    });
  }, [postText, imagePaths]);


  
  /* 이미지 인풋 창 = useRef 함수라고 선언 */
  const imageInput = useRef();

  // 이미지 업로드 버튼 클릭 시 파일 업로드 창 띄우기 콜백 함수
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  
  
  // 컴포넌트의 속성(props)으로 이미지 업로드 정보를 넘기는 콜백 함수
  const onChangeImages = useCallback((e) => {

    // e.target.files : 사용자가 선택했던 이미지에 대한 정보
    console.log('images', e.target.files);

    // FormData : 선택했던 이미지 정보를 멀티파트(multipart) 형식으로 서버로 보내기
    const imageFormData = new FormData();

    // [].forEach.call : 유사배열 e.target.files의 원소 가져오기
    [].forEach.call(e.target.files, (f) => {
      // 이미지 업로드 라우터의 'image'와 key 값이 일치해야 받아올 수 있다.
      imageFormData.append('image', f);
    });

    /* 이미지 업로드 요청 액션 객체 디스패치 */
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });


  
  // 이미지 제거 콜백 함수
  /* map 안에 index라는 데이터를 넣기 위해 콜백 함수를 고차함수로 만든다. */
  const onRemoveImage = useCallback((index) => () => {
    // 이미지 제거 동기 액션 객체 디스패치
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });



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
          name="image"
          type="file"
          multiple hidden ref={imageInput}
          onChange={onChangeImages} // 이미지 선택 확인을 누르면 해당 이벤트 실행
        />

        {/* ---------- 이미지 업로드 버튼 ---------- */}
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>

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
        {imagePaths?.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
          {/* 이미지 미리보기 주소(경로) : 백엔드 서버 주소 */}
          <img src={`http://localhost:3065/${v}`}
            style={{ width: '200px' }}
            alt={v}
          />
          <div>
            {/* ---------- 이미지 제거 버튼 ---------- */}
            <Button onClick={onRemoveImage(i)}>제거</Button>
          </div>
        </div> 
        ))}
      </div>
    </Form>
  );
};



// 게시글 폼 컴포넌트 내보내기
export default PostForm;