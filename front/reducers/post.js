/* -------------------- 게시글 데이터 리듀서 -------------------- */



// ShortId 라이브러리 불러오기
import shortId from 'shortid';

// Immer 라이브러리 불러오기
import produce from 'immer';

// Faker 라이브러리 불러오기
import faker from 'faker';



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* 메인 게시글 더미데이터 */
  mainPosts: [],
  /* 이미지 업로드 시 경로 저장 */
  imagePaths: [],
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
  /* 답글 추가 시도 중, 완료, 에러 */
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};


// 게시글 더미데이터 내보내기
export const generateDummyPost = (number) => 
  Array(number).fill().map(() => ({
  /* ---------- 더미아이디 ---------- */
  id: shortId.generate(),
  /* ---------- 사용자 ---------- */
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  // 임의의 텍스트와 단어 생성
  content: faker.lorem.paragraph(),
  /* ---------- 이미지 ---------- */
  Images: [{
    src: faker.image.image(),
  }],
  /* ---------- 답글 ---------- */
  Comments: [{
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    // 답글을 한 문장으로 생성
    content: faker.lorem.sentence(),
  }],
}));

// initialState.mainPosts = initialState.mainPosts.concat(
//   generateDummyPost(10)
// );


// 게시글 불러오기 액션 : 요청, 성공, 실패
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

// 게시글 추가 액션 : 요청, 성공, 실패
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 게시글 삭제 액션 : 요청, 성공, 실패
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 답글 추가 액션 : 요청, 성공, 실패
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


// 게시글 추가 요청 액션 생성함수(action creator)
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});


// 답글 추가 요청 액션 생성함수(action creator)
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});


// 게시글 더미데이터
const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '다랑',
  },
  Images: [],
  Comments: [],
});


// 답글 더미데이터
const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '다랑',
  },
});


// 리듀서(Reducer) : 이전 상태를 액션을 통해 불변성 지키면서 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
  // immer가 draft를 보고, 불변성을 지켜서 다음 상태로 만들어낸다.
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
        draft.mainPosts = action.data.concat(draft.mainPosts);  // 10개씩 데이터 불러옴
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
        draft.mainPosts.unshift(dummyPost(action.data));
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
        draft.mainPosts = draft.mainPosts.filter((v) =>
          v.id !== action.data);
        break;
      /* ---------- 게시글 삭제 실패 리듀서 ---------- */
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error; // 게시글 삭제 실패 확인
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
        const post = draft.mainPosts.find((v) =>
          v.id === action.data.postId);
        // 해당 게시글의 맨 앞에 답글 더미데이터(가짜 답글) 하나 넣기
        post.Comments.unshift(dummyComment(action.content));
        // 리듀서
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      /* ---------- 답글 추가 실패 리듀서 ---------- */
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error; // 답글 추가 실패 확인
        break;

      default:
        break;
    }
  });
};



// 리듀서 내보내기
export default reducer;