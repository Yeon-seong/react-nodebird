/* -------------------- 포스트 데이터 리듀서 -------------------- */


// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* ---------- 메인 포스트 더미 데이터 ---------- */
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'YeonSeong',
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
        nickname: 'Aster',
      },
      content: '안녕하세요!',
    }, {
      /* ----- 사용자2 : 닉네임, 답글 ----- */
      User: {
        nickname: 'Dahlia',
      },
      content: '만나서 반가워요~',
    }]
  }],
  /* ---------- 이미지 업로드 시 경로 저장 ---------- */
  imagePaths: [],
  /* ---------- 포스트 추가 시도 중, 완료, 에러 ---------- */
  addPostLoading: false,
  addPostDone: false,
  addPostError: false,
}


// 포스트 추가 액션 : 요청, 성공, 실패
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

// 포스트 더미 데이터
const dummyPost = {
  id: 2,
  content: '더미데이터 입니다.',
  User: {
    id: 1,
    nickname: 'Rose',
  },
  Images: [],
  Comments: [],
};


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ----- 포스트 추가 요청 리듀서 ----- */
    case ADD_POST_REQUEST:
    /* ----- 포스트 추가 성공 리듀서 ----- */
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    /* ----- 포스트 추가 실패 리듀서 ----- */
    case ADD_POST_FAILURE:
    
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;