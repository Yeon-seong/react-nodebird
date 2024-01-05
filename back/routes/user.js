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



// 브라우저 새로고침 시 사용자 정보 복구 라우터
router.get('/', async (req, res, next) => { // GET /user
  // req.headers 안에 쿠키가 들어있다.
  console.log(req.headers, "req.headers 안에는 쿠키가 들어있다.");
  try {
    /* ---------- (로그인해서) 사용자 정보가 있다면 ---------- */
    if(req.user) {
      /* (비밀번호를 제외한) 모든 사용자 정보를 가져오는 함수 */
      const fullUserWithOutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: { exclude: ['password'] },
        // 모델 가져오기
        include: [{
          /* ---------- 나의 게시글 ---------- */
          model: Post,
          attributes: ['id'], // id 데이터만 가져오기
        }, {
          /* ---------- 나의 팔로잉 ---------- */
          model: User,
          as: 'Followings',
          attributes: ['id'], // id 데이터만 가져오기
        }, {
          /* ---------- 나의 팔로워 ---------- */
          model: User,
          as: 'Followers',
          attributes: ['id'], // id 데이터만 가져오기
        }]
      });
      // 200번대 에러 출력
      res.status(200).json(fullUserWithOutPassword);
      
    /* ---------- (로그아웃해서) 사용자 정보가 없다면 ---------- */
    } else {
      // 아무것도 보내지 않기
      res.status(200).json(null);
    }
    
  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


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

      /* (비밀번호를 제외한) 모든 사용자 정보를 가져오는 함수 */
      const fullUserWithOutPassword = await User.findOne({
        where: { id: user.id },
        attributes: { exclude: ['password'] }, // 전체 데이터에서 비밀번호만 제외
        // 모델 가져오기
        include: [{
          /* ---------- 나의 게시글 ---------- */
          model: Post,
          attributes: ['id'], // id 데이터만 가져오기
        }, {
          /* ---------- 나의 팔로잉 ---------- */
          model: User,
          as: 'Followings',
          attributes: ['id'], // id 데이터만 가져오기
        }, {
          /* ---------- 나의 팔로워 ---------- */
          model: User,
          as: 'Followers',
          attributes: ['id'], // id 데이터만 가져오기
        }]
      });
      /* (비밀번호를 제외한) 모든 사용자 정보를 프론트로 넘기기 */
      return res.status(200).json(fullUserWithOutPassword);
    });
  })(req, res, next); // 미들웨어 커스터마이징
});


// 회원가입 라우터
router.post('/', isNotLoggedIn, async (req, res, next) => {  // POST /user/
  try {
    /* 프론트에서 보낸 이메일과 같은 이메일을 쓰는 사용자가 있다면 exUser에 저장하는 함수 */
    const exUser = await User.findOne({
      where: { email: req.body.email },
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

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error); // 콘솔 창을 통한 에러 메시지 출력
    next(error); // status 500 : express next를 통한 에러 처리 미들웨어로 에러 보내기
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


// 닉네임 라우터
router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    /* 내 아이디의 닉네임을 프론트에서 받은 닉네임으로 수정하는 함수 */
    await User.update({
      /* 첫 번째 객체는 수정 : 프론트에서 제공한 닉네임으로 닉네임 수정 */
      nickname: req.body.nickname,
    }, {
      /* 두 번째 객체는 조건 : 내 아이디 */
      where: { id: req.user.id },
    });
    /* 프론트에서 제공한 닉네임을 프론트로 넘기기 */
    res.status(200).json({ nickname: req.body.nickname });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 팔로우 라우터
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { // PATCH /user/사용자 번호/follow
  try {
    /* 사용자가 실재하는 사용자인지 찾는 함수 */
    const user = await User.findOne({ where: { id: req.params.userId }});
    /* ---------- 만약 실재하는 사용자가 아니라면 400번대 에러 출력 ---------- */
    if (!user) {
      res.status(403).send('존재하지 않는 사람을 팔로우 하려고 하시네요?');
    }
    /* 팔로워에 나를 추가 */
    await user.addFollowers(req.user.id);
    /* 나의 팔로잉 : 팔로우한 상대방 아이디를 숫자로 바꿔 프론트로 넘기기 */
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 언팔로우 라우터
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { // DELETE /user/사용자 번호/follow
  try {
    /* 사용자가 실재하는 사용자인지 찾는 함수 */
    const user = await User.findOne({ where: { id: req.params.userId }});
    
    /* ---------- 만약 실재하는 사용자가 아니라면 400번대 에러 출력 ---------- */
    if (!user) {
      res.status(403).send('존재하지 않는 사람을 언팔로우 하려고 하시네요?');
    }
    /* 팔로워에서 나를 제거 */
    await user.removeFollowers(req.user.id);
    /* 나의 팔로잉 : 언팔로우한 상대방 아이디를 숫자로 바꿔 프론트로 넘기기 */
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 팔로워 제거 라우터
router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => { // DELETE /user/follower/사용자 번호
  try {
    /* 사용자가 실재하는 사용자인지 찾는 함수 */
    const user = await User.findOne({ where: { id: req.params.userId }});
    
    /* ---------- 만약 실재하는 사용자가 아니라면 400번대 에러 출력 ---------- */
    if (!user) {
      res.status(403).send('존재하지 않는 사용자는 차단할 수 없습니다.');
    }
    /* 내가 상대방을 차단(제거) */
    await user.removeFollowings(req.user.id);
    /* 제거한 상대방 아이디를 숫자로 바꿔 프론트로 넘기기 */
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 팔로워 라우터
router.get('/followers', isLoggedIn, async (req, res, next) => { // GET /user/followers
  try {
    /* 나를 찾는 함수 */
    const user = await User.findOne({ where: { id: req.user.id }});
    /* ---------- 만약 내가 없다면 400번대 에러 출력 ---------- */
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    /* 사용자 팔로워 목록 가져오기 */
    const followers = await user.getFollowers();
    /* 팔로워 목록을 프론트로 넘기기 */
    res.status(200).json(followers);

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 팔로잉 라우터
router.get('/followings', isLoggedIn, async (req, res, next) => { // GET /user/followings
  try {
    /* 나를 찾는 함수 */
    const user = await User.findOne({ where: { id: req.user.id }});
    /* ---------- 만약 내가 없다면 400번대 에러 출력 ---------- */
    if (!user) {
      res.status(403).send('없는 사람을 찾으려고 하시네요?');
    }
    /* 사용자 팔로잉 목록 가져오기 */
    const followings = await user.getFollowings();
    /* 팔로잉 목록을 프론트로 넘기기 */
    res.status(200).json(followings);
    
  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});



// 라우터 내보내기
module.exports = router;