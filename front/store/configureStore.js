/* -------------------- 트위터 스토어 설정 -------------------- */


// 불러오기
import { createWrapper } from 'next-redux-wrapper';



const configureStore = () => {};


// 래퍼
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === !develoment
});



// 래퍼 내보내기
export default wrapper;