/* -------------------- 트위터 사용자 인풋 커스텀 훅 -------------------- */


// 외부 컴포넌트 불러오기
import { useState, useCallback } from 'react';



// 커스텀 Hooks로 중복 코드 제거
export default function useInput(initialValue = null) {
  /* 컴포넌트 상태 저장 : 리액트 Hooks useState 사용 */
  const [value, setValue] = useState(initialValue);
  /* 컴포넌트의 속성(props)으로 넘겨주는 값들은 useCallback 사용 */
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  /* value에 들어가는 값 : id, nickname, password */
  /* handler에 들어가는 값 : onChangeId, onChangeNickname, onChangePassword*/
  return [value, handler];
};