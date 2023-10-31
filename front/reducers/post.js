/* -------------------- 포스트 데이터 리듀서 -------------------- */



// ShortId 라이브러리 불러오기
import shortId from 'shortid';



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* ---------- 메인 포스트 더미 데이터 ---------- */
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '다랑',
    },
    content: '첫 번째 포스트 #해시태그 #익스프레스',
    Images: [{
      // 이미지 주소1,
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      // 이미지 주소2,
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      // 이미지 주소3,
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      /* ----- 사용자1 : 닉네임, 답글 ----- */
      User: {
        nickname: '라나',
      },
      content: '안녕하세요!',
    }, {
      /* ----- 사용자2 : 닉네임, 답글 ----- */
      User: {
        nickname: '라요',
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
  /* ---------- 답글 추가 시도 중, 완료, 에러 ---------- */
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}


// 포스트 추가 액션 : 요청, 성공, 실패
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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


// 포스트 더미 데이터
const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '다랑',
  },
  Images: [],
  Comments: [],
});


// 답글 더미 데이터
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
  switch (action.type) {
    /* ----- 포스트 추가 요청 리듀서 ----- */
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    /* ----- 포스트 추가 성공 리듀서 ----- */
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    /* ----- 포스트 추가 실패 리듀서 ----- */
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    

    /* ----- 답글 추가 요청 리듀서 ----- */
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    /* ----- 답글 추가 성공 리듀서 ----- */
    case ADD_COMMENT_SUCCESS: {

      // index 찾기
      const postIndex = state.mainPosts.findIndex((v) =>
      v.id === action.data.postId);

      // 새로운 post 변수 객체 생성
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      
      // 새로운 mainPosts 변수 배열 생성
      const mainPosts = [ ...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    };
    
    /* ----- 답글 추가 실패 리듀서 ----- */
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;