/* -------------------- 트위터 포스트 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// reducer 포스트 추가, 답글 추가 액션 불러오기
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../reducers/post';



// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/api/post', data)
}
// ADD_POST_REQUEST 액션이 실행되면 addPost 함수 실행
function* addPost(action) {
  /* ----- 요청 성공 시 ADD_POST_SUCCESS 액션 디스패치 ----- */
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,         // 성공 결과
    });
  /* ----- 요청 실패 시 ADD_POST_FAILURE 액션 디스패치 ----- */
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// addComment 실행 시 서버에 addCommentAPI 요청
function addCommentAPI(data) {
  return axios.post('/api/post/${data.postId}/comment', data)
}
// ADD_POST_REQUEST 액션이 실행되면 addComment 함수 실행
function* addComment(action) {
  /* ----- 요청 성공 시 ADD_COMMENT_SUCCESS 액션 디스패치 ----- */
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,         // 성공 결과
    })
  /* ----- 요청 실패 시 ADD_COMMENT_FAILURE 액션 디스패치 ----- */
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// 포스트 추가 액션
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}


// 답글 추가 액션
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}



// 루트 포스트 Saga 액션 등록
export default function* postSaga() {
  /* --- all 배열 안의 코드 동시 실행 --- */
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}