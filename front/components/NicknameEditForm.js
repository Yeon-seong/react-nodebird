/* -------------------- 트위터 닉네임 수정 폼 -------------------- */



// React 라이브러리 Hook 불러오기
import React, { useCallback, useMemo } from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch, useSelector } from 'react-redux';

// 외부 컴포넌트 불러오기
import { Form, Input } from 'antd';

// 커스텀 Hooks 불러오기
import useInput from '../hooks/useInput';

// 닉네임 변경 요청 액션 불러오기
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';



// 닉네임 에디터 폼 컴포넌트(사용자 정의 태그)
const NicknameEditForm = () => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  /* 중앙 데이터 저장소에서 상태 값 가져오기 */
  const { me } = useSelector((state) => state.user);

  /* 닉네임 입력 창에 값을 입력했을 때 상태 변경
     사용자 본인 닉네임을 알아보기 위해 옵셔널 체이닝(?.) 연산자 사용 */
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');



  // 닉네임 변경 폼 제출 시 닉네임 변경 요청 액션 객체 디스패치 콜백 함수
  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);


  // 닉네임 에디터 폼 컴포넌트 스타일
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px'
  }), []);



  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        id="닉네임 수정 폼"
        onSearch={onSubmit}
      />
    </Form>
  );
};



// 닉네임 에디터 폼 컴포넌트 내보내기
export default NicknameEditForm;