/* -------------------- 트위터 게시글 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, delay, throttle } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 게시글 불러오기, 게시글 추가, 답글 추가, 게시글 삭제 액션 불러오기
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../reducers/post';

// 내가 작성한 게시글, 내 게시글 삭제 액션 불러오기
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';



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
      error: err.response.data, // 실패 결과
    });
  }
}


// removePost 실행 시 서버에 removePostAPI 요청
function removePostAPI(data) {
  return axios.delete(`/post/${data}`); // /post/post.id
}
// REMOVE_POST_REQUEST 액션이 실행되면 removePost 함수 실행
function* removePost(action) {
  /* ---------- 요청 성공 시 REMOVE_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 게시글 삭제
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
      error: err.response.data, // 실패 결과
    });
  }
}


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
      error: err.response.data, // 실패 결과
    });
  }
}


// likePost 실행 시 서버에 likePostAPI 요청
function likePostAPI(data) {
  /* patch(`post/post.id/like`) : 몇 번째 게시글의 좋아요(like) 변경 */
  return axios.patch(`/post/${data}/like`);
}
// LIKE_POST_SUCCESS 액션이 실행되면 likePost 함수 실행
function* likePost(action) {
  /* ---------- 요청 성공 시 LIKE_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 게시글 배열(post.id, user.id)이 들어있다.
    });

  /* ---------- 요청 실패 시 LIKE_POST_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// unlikePost 실행 시 서버에 unlikePostAPI 요청
function unlikePostAPI(data) {
  /* delete(`post/post.id/like`) : 몇 번째 게시글의 좋아요(like) 삭제 */
  return axios.delete(`/post/${data}/like`);
}
// UNLIKE_POST_SUCCESS 액션이 실행되면 unlikePost 함수 실행
function* unlikePost(action) {
  /* ---------- 요청 성공 시 UNLIKE_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 게시글 배열(post.id, user.id)이 들어있다.
    });

  /* ---------- 요청 실패 시 UNLIKE_POST_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}


// addComment 실행 시 서버에 addCommentAPI 요청
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/동적 히든/comment
}
// ADD_COMMENT_REQUEST 액션이 실행되면 addComment 함수 실행
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
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data, // 실패 결과
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

// 게시글 불러오기 액션
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

// 게시글 좋아요 액션
function* watchLikePost() {
  yield throttle(5000, LIKE_POST_REQUEST, likePost);
}

// 게시글 좋아요 취소 액션
function* watchUnlikePost() {
  yield throttle(5000, UNLIKE_POST_REQUEST, unlikePost);
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
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
  ]);
}