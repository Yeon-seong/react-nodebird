/* -------------------- 트위터 스토어 설정 -------------------- */


// 불러오기
import { createWrapper } from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// rootReducer 불러오기
import reducer from '../reducers';



// 액션 객체 디스패치(dispatch)
const configureStore = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production'
  /* ----- 배포용 미들웨어 : 데브툴 연결X ----- */
  ? compose(applyMiddleware(...middlewares))
  /* ----- 개발용 미들웨어 : 데브툴 연결O ----- */
  : composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(reducer, enhancer);
  return store;
};


// 래퍼
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});



// 래퍼 내보내기
export default wrapper;