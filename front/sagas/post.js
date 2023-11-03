/* -------------------- 트위터 게시글 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// ShortId 라이브러리 불러오기
import shortId from 'shortid';

// 게시글 추가, 답글 추가, 게시글 삭제 액션 불러오기
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE
} from '../reducers/post';

// 내가 작성한 게시글, 내 게시글 삭제 액션 불러오기
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';



// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/api/post', data)
}
// ADD_POST_REQUEST 액션이 실행되면 addPost 함수 실행
function* addPost(action) {
  /* ---------- 요청 성공 시 ADD_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,   // 성공 결과
      },
    });
    /* ---------- 요청 성공 시 ADD_POST_TO_ME 액션 디스패치 ---------- */
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  /* ---------- 요청 실패 시 ADD_POST_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// removePost 실행 시 서버에 removePostAPI 요청
function removePostAPI(data) {
  return axios.delete('/api/post', data)
}
// REMOVE_POST_REQUEST 액션이 실행되면 removePost 함수 실행
function* removePost(action) {
  /* ---------- 요청 성공 시 REMOVE_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,        // 성공 결과
    }); // post 리듀서 조작 부분
    /* ---------- 요청 성공 시 REMOVE_POST_OF_ME 액션 디스패치 ---------- */
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    }); // user 리듀서 조작 부분
  /* ---------- 요청 실패 시 REMOVE_POST_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
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
  /* ---------- 요청 성공 시 ADD_COMMENT_SUCCESS 액션 디스패치 ---------- */
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,         // 성공 결과
    });
  /* ---------- 요청 실패 시 ADD_COMMENT_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// 게시글 추가 액션
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 게시글 삭제 액션
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 답글 추가 액션
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}



// 루트 게시글 Saga 액션 등록
export default function* postSaga() {
  /* all 배열 안의 코드 동시 실행 */
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}