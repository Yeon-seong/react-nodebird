/* -------------------- 트위터 사용자 입력 창 커스텀 Hook -------------------- */



// React 라이브러리 Hook 불러오기
import { useState, useCallback } from 'react';



// 커스텀 Hook으로 중복 코드 제거하기
export default function useInput(initialValue = null) {

  /* 현재 id, nickname, password 초기 값 상태 저장 */
  const [value, setValue] = useState(initialValue);


  /* 컴포넌트의 속성(props)으로 답글 폼 글자 지우기 정보를 넘기는 콜백 함수 */
  // 컴포넌트의 속성으로 넘겨주는 값들은 콜백 함수(useCallback) 사용
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);


  return [value, handler, setValue];
};



  /* value에 들어가는 값 : id, nickname, password */
  /* handler에 들어가는 값 : onChangeId, onChangeNickname, onChangePassword */
  /* setValue에 들어가는 값 : setCommentText */