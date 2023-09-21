/* -------------------- 리덕스 구현 -------------------- */



// 중앙 데이터 저장소(기본 state)
const initialState = {
  name: 'yeonseong',
  age: 24,
  password: 'star',
};


// 액션 생성함수(action creator)
const changeNickname = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  }
};
changeNickname('heart');
// {
// type: 'CHANGE_NICKNAME',
// data: 'heart',
// }
store.dispatch(changeNickname('love'))


// 리듀서(reducer) : (이전 상태, 액션) => 다음 상태를 만들어내는 함수
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NICKNAME':
      return {
        ... state,
        name: action.data,
      }
  }
};



export default rootReducer;