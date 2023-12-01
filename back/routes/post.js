/* -------------------- 트위터 게시글 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 게시글, 답글 모델 불러오기
const { Post, Comment } = require('../models');

// 로그인 유무를 검사하는 커스텀 미들웨어 불러오기
const { isLoggedIn } = require('./middlewares');

// 라우팅 모듈 호출
const router = express.Router();



// 게시글 작성하기 라우터
router.post('/', isLoggedIn, async (req, res, next) => {  // POST /post
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


// 답글 작성하기 라우터
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/동적 히든/comment
  try {
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,  // 동적 게시글 아이디
      UserId: req.user.id,        // passport.deserializeUser로 사용자 정보 전달
    });
    /* 답글 작성 성공 시 프론트로 돌려주기 */
    res.status(201).json(comment);
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