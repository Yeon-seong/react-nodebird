/* -------------------- 트위터 게시글 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 라우팅 모듈 호출
const router = express.Router();


// 게시글 작성하기 라우터
router.post('/', (req, res) => {      // POST /post
  res.json({ id: 1, content: 'hello' });
});

// 게시글 삭제하기 라우터
router.delete('/', (req, res) => {    // DELETE /post
  res.json({ id: 1 });
});



// 내보내기
module.exports = router;