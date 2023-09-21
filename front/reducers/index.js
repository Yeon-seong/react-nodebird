/* -------------------- 리덕스 구현 -------------------- */


// 불러오기
import { HYDRATE } from 'next-redux-wrapper';



// 중앙 데이터 저장소(기본 state)
const initialState = {
  /* 사용자 데이터 */
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  /* 포스트 데이터 */
  post: {
    mainPosts: [],
  }
};


// 로그인 액션 생성함수(action creator)
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}
// 로그아웃 액션 생성함수(action creator)
export const logoutAction = (data) => {
  return {
    type: 'LOG_OUT',
  }
}

// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태를 만들어내는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return { ...state, ...payload };
    /* ----- 로그인 리듀서 ----- */
    case 'LOG_IN':
      return {
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    /* ----- 로그아웃 리듀서 ----- */
    case 'LOG_OUT':
      return {
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
    default:
      return state;
  }
};



export default rootReducer;