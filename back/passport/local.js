/* -------------------- 트위터 로컬 로그인 전략 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');

// 로컬 로그인 전략
const { Strategy: LocalStrategy } = require('passport-local');

// 사용자 모델 불러오기
const { User } = require('../models');



module.exports = () => {
  passport.use(new LocalStrategy({
    /* ---------- 객체 : req.body에 대한 설정 ---------- */
    usernameField: 'email',     // req.body.email
    passwordField: 'password',  // req.body.password
  }, async (email, password, done) => {
    /* ---------- 함수 : 로그인 할 때 입력한 이메일에 사용자가 있는지 검사 ---------- */
    const user = await User.findOne({
      where: { email }
    });
    /* ---------- 만약 사용자가 없다면 ---------- */
    if (!user) {
      return done(
        null,                                     // 첫 번째 자리 : 서버 에러
        false,                                    // 두 번째 자리 : 성공
        { reason: '존재하지 않는 사용자입니다!' }   // 세 번째 자리 : 클라이언트 에러
      );
    };
  }));
};