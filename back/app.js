/* -------------------- 트위터 API -------------------- */



// Express 모듈 호출
const express = require('express');

// CORS 미들웨어 호출
const cors = require('cors');

// Express-Session 모듈 호출
const session = require('express-session');

// Cookie-Parser 모듈 호출
const cookieParser = require('cookie-parser');

// Passport 미들웨어 호출
const passport = require('passport');

// Dotenv 모듈 호출
const dotenv = require('dotenv');

// Morgan 미들웨어 호출
const morgan = require('morgan');

// Path 모듈 호출
const path = require('path');



// 분리한 router 불러오기
const postRouter = require('./routes/post');    // 게시글 라우터
const postsRouter = require('./routes/posts');  // 게시글들 라우터
const userRouter = require('./routes/user');    // 사용자 라우터
const hashRouter = require('./routes/hashtag'); // 해시태그 라우터

// 모델 불러오기
const db = require('./models');

// 패스포트에서 불러와 패스포트 설정 연결하기
const passportConfig = require('./passport');



// .env 파일 안에 있는 정보 불러오기
dotenv.config();

// express 서버 : 반환된 값을 app에 넣는다.
const app = express();

// 서버 실행 시 데이터베이스 시퀄라이즈 연결
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// passport Strategy 사용
passportConfig();



// 미들웨어 연결
app.use(morgan('dev')); // 백엔드 디버깅
app.use(cors({
  origin: true,       // 요청을 보낸 주소의 요청만 허용
  credentials: true,  // 사용자 인증이 필요한 쿠키 전달 허용
}));

// 프론트에서 백엔드로 데이터 보내기
/* uploads 폴더를 프론트에 제공하기 위한 이미지 경로 보내기 */
app.use('/', express.static(path.join(__dirname, 'uploads')));
/* 프론트에서 보낸 json 형식의 데이터를 req.body 안에 넣어줌 */
app.use(express.json());
/* 폼 제출 시 프론트에서 URL encoded 방식으로 넘어온 데이터를 req.body 안에 넣어줌 */
app.use(express.urlencoded({ extended: true }));



// 쿠키와 세션 미들웨어 연결
app.use(cookieParser(process.env.COOKIE_SECRET)); // 환경변수 사용
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,              // 환경변수 사용
}));
app.use(passport.initialize());
app.use(passport.session());



// 메인 페이지 가져오기
app.get('/', (req, res) => {
  res.send('hello express');
});


// API 페이지 가져오기
app.get('/', (req, res) => {
  res.send('hello api');
});


// 게시글 가져오기 API
app.use('/posts', postsRouter);
app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});


// API : 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
// 라우터 연결하기
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashRouter);

/* 에러 처리 미들웨어가 app.use와 app.listen 사이에 존재한다. */
// app.use((err, req, res, next) => {
// 
// });



// http://localhost:3065 : 3065번 포트로 서버실행
app.listen(3065, () => {
  console.log('서버 실행 중');
});