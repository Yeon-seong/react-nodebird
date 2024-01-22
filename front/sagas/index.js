/* -------------------- 트위터 루트 Saga -------------------- */



// 외부 Saga 이펙트 불러오기
import { all, fork } from 'redux-saga/effects';

// Axios 라이브러리 불러오기
import axios from 'axios';

// 내부 Saga 불러오기
import postSaga from './post';
import userSaga from './user';

// 실제 백엔드 서버 URL IP 주소 가져오기
import { backUrl } from '../config/config';



// saga에서 보내는 모든 axios 요청에 적용될 공통 설정
/* 기본 URL을 실제 백엔드 서버 URL IP 주소로 설정 */
axios.defaults.baseURL = backUrl;
/* 쿠키 정보 공유 */
axios.defaults.withCredentials = true;



// 루트 Saga 액션 등록
export default function* rootSaga() {
  /* all 배열 안의 코드 동시 실행 */
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}