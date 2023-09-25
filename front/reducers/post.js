/* -------------------- 포스트 데이터 리듀서 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  /* ---------- 메인 포스트 더미 데이터 ---------- */
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'yeonseong',
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [{
      // 이미지 주소1,
      src: 'https://ibb.co/HHdLL6X',
    }, {
      // 이미지 주소2,
      src: 'https://ibb.co/8mFP9Y8',
    }, {
      // 이미지 주소3,
      src: 'https://ibb.co/sQxgmbX',
    }],
    Comments: [{
      /* ----- 사용자1 : 닉네임, 답글 ----- */
      User: {
        nickname: 'ailette',
      },
      content: '안녕하세요!',
    }, {
      /* ----- 사용자2 : 닉네임, 답글 ----- */
      User: {
        nickname: 'dahlia',
      },
      content: '만나서 반가워요~',
    }]
  }],
  /* ---------- 이미지 업로드 시 경로 저장 ---------- */
  imagePaths: [],
  /* ---------- 포스트 추가 완료 시 true ---------- */
  postAdded: false,
}


// 포스트 추가 액션
const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
}
// 포스트 더미 데이터
const dummyPost = {
  id: 2,
  content: '더미데이터 입니다.',
  User: {
    id: 1,
    nickname: 'yeonseong',
  },
  Images: [],
  Comments: [],
};


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ----- 포스트 추가 리듀서 ----- */
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;