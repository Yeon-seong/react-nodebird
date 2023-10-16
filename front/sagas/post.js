/* -------------------- 트위터 포스트 Saga -------------------- */


// Saga 이펙트 불러오기
import { all, fork, call, takeLates, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';



// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/api/post', data)
}


// ADD_POST_REQUEST 액션이 실행되면 addPost 함수 실행
function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
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


// 포스트 추가 액션
function* watchAddPost() {
  yield takeLates('ADD_POST_REQUEST', addPost);
}


// 루트 포스트 Saga 액션 등록
export default function* postSaga() {
  /* --- all 배열 안의 코드 동시 실행 --- */
  yield all([
    fork(watchAddPost),
  ]);
}