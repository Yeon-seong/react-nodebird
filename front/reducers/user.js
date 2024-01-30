/* -------------------- 사용자 데이터 리듀서 -------------------- */



// 인터넷 익스플로러에서 Immer를 사용하기 위해 produce 함수 불러오기
import produce from '../util/produce';



// 중앙 데이터 저장소(기본 state)
export const initialState = {

  /* 나의 사용자 정보 불러오기 시도 중, 완료, 에러 */
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  /* 다른 사용자 정보 불러오기 시도 중, 완료, 에러 */
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,

  /* 팔로워 불러오기 시도 중, 완료, 에러 */
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,

  /* 팔로잉 불러오기 시도 중, 완료, 에러 */
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,

  /* 로그인 시도 중, 완료, 에러 */
  logInLoading: false,
  logInDone: false,
  logInError: null,

  /* 로그아웃 시도 중, 완료, 에러 */
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  /* 회원가입 시도 중, 완료, 에러 */
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  /* 닉네임 변경 시도 중, 완료, 에러 */
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  /* 팔로우 시도 중, 완료, 에러 */
  followLoading: false,
  followDone: false,
  followError: null,

  /* 언팔로우 시도 중, 완료, 에러 */
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

  /* 팔로워 제거 시도 중, 완료, 에러 */
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,

  /* 로그인한 사용자 정보 */
  me: null,
  
  /* 다른 사용자 정보 */
  userInfo: null,
}



// 나의 사용자 정보 불러오기 액션 : 요청, 성공, 실패 액션 내보내기
export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

// 다른 사용자 정보 불러오기 액션 : 요청, 성공, 실패 액션 내보내기
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

// 팔로워 불러오기 액션 : 요청, 성공, 실패 액션 내보내기
export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

// 팔로잉 불러오기 액션 : 요청, 성공, 실패 액션 내보내기
export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

// 로그인 액션 : 요청, 성공, 실패 액션 내보내기
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// 로그아웃 액션 : 요청, 성공, 실패 액션 내보내기
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// 회원가입 액션 : 요청, 성공, 실패 액션 내보내기
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// 닉네임 변경 액션 : 요청, 성공, 실패 액션 내보내기
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

// 팔로우 액션 : 요청, 성공, 실패 액션 내보내기
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

// 언팔로우 액션 : 요청, 성공, 실패 액션 내보내기
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

// 팔로워 제거 액션 : 요청, 성공, 실패 액션 내보내기
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

// 내가 작성한 게시글, 내 게시글 삭제 액션 내보내기
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';



// 로그인 요청 액션 생성함수(action creator) 내보내기
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
}

// 로그아웃 액션 생성함수(action creator) 내보내기
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

      /* ---------- 나의 사용자 정보 불러오기 요청 리듀서 ---------- */
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      /* ---------- 나의 사용자 정보 불러오기 성공 리듀서 ---------- */
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        // 나의 사용자 정보 불러오기 성공 시 실제 사용자 데이터, 사용자 정보가 없으면 Null
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      /* ---------- 나의 사용자 정보 불러오기 실패 리듀서 ---------- */
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error; // 나의 사용자 정보 불러오기 실패 확인
        break;


      /* ---------- 다른 사용자 정보 불러오기 요청 리듀서 ---------- */
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      /* ---------- 다른 사용자 정보 불러오기 성공 리듀서 ---------- */
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        // 다른 사용자 정보 불러오기 성공 시 실제 사용자 데이터, 사용자 정보가 없으면 Null
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      /* ---------- 다른 사용자 정보 불러오기 실패 리듀서 ---------- */
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error; // 다른 사용자 정보 불러오기 실패 확인
        break;


      /* ---------- 팔로워 불러오기 요청 리듀서 ---------- */
      case LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      /* ---------- 팔로워 불러오기 성공 리듀서 ---------- */
      case LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        // 나의 팔로워 불러오기 성공 시 실제 나의 팔로워 데이터, 나의 팔로워가 없으면 Null
        draft.me.Followers = action.data;
        draft.loadFollowersDone = true;
        break;
      /* ---------- 팔로워 불러오기 실패 리듀서 ---------- */
      case LOAD_FOLLOWERS_FAILURE:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error; // 팔로워 불러오기 실패 확인
        break;


      /* ---------- 팔로잉 불러오기 요청 리듀서 ---------- */
      case LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      /* ---------- 팔로잉 불러오기 성공 리듀서 ---------- */
      case LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        // 나의 팔로잉 불러오기 성공 시 실제 나의 팔로잉 데이터, 나의 팔로잉이 없으면 Null
        draft.me.Followings = action.data;
        draft.loadFollowingsDone = true;
        break;
      /* ---------- 팔로잉 불러오기 실패 리듀서 ---------- */
      case LOAD_FOLLOWINGS_FAILURE:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error; // 팔로잉 불러오기 실패 확인
        break;


      /* ---------- 로그인 요청 리듀서 ---------- */
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      /* ---------- 로그인 성공 리듀서 ---------- */
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        // 로그인 성공 시 실제 사용자 데이터
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
        draft.logOutError = action.error; // 로그아웃 실패 확인
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
        draft.signUpError = action.error; // 회원가입 실패 확인
        break;


      /* ---------- 닉네임 변경 요청 리듀서 ---------- */
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      /* ---------- 닉네임 변경 성공 리듀서 ---------- */
      case CHANGE_NICKNAME_SUCCESS:
        // 나의 닉네임을 변경한 닉네임(action.data.nickname)으로 바꿔주기
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      /* ---------- 닉네임 변경 실패 리듀서 ---------- */
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error; // 닉네임 변경 실패 확인
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
        // 내가 팔로잉한 사용자의 아이디 팔로우 하기
        draft.me.Followings.push({ id: action.data.UserId });
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
        // 내가 팔로잉한 사용자의 아이디 중에서 팔로우 끊기
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        draft.unfollowDone = true;
        break;
      /* ---------- 언팔로우 실패 리듀서 ---------- */
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error; // 언팔로우 실패 확인


      /* ---------- 팔로워 제거 요청 리듀서 ---------- */
      case REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;
      /* ---------- 팔로워 제거 성공 리듀서 ---------- */
      case REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        // 내가 팔로잉한 사용자의 아이디 중에서 팔로워 제거하기
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        draft.removeFollowerDone = true;
        break;
      /* ---------- 팔로워 제거 실패 리듀서 ---------- */
      case REMOVE_FOLLOWER_FAILURE:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error; // 팔로워 제거 실패 확인


      /* ---------- 내가 작성한 게시글 리듀서 ---------- */
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;


      /* ---------- 내 게시글 삭제 리듀서 ---------- */
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;

      default:
        break;
    }
  });
};



// 리듀서 내보내기
export default reducer;