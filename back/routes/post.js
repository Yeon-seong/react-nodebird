/* -------------------- 트위터 게시글 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 게시글, 사용자, 이미지, 답글 모델 불러오기
const { Post, User, Image, Comment } = require('../models');

// 로그인 유무를 검사하는 커스텀 미들웨어 불러오기
const { isLoggedIn } = require('./middlewares');

// 라우팅 모듈 호출
const router = express.Router();



// 게시글 작성하기 라우터
router.post('/', isLoggedIn, async (req, res, next) => {  // POST /post
  try {
    /* 게시글 기본 정보를 가져오는 함수 */
    const post = await Post.create({
      content: req.body.content,  // addPost saga의 content: data
      UserId: req.user.id,        // passport.deserializeUser로 사용자 정보 전달
    });
    /* 게시글 모든 정보를 가져오는 함수 */
    const fullPost = await Post.findOne({
      where: { id: post.id },
      // 모델 가져오기
      include: [{
        /* ---------- 게시글 작성자 ---------- */
        model: User,
        attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
      }, {
        /* ---------- 게시글 이미지 ---------- */
        model: Image,
      }, {
        /* ---------- 게시글 답글 ---------- */
        model: Comment,
        // 모델 가져오기
        include: [{
          /* ---------- 게시글 답글의 작성자 ---------- */
          model: User,
          attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
        }]
      }],
    });
    /* 게시글 작성 성공 시 모든 게시글 정보를 완성해서 프론트로 돌려주기 */
    res.status(201).json(fullPost);
  
  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 답글 작성하기 라우터
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => { // POST /post/동적 히든/comment
  try {
    /* 존재하지 않는 게시글이 있는지 검사하는 함수 */
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    /* ---------- 만약 존재하지 않는 게시글이 있다면 400번대 에러 출력 ---------- */
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    };

    /* await : 실제로 데이터가 들어감, create : 테이블 안에 데이터를 넣음 */
    // 답글 기본 정보를 가져오는 함수
    const comment = await Comment.create({
      content: req.body.content,
      // 동적 게시글 아이디, parseInt로 숫자로 바꾸기
      PostId: parseInt(req.params.postId, 10),
      // passport.deserializeUser로 사용자 정보 전달
      UserId: req.user.id,
    });
    
    /* 답글 전체 정보를 가져오는 함수 */
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      // 모델 가져오기
      include: [{
        /* ---------- 게시글 작성자 ---------- */
        model: User,
        attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
      }],
    })
    /* 답글 작성 성공 시 모든 답글 정보를 완성해서 프론트로 돌려주기 */
    res.status(201).json(fullComment);

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 게시글 좋아요 라우터
router.patch('/:postId/like', (req, res, next) => { // PATCH /post/게시글 번호/like
  
});


// 게시글 좋아요 취소 라우터
router.delete('/:postId/like', (req, res, next) => { // DELETE /post/게시글 번호/like
  
});


// 게시글 삭제하기 라우터
router.delete('/', (req, res) => {  // DELETE /post
  res.json({ id: 1 });
});



// 라우터 내보내기
module.exports = router;