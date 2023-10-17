/* -------------------- 트위터 사용자 Saga -------------------- */


// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// reducer 로그인, 로그아웃, 회원가입 액션 불러오기
import {
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE
} from '../reducers/user';



// logIn 실행 시 서버에 logInAPI 요청
function logInAPI(data) {
  return axios.post('/api/login', data)
}
// LOG_IN_REQUEST 액션이 실행되면 logIn 함수 실행
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    /* ----- 요청 성공 시 LOG_IN_SUCCESS 액션 디스패치 ----- */
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_IN_FAILURE 액션 디스패치 ----- */
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// logOut 실행 시 서버에 logOutAPI 요청
function logOutAPI() {
  return axios.post('/api/logout')
}
// LOG_OUT_REQUEST 액션이 실행되면 logOut 함수 실행
function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    /* ----- 요청 성공 시 LOG_OUT_SUCCESS 액션 디스패치 ----- */
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,    // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_OUT_FAILURE 액션 디스패치 ----- */
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// signUp 실행 시 서버에 signUpAPI 요청
function signUpAPI() {
  return axios.post('/api/signup')
}
// SIGN_UP_REQUEST 액션이 실행되면 signUp 함수 실행
function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    /* ----- 요청 성공 시 SIGN_UP_SUCCESS 액션 디스패치 ----- */
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,    // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 SIGN_UP_FAILURE 액션 디스패치 ----- */
    yield put({
      type: SIGN_UP_FAILURE,
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


// 사용자 Saga 액션 등록
export default function* userSaga() {
  /* ----- all 배열 안의 코드 동시 실행 ----- */
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}