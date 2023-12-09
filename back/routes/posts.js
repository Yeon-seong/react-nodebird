/* -------------------- 트위터 게시글들 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 게시글, 사용자, 이미지, 답글 모델 불러오기
const { Post, User, Image, Comment } = require('../models');

// 라우팅 모듈 호출
const router = express.Router();



// 여러 개의 게시글을 가져오는 라우터
router.get('/', async (req, res, next) => { // GET /posts
  try {
    /* Post.findAll : 지금까지 작성한 모든 게시글 가져오기 */
    const posts = await Post.findAll({
      /* 조건1 : 게시글 10개만 가져오기 */
      limit: 10,
      /* 조건2 : 최신 게시글부터 가져오기(내림차순) */
      order: [['createdAt', 'DESC']],
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
        include: [{
          /* ---------- 게시글 답글의 작성자 ---------- */
          model: User,
          attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});



// 라우터 내보내기
module.exports = router;