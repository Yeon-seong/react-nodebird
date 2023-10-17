/* -------------------- 사용자 데이터 리듀서 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  isLoggingIn: false,   // 로그인 시도 중
  isLoggedIn: false,
  isLoggingOut: false,  // 로그아웃 시도 중
  me: null,
  signUpData: {},
  loginData: {},
}


// 로그인 : 요청, 성공, 실패
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// 로그아웃 : 요청, 성공, 실패
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// 회원가입 : 요청, 성공, 실패
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// 팔로우 : 요청, 성공, 실패
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

// 언팔로우 : 요청, 성공, 실패
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';



// 로그인 요청 액션 생성함수(action creator)
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}


// 로그아웃 액션 생성함수(action creator)
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ----- 로그인 요청 리듀서 ----- */
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    /* ----- 로그인 성공 리듀서 ----- */
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        // 고정 닉네임
        me: { ...action.data, nickname: 'yeonseong' },
      };
    /* ----- 로그인 실패 리듀서 ----- */
    case LOG_IN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    /* ----- 로그아웃 요청 리듀서 ----- */
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
      };
    /* ----- 로그아웃 성공 리듀서 ----- */
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    /* ----- 로그아웃 실패 리듀서 ----- */
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;