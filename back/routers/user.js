/* -------------------- 트위터 사용자 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 비밀번호 암호화 라이브러리
const bcrypt = require('bcrypt');

// 사용자 모델 불러오기
const { User } = require('../models');

// 라우팅 모듈 호출
const router = express.Router();



// 사용자 라우터
router.post('/', async (req, res) => {  // POST /user/
  /* 비밀번호 암호화(해시화) */
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  /* await : 실제로 데이터가 들어감, create : 테이블 안에 데이터를 넣음 */
  await User.create({
    email: req.body.email,
    nickname:req.body.nickname,
    password: hashedPassword, // 암호화 된 비밀번호 저장
  });
  /* User.create() 비동기 함수가 실행되고 난 다음에 실행 */
  res.send('ok');
});



// 라우터 내보내기
module.exports = router;