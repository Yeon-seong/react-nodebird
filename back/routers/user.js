/* -------------------- 트위터 사용자 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 사용자 모델 불러오기
const { User } = require('../models');

// 라우팅 모듈 호출
const router = express.Router();



// 사용자 라우터
router.post('/', (req, res) => {  // POST /user/
  User.create({
    email: req.body.email,
    nickname:req.body.nickname,
    password: req.body.password,
  });
  res.json();
});



// 라우터 내보내기
module.exports = router;