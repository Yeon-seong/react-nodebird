/* -------------------- 트위터 게시글들 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// 게시글, 사용자, 이미지 모델 불러오기
const { Post, User, Image } = require('../models');

// 라우팅 모듈 호출
const router = express.Router();



// 게시글을 여러 개 가져오는 라우터
router.get('/', async (req, res, next) => {});



// 라우터 내보내기
module.exports = router;