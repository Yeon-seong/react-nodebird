/* -------------------- 트위터 스토어 설정 -------------------- */


// 불러오기
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

// rootReducer 불러오기
import reducer from '../reducers';



// 액션 객체를 디스패치(dispatch)
const configureStore = () => {
  const store = createStore(reducer);
  store.dispach({
    type: 'CHANGE_NICKNAME',
    data: 'heart',
  })
  return store;
};


// 래퍼
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === !develoment
});



// 래퍼 내보내기
export default wrapper;