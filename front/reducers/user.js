/* -------------------- 사용자 데이터 리듀서 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
}


// 로그인 액션 생성함수(action creator)
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  }
}

// 로그아웃 액션 생성함수(action creator)
export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ----- 로그인 리듀서 ----- */
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.data,
      };
    /* ----- 로그아웃 리듀서 ----- */
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;