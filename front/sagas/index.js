/* -------------------- 트위터 루트 Saga -------------------- */



// 외부 Saga 이펙트 불러오기
import { all, fork } from 'redux-saga/effects';

// 내부 saga 불러오기
import postSaga from './post';
import userSaga from './user';



// 루트 Saga 액션 등록
export default function* rootSaga() {
  /* all 배열 안의 코드 동시 실행 */
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}