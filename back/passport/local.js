/* -------------------- 트위터 로컬 로그인 전략 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');

// 로컬 로그인 전략
const { Strategy: LocalStrategy } = require('passport-local');



module.exports = () => {
  passport.use(new LocalStrategy({
    /* ---------- 객체 : req.body에 대한 설정 ---------- */
    usernameField: 'email',     // req.body.email
    passwordField: 'password',  // req.body.password
  }, () => {
    // 로그인 전략
  }));
};