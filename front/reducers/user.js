/* -------------------- 사용자 데이터 리듀서 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
}


// 로그인 요청 액션 생성함수(action creator)
export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  }
}
// 로그인 성공 액션 생성함수(action creator)
export const loginSuccessAction = (data) => {
  return {
    type: 'LOG_IN_SUCCESS',
    data,
  }
}
// 로그인 실패 액션 생성함수(action creator)
export const loginFailureAction = (data) => {
  return {
    type: 'LOG_IN_FAILURE',
    data,
  }
}


// 로그아웃 액션 생성함수(action creator)
export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  }
}
// 로그아웃 성공 액션 생성함수(action creator)
export const logoutSuccessAction = () => {
  return {
    type: 'LOG_OUT_SUCCESS',
  }
}
// 로그아웃 실패 액션 생성함수(action creator)
export const logoutFailureAction = () => {
  return {
    type: 'LOG_OUT_FAILURE',
  }
}


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ----- 로그인 요청 리듀서 ----- */
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    /* ----- 로그인 성공 리듀서 ----- */
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    /* ----- 로그인 실패 리듀서 ----- */
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    /* ----- 로그아웃 요청 리듀서 ----- */
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    /* ----- 로그아웃 성공 리듀서 ----- */
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    /* ----- 로그아웃 실패 리듀서 ----- */
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;