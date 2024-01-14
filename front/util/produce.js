/* -------------------- Immer 라이브러리 설정 -------------------- */



// Immer 라이브러리가 인터넷 익스플로러에서도 동작하게 만들기
import { enableES5, produce } from 'immer';

// produce 함수 확장하기
export default (...args) => {
  enableES5();
  return produce(...args);
}