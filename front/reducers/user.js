/* -------------------- 사용자 데이터 리듀서 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  logInLoading: false,  // 로그인 시도 중
  loginDone: false,     // 로그인 완료
  logInError: null,     // 로그인 에러

  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,    // 로그아웃 완료
  logOutError: null,    // 로그아웃 에러

  signUpLoading: false, // 회원가입 시도 중
  signUpDone: false,    // 회원가입 완료
  signUpError: null,    // 회원가입 에러

  changeNicknameLoading: false, // 닉네임 변경 시도 중
  changeNicknameDone: false,    // 닉네임 변경 완료
  changeNicknameError: null,    // 닉네임 변경 에러

  me: null,             // 로그인한 사용자 정보
  signUpData: {},
  loginData: {},
}


// 로그인 요청, 성공, 실패 액션 내보내기
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// 로그아웃 요청, 성공, 실패 액션 내보내기
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// 회원가입 요청, 성공, 실패 액션 내보내기
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// 닉네임 변경 요청, 성공, 실패 액션 내보내기
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

// 팔로우 요청, 성공, 실패 액션 내보내기
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

// 언팔로우 요청, 성공, 실패 액션 내보내기
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';


// 사용자 더미 데이터
const dummyUser = (data) => ({
  ...data,  // 이메일과 비밀번호
  nickname: '다랑',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});


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
        logInLoading: true,
        logInError: null,
        loginDone: false,
      };
    /* ----- 로그인 성공 리듀서 ----- */
    case LOG_IN_SUCCESS:
      return {
        ...state,
        logInLoading: false,
        loginDone: true,
        // 로그인 성공했을 때 사용자 더미 데이터
        me: dummyUser(action.data),
      };
    /* ----- 로그인 실패 리듀서 ----- */
    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };

    
    /* ----- 로그아웃 요청 리듀서 ----- */
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    /* ----- 로그아웃 성공 리듀서 ----- */
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    /* ----- 로그아웃 실패 리듀서 ----- */
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };

    
    /* ----- 회원가입 요청 리듀서 ----- */
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUPLoading: true,
        signUPDone: false,
        signUPError: null,
      };
    /* ----- 회원가입 성공 리듀서 ----- */
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUPLoading: false,
        signUPDone: true,
      };
    /* ----- 회원가입 실패 리듀서 ----- */
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUPLoading: false,
        signUPError: action.error,
      };

    
    /* ----- 닉네임 변경 요청 리듀서 ----- */
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    /* ----- 닉네임 변경 성공 리듀서 ----- */
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    /* ----- 닉네임 변경 실패 리듀서 ----- */
    case CHANGE_NICKNAME_FAILURE:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;