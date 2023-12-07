/* -------------------- 트위터 게시글 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay, throttle } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 게시글 불러오기, 게시글 추가, 답글 추가, 게시글 삭제 액션 불러오기
import {
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../reducers/post';

// 내가 작성한 게시글, 내 게시글 삭제 액션 불러오기
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';



// loadPosts 실행 시 서버에 loadPostsAPI 요청
function loadPostsAPI(data) {
  return axios.get('/posts', data);
}
// LOAD_POSTS_SUCCESS 액션이 실행되면 loadPosts 함수 실행
function* loadPosts(action) {
  /* ---------- 요청 성공 시 LOAD_POSTS_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 게시글 배열이 들어있다.
    });

  /* ---------- 요청 실패 시 LOAD_POSTS_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/post', { content: data });
}
// ADD_POST_REQUEST 액션이 실행되면 addPost 함수 실행
function* addPost(action) {
  /* ---------- 요청 성공 시 ADD_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,      // 실제로 사용자가 작성한 게시글이 들어있다.
    });

    /* ---------- 요청 성공 시 ADD_POST_TO_ME 액션 디스패치 ---------- */
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,   // 게시글 id
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
  return axios.delete('/api/post', data);
}
// REMOVE_POST_REQUEST 액션이 실행되면 removePost 함수 실행
function* removePost(action) {
  /* ---------- 요청 성공 시 REMOVE_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    // const result = yield call(removePostAPI, action.data);
    yield delay(1000);          // 가짜 로딩시간
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
  return axios.post('/post/${data.postId}/comment', data); // POST /post/동적 히든/comment
}
// ADD_POST_REQUEST 액션이 실행되면 addComment 함수 실행
function* addComment(action) {
  /* ---------- 요청 성공 시 ADD_COMMENT_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,      // 실제로 사용자가 작성한 답글이 들어있다.
    });
    
  /* ---------- 요청 실패 시 ADD_COMMENT_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,  // 실패 결과
    });
  }
}


// 게시글 불러오기 액션
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
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
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}