/* -------------------- 트위터 사용자 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 라우팅 모듈 호출
const router = express.Router();



// 사용자 라우터
router.post('/', async (req, res) => {  // POST /user/
  // 회원가입 요청을 하면 백엔드서버 라우터에서 받을 수 있도록 함
});



// 라우터 내보내기
module.exports = router;