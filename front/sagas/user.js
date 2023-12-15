/* -------------------- 트위터 사용자 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 사용자 액션 불러오기
import {

  /* ---------- 로그인 액션 : 요청, 성공, 실패 ---------- */
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,

  /* ---------- 로그아웃 액션 : 요청, 성공, 실패 ---------- */
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  
  /* ---------- 회원가입 액션 : 요청, 성공, 실패 ---------- */
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,

  /* ---------- 사용자 정보 불러오기 액션 : 요청, 성공, 실패 ---------- */
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,

  /* ---------- 닉네임 변경 액션 : 요청, 성공, 실패 ---------- */
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,

  /* ---------- 팔로우 액션 : 요청, 성공, 실패 ---------- */
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,

  /* ---------- 언팔로우 액션 : 요청, 성공, 실패 ---------- */
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE

} from '../reducers/user';



// logIn 실행 시 서버에 logInAPI 요청
function logInAPI(data) {
  return axios.post('/user/login', data);
}
// LOG_IN_REQUEST 액션이 실행되면 logIn 함수 실행
function* logIn(action) {
  /* ---------- 요청 성공 시 LOG_IN_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,         // 성공 결과 : 서버로부터 사용자 정보를 받아옴
    });

  /* ---------- 요청 실패 시 LOG_IN_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// logOut 실행 시 서버에 logOutAPI 요청
function logOutAPI() {
  return axios.post('/user/logout');
}
// LOG_OUT_REQUEST 액션이 실행되면 logOut 함수 실행
function* logOut() {
  /* ---------- 요청 성공 시 LOG_OUT_SUCCESS 액션 디스패치 ---------- */
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,    // 성공 결과
    });

  /* ---------- 요청 실패 시 LOG_OUT_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// signUp 실행 시 브라우저에서 바로 백엔드 서버로 요청 보내기
function signUpAPI(data) {
  return axios.post('/user', data);
}
// SIGN_UP_REQUEST 액션이 실행되면 signUp 함수 실행
function* signUp(action) {
  /* ---------- 요청 성공 시 SIGN_UP_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,    // 성공 결과
    });

  /* ---------- 요청 실패 시 SIGN_UP_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err); 
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// loadMyInfo 실행 시 서버에 loadMyInfoAPI 요청
function loadMyInfoAPI() {
  return axios.get('/user');
}
// LOG_IN_REQUEST 액션이 실행되면 loadMyInfo 함수 실행
function* loadMyInfo(action) {
  /* ---------- 요청 성공 시 LOAD_MY_INFO_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,         // 성공 결과 : 서버로부터 사용자 정보를 받아옴
    });

  /* ---------- 요청 실패 시 LOAD_MY_INFO_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// changeNickname 실행 시 서버에 changeNicknameAPI 요청
function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}
// LOG_IN_REQUEST 액션이 실행되면 changeNickname 함수 실행
function* changeNickname(action) {
  /* ---------- 요청 성공 시 CHANGE_NICKNAME_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,         // 성공 결과 : 서버로부터 사용자 정보를 받아옴
    });

  /* ---------- 요청 실패 시 CHANGE_NICKNAME_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// follow 실행 시 서버에 followAPI 요청
function followAPI(data) {
  return axios.patch(`/user/${data}/follow`); // data에는 사용자 아이디가 들어간다.
}
// FOLLOW_REQUEST 액션이 실행되면 follow 함수 실행
function* follow(action) {
  /* ---------- 요청 성공 시 FOLLOW_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data         // 성공 결과
    });

  /* ---------- 요청 실패 시 FOLLOW_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// unfollow 실행 시 서버에 unfollowAPI 요청
function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`); // data에는 사용자 아이디가 들어간다.
}
// UNFOLLOW_REQUEST 액션이 실행되면 unfollow 함수 실행
function* unfollow(action) {
  /* ---------- 요청 성공 시 UNFOLLOW_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data         // 성공 결과
    });
    
  /* ---------- 요청 실패 시 UNFOLLOW_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// 로그인 액션
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}


// 로그아웃 액션
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}


// 회원가입 액션
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}


// 사용자 정보 불러오기 액션
function* watchloadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}


// 닉네임 변경 액션
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}


// 팔로우 액션
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}


// 언팔로우 액션
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}



// 사용자 Saga 액션 등록
export default function* userSaga() {
  /* ---------- all 배열 안의 코드 동시 실행 ---------- */
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchloadMyInfo),
    fork(watchChangeNickname),
    fork(watchFollow),
    fork(watchUnFollow),
  ]);
}