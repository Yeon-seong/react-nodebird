/* -------------------- 트위터 사용자 Saga -------------------- */


// Saga 이펙트 불러오기
import { all, fork, call, takeLates, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';



// logIn 실행 시 서버에 logInAPI 요청
function logInAPI(data) {
  return axios.post('/api/login', data)
}
// LOG_IN_REQUEST 액션이 실행되면 logIn 함수 실행
function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    /* ----- 요청 성공 시 LOG_IN_SUCCESS 액션 디스패치 ----- */
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_IN_FAILURE 액션 디스패치 ----- */
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,  // 실패 결과
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
    yield delay(1000);
    /* ----- 요청 성공 시 LOG_OUT_SUCCESS 액션 디스패치 ----- */
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_OUT_FAILURE 액션 디스패치 ----- */
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,  // 실패 결과
    });
  }
}


// 로그인 액션
function* watchLogin() {
  yield takeLates('LOG_IN_REQUEST', logIn);
}


// 로그아웃 액션
function* watchLogOut() {
  yield takeLates('LOG_OUT_REQUEST', logOut);
}


// 사용자 Saga 액션 등록
export default function* userSaga() {
  /* --- all 배열 안의 코드 동시 실행 --- */
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
  ]);
}