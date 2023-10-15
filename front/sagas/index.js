// Saga 이펙트 불러오기
import { all, fork, call, takeLates, put } from 'redux-saga/effects'

// Axios 라이브러리 불러오기
import axios from 'axios';



// logIn 실행 시 서버에 logInAPI 요청
function logInAPI(data) {
  return axios.post('/api/login', data)
}
// LOG_IN_REQUEST 액션이 실행되면 logIn 함수 실행
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    /* ----- 요청 성공 시 LOG_IN_SUCCESS 액션 디스패치 ----- */
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_IN_FATLURE 액션 디스패치 ----- */
    yield put({
      type: 'LOG_IN_FATLURE',
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
    const result = yield call(logOutAPI);
    /* ----- 요청 성공 시 LOG_OUT_SUCCESS 액션 디스패치 ----- */
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 LOG_OUT_FATLURE 액션 디스패치 ----- */
    yield put({
      type: 'LOG_OUT_FATLURE',
      data: err.response.data,  // 실패 결과
    });
  }
}


// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/api/post', data)
}
// ADD_POST_REQUEST 액션이 실행되면 addPost 함수 실행
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    /* ----- 요청 성공 시 ADD_POST_SUCCESS 액션 디스패치 ----- */
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data         // 성공 결과
    })
  } catch (err) {
    /* ----- 요청 실패 시 ADD_POST_FATLURE 액션 디스패치 ----- */
    yield put({
      type: 'ADD_POST_FATLURE',
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

// 포스트 추가 액션
function* watchAddPost() {
  yield takeLates('ADD_POST_REQUEST', addPost);
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