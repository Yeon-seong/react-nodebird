/* -------------------- 트위터 게시글 Saga -------------------- */



// Saga 이펙트 불러오기
import { all, fork, call, takeLatest, put, throttle } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 게시글 액션 불러오기
import {

  /* ---------- 단일 게시글 불러오기 액션 : 요청, 성공, 실패 ---------- */
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,

  /* ---------- 특정 사용자의 게시글 불러오기 액션 : 요청, 성공, 실패 ---------- */
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,

  /* ---------- 특정 해시태그를 가진 게시글 불러오기 액션 : 요청, 성공, 실패 ---------- */
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,

  /* ---------- 여러 게시글 불러오기 액션 : 요청, 성공, 실패 ---------- */
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,

  /* ---------- 게시글 추가 액션 : 요청, 성공, 실패 ---------- */
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,

  /* ---------- 게시글 삭제 액션 : 요청, 성공, 실패 ---------- */
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,

  /* ---------- 게시글 좋아요 액션 : 요청, 성공, 실패 ---------- */
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,

  /* ---------- 게시글 좋아요 취소 액션 : 요청, 성공, 실패 ---------- */
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,

  /* ---------- 답글 추가 액션 : 요청, 성공, 실패 ---------- */
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,

  /* ---------- 리트윗 액션 : 요청, 성공, 실패 ---------- */
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,

  /* ---------- 이미지 업로드 액션 : 요청, 성공, 실패 ---------- */
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,

} from '../reducers/post';

// 사용자 액션 불러오기
import {
  
  /* ---------- 내가 작성한 게시글 액션 ---------- */
  ADD_POST_TO_ME,
  
  /* ---------- 내 게시글 삭제 액션 ---------- */
  REMOVE_POST_OF_ME,

} from '../reducers/user';



// loadPost 실행 시 서버에 loadPostAPI 요청
function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}
// LOAD_POST_SUCCESS 액션이 실행되면 loadPost 함수 실행
function* loadPost(action) {
  /* ---------- 요청 성공 시 LOAD_POST_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 게시글 배열이 들어있다.
    });

  /* ---------- 요청 실패 시 LOAD_POST_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// loadPosts 실행 시 서버에 loadPostsAPI 요청
function loadPostsAPI(lastId) {
  /* get에서 데이터를 넣기 위해 주소 뒤에 ?를 찍고 `key=값`을 적어준다.
     lastId가 undefined인 경우 lastId를 0으로 만든다. */
  return axios.get(`/posts?lastId=${lastId || 0}`);
}
// LOAD_POSTS_SUCCESS 액션이 실행되면 loadPosts 함수 실행
function* loadPosts(action) {
  /* ---------- 요청 성공 시 LOAD_POSTS_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 여러 게시글 배열이 들어있다.
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



// loadUserPosts 실행 시 서버에 loadUserPostsAPI 요청
function loadUserPostsAPI(data, lastId) { // 인자 2개
  /* get에서 데이터를 넣기 위해 주소 뒤에 ?를 찍고 `key=값`을 적어준다.
     lastId가 undefined인 경우 lastId를 0으로 만든다. */
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}
// LOAD_USER_POSTS_SUCCESS 액션이 실행되면 loadUserPosts 함수 실행
function* loadUserPosts(action) {
  /* ---------- 요청 성공 시 LOAD_USER_POSTS_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 특정 사용자의 게시글이 들어있다.
    });

  /* ---------- 요청 실패 시 LOAD_USER_POSTS_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// loadHashtagPosts 실행 시 서버에 loadHashtagPostsAPI 요청
function loadHashtagPostsAPI(data, lastId) { // 인자 2개
  /* get에서 데이터를 넣기 위해 주소 뒤에 ?를 찍고 `key=값`을 적어준다.
     lastId가 undefined인 경우 lastId를 0으로 만든다. */
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
// LOAD_HASHTAG_POSTS_SUCCESS 액션이 실행되면 loadHashtagPosts 함수 실행
function* loadHashtagPosts(action) {
  /* ---------- 요청 성공 시 LOAD_HASHTAG_POSTS_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,        // 성공 결과 : 실제 특정 해시태그를 가진 게시글이 들어있다.
    });

  /* ---------- 요청 실패 시 LOAD_HASHTAG_POSTS_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// addPost 실행 시 서버에 addPostAPI 요청
function addPostAPI(data) {
  return axios.post('/post', data); // formData는 바로 data에 넣어줘야 한다.
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
      data: result.data,        // 실제로 사용자가 작성한 답글이 들어있다.
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



// retweet 실행 시 서버에 retweetAPI 요청
function retweetAPI(data) { // 해당 주소 게시글 리트윗하기
  return axios.post(`/post/${data}/retweet`); // POST /post/동적 히든/retweet
}
// RETWEET_REQUEST 액션이 실행되면 retweet 함수 실행
function* retweet(action) {
  /* ---------- 요청 성공 시 RETWEET_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,        // 실제 사용자의 리트윗이 들어있다.
    });
    
  /* ---------- 요청 실패 시 RETWEET_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// uploadImages 실행 시 서버에 uploadImagesAPI 요청
function uploadImagesAPI(data) {
  return axios.post(`/post/images`, data); // 폼 데이터는 그대로 data에 들어간다.
}
// UPLOAD_IMAGES_SUCCESS 액션이 실행되면 uploadImages 함수 실행
function* uploadImages(action) {
  /* ---------- 요청 성공 시 UPLOAD_IMAGES_SUCCESS 액션 디스패치 ---------- */
  try {
    const result = yield call(uploadImagesAPI, action.data); // action.data = 이미지 폼 데이터
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,        // 성공 결과
    });

  /* ---------- 요청 실패 시 UPLOAD_IMAGES_FAILURE 액션 디스패치 ---------- */
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data, // 실패 결과
    });
  }
}



// 단일 게시글 불러오기 요청 액션을 호출하는 제너레이터 함수
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

// 특정 사용자의 게시글 불러오기 요청 액션을 호출하는 제너레이터 함수
function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

// 특정 해시태그를 가진 게시글 불러오기 요청 액션을 호출하는 제너레이터 함수
function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

// 여러 게시글 불러오기 요청 액션을 호출하는 제너레이터 함수
function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

// 게시글 추가 요청 액션을 호출하는 제너레이터 함수
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

// 게시글 삭제 요청 액션을 호출하는 제너레이터 함수
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

// 게시글 좋아요 요청 액션을 호출하는 제너레이터 함수
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

// 게시글 좋아요 취소 요청 액션을 호출하는 제너레이터 함수
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

// 답글 추가 요청 액션을 호출하는 제너레이터 함수
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

// 리트윗 요청 액션을 호출하는 제너레이터 함수
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

// 이미지 업로드 요청 액션을 호출하는 제너레이터 함수
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}



// 루트 게시글 Saga 액션 등록
export default function* postSaga() {
  /* all 배열 안의 코드 동시 실행 */
  yield all([
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddComment),
    fork(watchRetweet),
    fork(watchUploadImages),
  ]);
}