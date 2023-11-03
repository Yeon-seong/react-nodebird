/* -------------------- 포스트 데이터 리듀서 -------------------- */



// ShortId 라이브러리 불러오기
import shortId from 'shortid';

// Immer 라이브러리 불러오기
import produce from 'immer';



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* ---------- 메인 포스트 더미데이터 ---------- */
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '다랑',
    },
    content: '첫 번째 포스트 #해시태그 #익스프레스',
    Images: [{
      // 이미지 주소1,
      id: shortId.generate(),
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      // 이미지 주소2,
      id: shortId.generate(),
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      // 이미지 주소3,
      id: shortId.generate(),
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      id: shortId.generate(),
      /* ----- 사용자1 : 닉네임, 답글 ----- */
      id: shortId.generate(),
      User: {
        nickname: '라나',
      },
      content: '안녕하세요!',
    }, {
      /* ----- 사용자2 : 닉네임, 답글 ----- */
      id: shortId.generate(),
      User: {
        nickname: '뮤티',
      },
      content: '만나서 반가워요~',
    }]
  }],
  /* ---------- 이미지 업로드 시 경로 저장 ---------- */
  imagePaths: [],
  /* ---------- 포스트 추가 시도 중, 완료, 에러 ---------- */
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  /* ---------- 포스트 삭제 시도 중, 완료, 에러 ---------- */
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  /* ---------- 답글 추가 시도 중, 완료, 에러 ---------- */
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}


// 포스트 추가 액션 : 요청, 성공, 실패
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

// 포스트 삭제 액션 : 요청, 성공, 실패
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

// 답글 추가 액션 : 요청, 성공, 실패
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


// 포스트 추가 요청 액션 생성함수(action creator)
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});


// 답글 추가 요청 액션 생성함수(action creator)
export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});


// 포스트 더미데이터
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


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  // immer가 draft를 보고, 불변성을 지켜서 다음 상태로 만들어낸다.
  return produce(state, (draft) => {
    switch (action.type) {
      /* ---------- 포스트 추가 요청 리듀서 ---------- */
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      /* ---------- 포스트 추가 성공 리듀서 ---------- */
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      /* ---------- 포스트 추가 실패 리듀서 ---------- */
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;  // 포스트 추가 실패 확인
        break;


      /* ---------- 포스트 삭제 요청 리듀서 ---------- */
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      /* ---------- 포스트 삭제 성공 리듀서 ---------- */
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) =>
          v.id !== action.data);
        break;
      /* ---------- 포스트 삭제 실패 리듀서 ---------- */
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error; // 포스트 삭제 실패 확인
        break;


      /* ---------- 답글 추가 요청 리듀서 ---------- */
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      /* ---------- 답글 추가 성공 리듀서 ---------- */
      case ADD_COMMENT_SUCCESS:
        // 메인 포스트 중 원하는 포스트 찾기
        const post = draft.mainPosts.find((v) =>
          v.id === action.data.postId);
        // 해당 포스트의 맨 앞에 답글 더미데이터(가짜 답글) 하나 넣기
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