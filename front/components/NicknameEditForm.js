/* -------------------- 트위터 닉네임 수정 폼 -------------------- */



// React 라이브러리 훅 불러오기
import React, { useCallback, useMemo } from 'react';

// Redux 라이브러리 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import { Form, Input } from 'antd';

// 내부 컴포넌트 불러오기
import useInput from '../hooks/useInput';

// 닉네임 변경 요청 액션 생성함수 불러오기
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';



// 닉네임 에디터 폼 컴포넌트(사용자 정의 태그)
const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  /* 닉네임 변경 폼 제출 시 닉네임 변경 요청 액션 객체 디스패치 */
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    }); 
  }, [nickname]);

  /* 닉네임 에디터 폼 컴포넌트 스타일 */
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px'
  }), []);

  return (
    <Form
      style={style}
      onFinish={onSubmit}
    >
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        id="닉네임 수정 폼"
      />
    </Form>
  );
};



// 닉네임 에디터 폼 컴포넌트 내보내기
export default NicknameEditForm;