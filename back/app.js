/* -------------------- 트위터 API -------------------- */



// Express 모듈 호출
const express = require('express');

// 분리한 router 불러오기
const postRouter = require('./routers/post');

// 모델 불러오기
const db = require('./models');

// 반환된 값을 app에 넣는다.
const app = express();

// 서버 실행 시 데이터베이스 시퀄라이즈 연결
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공'); 
  })
  .catch(console.err);



// 메인 페이지 가져오기
app.get('/', (req, res) => {
  res.send('hello express');
});

// API 페이지 가져오기
app.get('/', (req, res) => {
  res.send('hello api');
});

// 게시글 가져오기 API
app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

// 게시글 라우터 가져오기
app.use('/post', postRouter);



// http://localhost:3065 : 3065번 포트로 서버실행
app.listen(3065, () => {
  console.log('서버 실행 중');
});