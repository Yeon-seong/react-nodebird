/* -------------------- 트위터 API -------------------- */



// Express 라이브러리 사용
const express = require('express');



// 호출
const app = express();


// 메인 페이지 가져오기
app.get('/', (req, res) => {
  res.send('hello express');
});



// http://localhost:3000/ : 3000 포트로 서버 열기
app.listen(3000, () => {
  console.log('서버 실행 중');
});