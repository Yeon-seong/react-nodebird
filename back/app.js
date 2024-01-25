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

// hpp(HTTP Parameter Pollution) 모듈
const hpp = require('hpp');

// helmet 모듈
const helmet = require('helmet');



// 분리한 router 불러오기
const postRouter = require('./routes/post');    // 게시글 라우터
const postsRouter = require('./routes/posts');  // 게시글들 라우터
const userRouter = require('./routes/user');    // 사용자 라우터
const hashRouter = require('./routes/hashtag'); // 해시태그 라우터

// 모델 불러오기
const db = require('./models');

// 패스포트에서 불러와 패스포트 설정 연결하기
const passportConfig = require('./passport');



// 로컬 프론트 서버, 실제 프론트 서버 URL IP 주소 요청만 허용하기
const corsOkUrl = ['http://localhost:3000', 'http://nodebird.xyz'];



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



// 모건(morgan) : 요청과 응답에 대한 정보를 콘솔에 기록하는 모듈
/* ---------- 배포 모드일 환경일 때 설정 ---------- */
if (process.env.NODE_ENV === 'production') {
  // combined : 로그가 자세해져서 실제 해당 접속자의 IP를 알 수 있다.
  app.use(morgan('combined'));
  // hpp : Express의 중복 이름 파라미터 공격을 방어한다.
  app.use(hpp());
  // helmet : HTTP 헤더를 자동 설정을 통해 외부 공격으로부터 보호한다.
  app.use(helmet());

/* ---------- 개발 모드 환경일 때 설정 ---------- */
} else {
  // dev : 백엔드 디버깅
  app.use(morgan('dev'));
};



// 미들웨어 연결
app.use(cors({
  /* 특정 url에서 요청했을 때만 cors 허용 */
  origin: corsOkUrl,

  /* 사용자 인증이 필요한 쿠키 전달 허용 */
  credentials: true,
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
  /* ---------- 쿠키 옵션(Cookie Option) ---------- */
  cookie: {
    httpOnly: true, // true로 설정 시 JS로 쿠키에 접근하지 못하도록 막는다.
    secure: false,  // https 적용 시 true로 설정할 예정
  }
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



// http://54.180.201.249 : 실제 백엔드 서버 URL IP 주소인 80번 포트로 서버 실행
app.listen(80, () => {
  console.log('서버 실행 중!');
});