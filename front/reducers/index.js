/* -------------------- 메인 데이터 리듀서 -------------------- */



// 리덕스 불러오기
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

// 사용자 리듀서, 게시글 리듀서 불러오기
import user from './user';
import post from './post';



// 리듀서(Reducer) : 이전 상태를 액션을 통해 불변성 지키면서 다음 상태로 만들어내는 함수
const rootReducer = combineReducers ({
  /* 리덕스 SSR을 위해 index 리듀서 추가 */
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE', action);
        return { ...state, ...payload };
      default:
        return state;
    }
  },
  /* user 안의 사용자 initialState */
  user,
  /* post) 안의 게시글 initialState */
  post,
});



// 루트 리듀서 내보내기
export default rootReducer;