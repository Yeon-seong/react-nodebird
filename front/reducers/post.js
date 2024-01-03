/* -------------------- 게시글 데이터 리듀서 -------------------- */



// Immer 라이브러리 불러오기
import produce from 'immer';



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* 메인 게시글 더미데이터 */
  mainPosts: [],

  /* 이미지 업로드 시 경로 저장 */
  imagePaths: [],
  
  /* 게시글 데이터 무조건 가져오기 */
  hasMorePosts: true,

  /* 게시글 불러오기 시도 중, 완료, 에러 */
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  /* 게시글 추가 시도 중, 완료, 에러 */
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  /* 게시글 삭제 시도 중, 완료, 에러 */
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  /* 게시글 좋아요 시도 중, 완료, 에러 */
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  /* 게시글 좋아요 취소 시도 중, 완료, 에러 */
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  /* 답글 추가 시도 중, 완료, 에러 */
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  /* 리트윗 시도 중, 완료, 에러 */
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  
  /* 이미지 업로드 시도 중, 완료, 에러 */
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
};



// 게시글 불러오기 액션 : 요청, 성공, 실패 내보내기
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// 게시글 추가 액션 : 요청, 성공, 실패 내보내기
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 게시글 삭제 액션 : 요청, 성공, 실패 내보내기
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 게시글 좋아요 액션 : 요청, 성공, 실패 내보내기
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

// 게시글 좋아요 취소 액션 : 요청, 성공, 실패 내보내기
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

// 답글 추가 액션 : 요청, 성공, 실패 내보내기
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 리트윗 액션 : 요청, 성공, 실패 내보내기
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

// 이미지 업로드 액션 : 요청, 성공, 실패 내보내기
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';


// 이미지 제거 동기 액션 내보내기
export const REMOVE_IMAGE = 'REMOVE_IMAGE';


// 게시글 추가 요청 액션 생성함수(action creator) 내보내기
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});


// 답글 추가 요청 액션 생성함수(action creator) 내보내기
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});



// 리듀서(Reducer) : 이전 상태를 액션을 통해 불변성 지키면서 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
  // immer가 draft를 보고, 불변성을 지켜서 다음 상태로 만들어냄.
  return produce(state, (draft) => {
    switch (action.type) {

      /* ---------- 게시글 불러오기 요청 리듀서 ---------- */
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      /* ---------- 게시글 불러오기 성공 리듀서 ---------- */
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        // 메인 게시글(mainPosts) 개수
        draft.mainPosts = draft.mainPosts.concat(action.data);
        // 메인 게시글(mainPosts) 개수 콘솔 출력
        console.log('mainPosts.length', action.data.concat(draft.mainPosts).length);
        // 메인 게시글(mainPosts)을 10개보다 적게 불러오면 그만 불러오기(hasMorePosts = false)
        draft.hasMorePosts = action.data.length === 10;
        break;
      /* ---------- 게시글 불러오기 실패 리듀서 ---------- */
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;  // 게시글 불러오기 실패 확인
        break;


      /* ---------- 게시글 추가 요청 리듀서 ---------- */
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      /* ---------- 게시글 추가 성공 리듀서 ---------- */
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        // 게시글 추가 성공 시 실제 게시글 데이터를 메인 게시글에 추가하기
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = []; // imagePaths 초기화
        break;
      /* ---------- 게시글 추가 실패 리듀서 ---------- */
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;  // 게시글 추가 실패 확인
        break;


      /* ---------- 게시글 삭제 요청 리듀서 ---------- */
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      /* ---------- 게시글 삭제 성공 리듀서 ---------- */
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        // 게시글 삭제하기
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
        break;
      /* ---------- 게시글 삭제 실패 리듀서 ---------- */
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error; // 게시글 삭제 실패 확인
        break;


      /* ---------- 게시글 좋아요 요청 리듀서 ---------- */
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      /* ---------- 게시글 좋아요 성공 리듀서 ---------- */
      case LIKE_POST_SUCCESS: {
        // id가 action.data.PostId인 게시글을 찾기
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        // 게시글에 좋아요를 누른 사람들 이름에 내 아이디(UserId)를 넣어준다.
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      /* ---------- 게시글 좋아요 실패 리듀서 ---------- */
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;  // 게시글 좋아요 실패 확인
        break;


      /* ---------- 게시글 좋아요 취소 요청 리듀서 ---------- */
      case UNLIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      /* ---------- 게시글 좋아요 취소 성공 리듀서 ---------- */
      case UNLIKE_POST_SUCCESS: {
        // id가 action.data.PostId인 게시글을 찾기
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        // 게시글에 좋아요를 취소한 사람들 이름에서 내 아이디(UserId)가 빠진다.
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      /* ---------- 게시글 좋아요 취소 실패 리듀서 ---------- */
      case UNLIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;  // 게시글 좋아요 취소 실패 확인
        break;


      /* ---------- 답글 추가 요청 리듀서 ---------- */
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      /* ---------- 답글 추가 성공 리듀서 ---------- */
      case ADD_COMMENT_SUCCESS:
        // 메인 게시글 중 원하는 게시글 찾기
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        // 답글 추가 성공 시 실제 답글 데이터 넣기
        post.Comments.unshift(action.data);
        // 리듀서
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      /* ---------- 답글 추가 실패 리듀서 ---------- */
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error; // 답글 추가 실패 확인
        break;


      /* ---------- 리트윗 요청 리듀서 ---------- */
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      /* ---------- 리트윗 성공 리듀서 ---------- */
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        // 리트윗 성공 시 실제 리트윗된 게시글 데이터를 메인 게시글에 추가하기
        draft.mainPosts.unshift(action.data);
        break;
      /* ---------- 리트윗 실패 리듀서 ---------- */
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error; // 리트윗 실패 확인
        break;


      /* ---------- 이미지 업로드 요청 리듀서 ---------- */
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      /* ---------- 이미지 업로드 성공 리듀서 ---------- */
      case UPLOAD_IMAGES_SUCCESS:
        // 이미지 업로드 라우터에서 보낸 파일명(filename) 데이터를 imagePaths에 저장
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      /* ---------- 이미지 업로드 실패 리듀서 ---------- */
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;  // 이미지 업로드 실패 확인
        break;


      /* ---------- 이미지 제거 리듀서 ---------- */
      case REMOVE_IMAGE:
        // 사용자가 제거를 눌렀던 이미지만 imagePaths(이미지 업로드 저장 경로)에서 제거되서 사라진다.
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      
      default:
        break;
    }
  });
};



// 리듀서 내보내기
export default reducer;