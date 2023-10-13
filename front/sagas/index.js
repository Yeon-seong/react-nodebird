// Saga 이펙트 불러오기
import { all, fork, call, take, put } from 'redux-saga/effects'

// Axios 라이브러리 불러오기
import axios from 'axios';



// logIn 실행 시 서버에 logInAPI 요청
function logInAPI() {
  return axios.post('/api/login')
}


// LOG_IN_REQUEST 액션이 실행되면 logIn 실행
function* logIn() {
  yield call(logInAPI)
}


// 로그인 액션
function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn)
}

// 로그아웃 액션
function* watchLogOut() {
  yield take('LOG_OUT_REQUEST')
}

// 포스트 추가 액션
function* watchAddPost() {
  yield take('ADD_POST_REQUEST')
}


// 액션 등록
export default functon* rootSaga() {
  /* --- all 배열 안의 코드 동시 실행 --- */
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}