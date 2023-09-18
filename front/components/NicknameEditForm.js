/* -------------------- 트위터 닉네임 수정 폼 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useMemo } from 'react';
import { Form, Input } from 'antd';



// 닉네임 에디터 폼 컴포넌트(사용자 정의 태그)
const NicknameEditForm = () => {

  /* 닉네임 에디터 폼 컴포넌트 스타일 */
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px'
  }), []);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        id="닉네임 수정 폼"
      />
    </Form>
  );
};



// 닉네임 에디터 폼 컴포넌트 내보내기
export default NicknameEditForm;