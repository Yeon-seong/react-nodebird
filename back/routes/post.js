/* -------------------- 트위터 게시글 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 게시글 모델 불러오기
const { Post } = require('../models');

// 라우팅 모듈 호출
const router = express.Router();



// 게시글 작성하기 라우터
router.post('/', async (req, res, next) => {    // POST /post
  try {
    const post = await Post.create({
      content: req.body.content,  // addPost saga의 content: data
      UserId: req.user.id,        // passport.deserializeUser로 사용자 정보 전달
    });
    /* 게시글 작성 성공 시 프론트로 돌려주기 */
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 게시글 삭제하기 라우터
router.delete('/', (req, res) => {  // DELETE /post
  res.json({ id: 1 });
});



// 라우터 내보내기
module.exports = router;