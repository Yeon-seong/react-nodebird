/* -------------------- 사용자 데이터 리듀서 -------------------- */



// Immer 라이브러리 불러오기
import produce from 'immer';



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  logInLoading: false,  // 로그인 시도 중
  logInDone: false,     // 로그인 완료
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

  followLoading: false,   // 팔로우 시도 중
  followDone: false,      // 팔로우 완료
  followError: null,      // 팔로우 에러

  unfollowLoading: false, // 언팔로우 시도 중
  unfollowDone: false,    // 언팔로우 완료
  unfollowError: null,    // 언팔로우 에러

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

// 내가 작성한 게시글, 내 게시글 삭제 액션 내보내기
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';


// 사용자 더미데이터
const dummyUser = (data) => ({
  ...data,  // 이메일과 비밀번호
  nickname: '다랑',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: '라디' }, { nickname: '아샤' }, { nickname: '에델' }],
  Followers: [{ nickname: '라디' }, { nickname: '아샤' }, { nickname: '에델' }],
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


// 리듀서(Reducer) : 이전 상태를 액션을 통해 불변성 지키면서 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
  // immer가 draft를 보고, 불변성을 지켜서 다음 상태로 만들어냄
  return produce(state, (draft) => {
    switch (action.type) {
      /* ---------- 로그인 요청 리듀서 ---------- */
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      /* ---------- 로그인 성공 리듀서 ---------- */
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        // 로그인 성공했을 때 실제 사용자 데이터
        draft.me = action.data;
        draft.logInDone = true;
        break;
      /* ---------- 로그인 실패 리듀서 ---------- */
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error; // 로그인 실패 확인
        break;

      
      /* ---------- 로그아웃 요청 리듀서 ---------- */
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      /* ---------- 로그아웃 성공 리듀서 ---------- */
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      /* ---------- 로그아웃 실패 리듀서 ---------- */
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;  // 로그아웃 실패 확인
        break;

      
      /* ---------- 회원가입 요청 리듀서 ---------- */
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      /* ---------- 회원가입 성공 리듀서 ---------- */
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      /* ---------- 회원가입 실패 리듀서 ---------- */
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;  // 회원가입 실패 확인
        break;

      
      /* ---------- 닉네임 변경 요청 리듀서 ---------- */
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      /* ---------- 닉네임 변경 성공 리듀서 ---------- */
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      /* ---------- 닉네임 변경 실패 리듀서 ---------- */
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;  // 닉네임 변경 실패 확인
        break;


      /* ---------- 팔로우 요청 리듀서 ---------- */
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      /* ---------- 팔로우 성공 리듀서 ---------- */
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        // 내가 팔로잉한 사람의 아이디(action.data)
        draft.me.Followings.push({ id: action.data });
        draft.followDone = true;
        break;
      /* ---------- 팔로우 실패 리듀서 ---------- */
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error; // 팔로우 실패 확인


      /* ---------- 언팔로우 요청 리듀서 ---------- */
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      /* ---------- 언팔로우 성공 리듀서 ---------- */
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        // 내가 팔로잉한 사람(action.data) 중에서 팔로우 끊기
        draft.me.Followings
        = draft.me.Followings.filter((v) => v.id !== action.data);
        draft.unfollowDone = true;
        break;
      /* ---------- 언팔로우 실패 리듀서 ---------- */
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error; // 언팔로우 실패 확인


      /* ---------- 내가 작성한 게시글 리듀서 ---------- */
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;

        
      /* ---------- 내 게시글 삭제 리듀서 ---------- */
      case REMOVE_POST_OF_ME:
        draft.me.Posts
        = draft.me.Posts.filter((v) => v.id !== action.data);
        break;

      default:
        break;
    }
  });
};



// 리듀서 내보내기
export default reducer;