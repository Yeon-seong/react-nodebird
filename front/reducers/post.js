/* -------------------- 포스트 데이터 -------------------- */



// 중앙 데이터 저장소(기본 state)
export const initialState = {
  mainPosts: [],
}


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};



// 리듀서 내보내기
export default reducer;