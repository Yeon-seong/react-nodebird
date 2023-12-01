/* -------------------- 트위터 사용자 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 비밀번호 암호화 라이브러리
const bcrypt = require('bcrypt');

// Passport 미들웨어 호출
const passport = require('passport');


// 사용자, 게시글 모델 불러오기
const { User, Post } = require('../models');

// 로그인 유무를 검사하는 커스텀 미들웨어 불러오기
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// 라우팅 모듈 호출
const router = express.Router();



// 로그인 라우터 : 사용자 로그인 전략 실행
router.post('/login', isNotLoggedIn, (req, res, next) => {
  /* '로컬', (서버 에러, 성공 객체, 클라이언트 에러)가 전달 */
  passport.authenticate('local', (err, user, info) => {
    // done에서 넣은 값들이 순서대로 전달되는 곳
    /* 서버 에러 */
    if (err) {
      console.error(err); // 콘솔 창을 통한 에러 메시지 출력
      return next(err);   // 에러 처리 미들웨어로 이동
    }
    /* 클라이언트 에러 : 로그인하다 에러나면 클라이언트로 응답 보내기 */
    if (info) {
      return res.status(401).send(info.reason);
    }
    /* 로그인 성공 객체 */
    return req.login(user, async (loginErr) => {
      // 서비스 로그인이 끝난 후 패스포트 로그인 할 때 에러발생 시 처리
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      // (비밀번호를 제외한) 모든 사용자 정보
      const fullUserWithOutPassword = await User.findOne({
        where: { id: user.id },
        /* 전체 데이터 중에서 비밀번호만 제외하고 가져오기 */
        attributes: {
          exclude: ['password']
        },
        // 모델 가져오기
        include: [{
          /* ---------- 나의 게시글 ---------- */
          model: Post,
        }, {
          /* ---------- 나의 팔로잉 ---------- */
          model: User,
          as: 'Followings',
        }, {
          /* ---------- 나의 팔로워 ---------- */
          model: User,
          as: 'Followers',
        }]
      });

      // (비밀번호를 제외한) 사용자 정보를 프론트로 넘기기
      return res.status(200).json(fullUserWithOutPassword);
    });
  })(req, res, next); // 미들웨어 커스터마이징
});


// 회원가입 라우터
router.post('/', isNotLoggedIn, async (req, res, next) => {  // POST /user/
  try {
    /* 프론트에서 보낸 이메일과 같은 이메일을 쓰는 사용자가 있다면 exUser에 저장 */
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    /* 만약 사용자 중에 이메일이 같은 사용자가 있다면? 400번대 에러 출력 */
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.'); // status 400
    }

    /* 사용자 중에 이메일이 같은 사용자가 없다면 DB에 저장해서 ok를 보낸다. */
    // 비밀번호 암호화(해시화)
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    /* await : 실제로 데이터가 들어감, create : 테이블 안에 데이터를 넣음 */
    await User.create({
      email: req.body.email,
      nickname:req.body.nickname,
      password: hashedPassword, // 암호화 된 비밀번호 저장
    });
    /* User.create() 비동기 함수가 실행되고 난 다음에 실행 */
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(201).send('ok'); // status 201

  /* 에러 캐치 */
  } catch (error) {
    console.error(error); // 콘솔 창을 통한 에러 메시지 출력
    next(error);  // status 500 : express next를 통한 에러 처리 미들웨어로 에러 보내기
  }
});


// 로그아웃 라우터
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  /* 세션에 저장된 쿠키와 사용자 아이디 없애기 */
  req.session.destroy();
  /* 로그아웃 성공 */
  res.send('ok');
});



// 라우터 내보내기
module.exports = router;