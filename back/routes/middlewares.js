/* -------------------- 트위터 사용자 로그인 유무 검사 커스텀 미들웨어 -------------------- */



// (로그인 했을 때) 로그인 유무 검사
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};


// (로그인 안했을 때) 로그인 유무 검사
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
  }
};