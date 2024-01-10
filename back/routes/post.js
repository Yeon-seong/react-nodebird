/* -------------------- 트위터 게시글 라우터 -------------------- */



// Express 모듈 호출
const express = require('express');

// Multer 모듈 호출
const multer = require('multer');

// Path 모듈 호출
const path = require('path');

// fs 모듈 호출
const fs = require('fs');

// 게시글, 사용자, 이미지, 답글 모델 불러오기
const { Post, User, Image, Comment, Hashtag } = require('../models');

// 로그인 유무를 검사하는 커스텀 미들웨어 불러오기
const { isLoggedIn } = require('./middlewares');

// 라우팅 모듈 호출
const router = express.Router();



// uploads 폴더가 있는지 검사 및 생성
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없음으로 생성합니다.');
  fs.mkdirSync('uploads');
}


// 파일 업로드 옵션
const upload = multer({
  /* 저장 위치 : 디스크 스토리지(컴퓨터 하드디스크)에 저장 */
  storage: multer.diskStorage({
    /* 저장 폴더 : uploads라는 폴더에 저장 */
    destination(req, file, done) {
      done(null, 'uploads');
    },
    /* ---------- 저장 파일이름 ---------- */
    // 파일이름.png
    filename(req, file, done) {
      // 확장자 추출(.png)
      const ext = path.extname(file.originalname);
      // 파일이름(basename)
      const basename = path.basename(file.originalname, ext);
      // 파일이름+'_'+날짜+확장자 : 이름_20230619.png
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  /* ---------- 파일 업로드 크기 제한 ---------- */
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB(20메가바이트)로 제한
});


// 여러 게시글 작성 라우터
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {  // POST /post
  try {
    /* ---------- req.body.content에서 해시태그 꺼내오기 ---------- */
    const hashtags = req.body.content.match(/#[^\s#]+/g);

    /* ---------- 게시글 기본 정보를 가져오는 함수 ---------- */
    const post = await Post.create({
      content: req.body.content,  // addPost saga의 content: data
      UserId: req.user.id,        // passport.deserializeUser로 사용자 정보 전달
    });

    /* 해시태그 등록하기
       해시태그가 없을 때만 DB에 새로 등록되고, 있을 때는 DB에서 해시태그 가져오기 */
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => 
        Hashtag.findOrCreate({ // 해시태그 중복 방지를 위해 create 대신 findOrCreate 사용
          where: { name: tag.slice(1).toLowerCase() }
        })
      ));
      // result 결과 모양 : [[노드, true], [리액트, true]]
      // 배열에서 첫 번째 자리인 '노드', '리액트'만 가져오기
      await post.addHashtags(result.map((v) => v[0]));
    }

    /* 이미지 등록하기
       게시글에 이미지를 올릴 때 이미지 개수에 따른 이미지 주소 설정 */
    if (req.body.image) {
      // 이미지를 여러 개 올린 경우 req.body.image가 배열로 올라간다.
      // => image: [파일이름1.png, 파일이름2.png]
      if (Array.isArray(req.body.image)) {
        // 이미지 주소 배열을 시퀄라이즈(DB)에 넣어 저장(파일 자체 저장x)
        const images = await Promise.all(req.body.image.map((image) =>
        Image.create({ src: image }))); // promise의 배열
        await post.addImages(images);   // 게시글 생성 시 이미지들이 알아서 추가된다.

      // 이미지를 하나만 올린 경우 req.body.image가 주소로 나온다.
      // => image: 파일이름1.png
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);    // 게시글 생성 시 이미지가 알아서 추가된다.
      }
    }

    /* ---------- 게시글 모든 정보를 가져오는 함수 ---------- */
    const fullPost = await Post.findOne({
      where: { id: post.id },
      // 모델 가져오기
      include: [{
        /* ---------- 게시글 작성자 ---------- */
        model: User,
        attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
      }, {
        /* ---------- 게시글 좋아요 누른 사람들 ---------- */
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'], // id 데이터만 가져오기
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


// 단일 게시글 불러오기 라우터
router.get('/:postId', async (req, res, next) => { // GET /post/동적 히든
  try {
    /* 존재하지 않는 게시글이 있는지 검사하는 함수 */
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    
    /* ---------- 만약 존재하지 않는 게시글이 있다면 400번대 에러 출력 ---------- */
    if (!post) {
      return res.status(404).send('존재하지 않는 게시글입니다.');
    }

    /* ---------- 게시글 모든 정보를 가져오는 함수 ---------- */
    const fullPost = await Post.findOne({
      where: { id: post.id },
      // 모델 가져오기
      include: [{
        /* ---------- 리트윗한 게시글 ---------- */
        model: Post,
        as: 'Retweet', // 리트윗한 게시글이 post.Retweet으로 담긴다.
        // 모델 가져오기
        include: [{
          /* ---------- 리트윗한 게시글의 작성자 ---------- */
          model: User,
          attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
        }, {
          /* ---------- 리트윗한 게시글의 이미지 ---------- */
          model: Image,
        }]
      }, {
        /* ---------- 게시글 작성자 ---------- */
        model: User,
        attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
      }, {
        /* ---------- 게시글 좋아요 누른 사람들 ---------- */
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'], // id 데이터만 가져오기
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
        }],
      }],
    });
    /* 게시글 작성 성공 시 모든 게시글 정보를 완성해서 프론트로 돌려주기 */
    res.status(200).json(fullPost);

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// (여러 파일을 업로드하는) 이미지 업로드 라우터 : 이미지 업로드 후에 실행
router.post('/images', upload.array('image'), async (req, res, next) => {  // POST /post/images
  /* req files : 업로드한 이미지에 대한 정보 */
  console.log(req.files);
  /* 어디로 업로드 됐는지에 대한 파일명을 프론트로 보내기 */
  res.json(req.files.map((v) => v.filename));
});


// 답글 작성 라우터
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


// 리트윗 라우터
router.post('/:postId/retweet', isLoggedIn, async (req, res, next) => { // POST /post/동적 히든/retweet
  try {
    /* 존재하지 않는 게시글이 있는지 검사하는 함수 */
    const post = await Post.findOne({
      where: { id: req.params.postId },
      // 모델 가져오기
      include: [{
        model: Post,
        as: 'Retweet', // as: 'Retweet'으로 include를 해주면 post.retweet이 생긴다.
      }],
    });
    
    /* ---------- 만약 존재하지 않는 게시글이 있다면 400번대 에러 출력 ---------- */
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    
    /* 자기 게시글을 리트윗하는 경우,
       or 자기 게시글을 리트윗한 다른 게시글을 다시 자기가 리트윗하는 경우 리트윗 막기 */
    if (req.user.id === post.UserId
    || (post.Retweet && post.Retweet.UserId === req.user.id)) {
      return res.status(403).send('자신의 글은 리트윗할 수 없습니다.');
    }
    
    // 리트윗할 Id : 리트윗한 게시글이면 리트윗 아이디 사용 or 아니면 게시글 아이디 사용
    const retweetTargetId = post.RetweetId || post.id;
    /* 이미 리트윗한 게시글을 또 리트윗하는지 검사하는 함수(두 번 리트윗 막기) */
    const exPost = await Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTargetId,
      },
    });
    /* ---------- 만약 이미 리트윗한 게시글을 또 리트윗한다면 400번대 에러 출력 ---------- */
    if (exPost) {
      return res.status(403).send('이미 리트윗한 게시글입니다.');
    }

    /* await : 실제로 데이터가 들어감, create : 테이블 안에 데이터를 넣음 */
    const retweet = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetTargetId,
      content: 'retweet',
    // 게시글 모델에서 allowNull을 false로 설정했기 때문에 게시글 콘텐츠가 필수다.
    });

    /* ---------- 내가 어떤 게시글을 리트윗했는지 찾는 함수 ---------- */
    const retweetWithPrevPost = await Post.findOne({
      where: { id: retweet.id },
      // 모델 가져오기
      include: [{
        /* ---------- 리트윗한 게시글 ---------- */
        model: Post,
        as: 'Retweet', // 리트윗한 게시글이 post.Retweet으로 담긴다.
        // 모델 가져오기
        include: [{
          /* ---------- 리트윗한 게시글의 작성자 ---------- */
          model: User,
          attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
        }, {
          /* ---------- 리트윗한 게시글의 이미지 ---------- */
          model: Image,
        }]
      }, {
        /* ---------- 게시글 작성자 ---------- */
        model: User,
        attributes: ['id', 'nickname'], // id, nickname 데이터만 가져오기
      }, {
        /* ---------- 게시글 좋아요 누른 사람들 ---------- */
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'], // id 데이터만 가져오기
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
        }],
      }],
    });
    /* 게시글 작성 성공 시 어떤 게시글을 리트윗 했는지에 대한 정보를 프론트로 돌려주기 */
    res.status(201).json(retweetWithPrevPost);

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 게시글 좋아요 라우터
router.patch('/:postId/like', isLoggedIn, async (req, res, next) => { // PATCH /post/게시글 번호/like
  try {
    /* 게시글이 있는지 검사하는 함수 */
    const post = await Post.findOne({ where: { id: req.params.postId }});
    /* 만약 게시글(post)이 없다면 403번 에러로 응답 */
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    /* 시퀄라이즈로 게시글-사용자 테이블 관계 간 게시글 좋아요한 사람 추가 */
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 게시글 좋아요 취소 라우터
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => { // DELETE /post/게시글 번호/like
  try {
    /* 게시글이 있는지 검사하는 함수 */
    const post = await Post.findOne({ where: { id: req.params.postId }});
    /* 만약 게시글(post)이 없다면 403번 에러로 응답 */
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    /* 시퀄라이즈로 게시글-사용자 테이블 관계 간 게시글 좋아요 취소한 사람 삭제 */
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// 게시글 삭제 라우터
router.delete('/:postId', isLoggedIn, async (req, res, next) => {  // DELETE /post/게시글 번호
  try {
    /* 게시글 아이디가 '나'이며, 내가 작성한 게시글만 삭제하는 함수 */
   await Post.destroy({
    where: {
      id: req.params.postId,
      UserId: req.user.id,
    },
   });
    /* 게시글 삭제 성공 시 parseInt로 게시글 아이디를 숫자로 바꾼 후 프론트로 넘기기 */
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });

  /* ---------- 에러 캐치 ---------- */
  } catch (error) {
    console.error(error);
    next(error);
  }
});



// 라우터 내보내기
module.exports = router;