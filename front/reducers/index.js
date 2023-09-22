/* -------------------- 리덕스 구현 -------------------- */


// 불러오기
import { HYDRATE } from 'next-redux-wrapper';



// 중앙 데이터 저장소(기본 state)
const initialState = {
  /* 사용자 데이터 */
  user: {

  },
  /* 포스트 데이터 */
  post: {
    
  }
};


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태를 만들어내는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return { ...state, ...payload };
    default:
      return state;
  }
};



// 루트 리듀서 내보내기
export default rootReducer;