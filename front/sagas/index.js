/* -------------------- 트위터 루트 Saga -------------------- */



// 외부 Saga 이펙트 불러오기
import { all, fork } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 내부 saga 불러오기
import postSaga from './post';
import userSaga from './user';



// 모든 요청에 적용될 기본 URL
axios.defaults.baseURL = 'http://localhost:3065';



// 루트 Saga 액션 등록
export default function* rootSaga() {
  /* all 배열 안의 코드 동시 실행 */
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}