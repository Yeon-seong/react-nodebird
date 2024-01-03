/* -------------------- 메인 데이터 리듀서 -------------------- */



// HYDRATE 액션 불러오기
import { HYDRATE } from 'next-redux-wrapper';

// combineReducers 함수 불러오기
import { combineReducers } from 'redux';

// 사용자 리듀서, 게시글 리듀서 불러오기
import user from './user';
import post from './post';



// 리듀서(Reducer) : 이전 상태를 액션을 통해 불변성 지키면서 다음 상태로 만들어내는 함수
const rootReducer = (state, action) => {
  switch (action.type) {
    /* 루트 리듀서의 상태 전체를 다 덮어씌우기 위해 HYDRATE를 넣었다. */
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      /* ---------- user와 post를 합친 리듀서 함수 ---------- */
      const combineReducer = combineReducers({
        /* user 안의 사용자 기본 상태(initialState) */
        user,
        /* post 안의 게시글 기본 상태(initialState) */
        post, 
      });
      return combineReducer(state, action);
    }
  }
};
/*
  위 코드는 아래 코드와 똑같다.
  const rootReducer = combineReducers({
    user,
    post, 
  })
*/



// 루트 리듀서 내보내기
export default rootReducer;