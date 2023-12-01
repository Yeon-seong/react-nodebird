/* -------------------- 트위터 로컬 로그인 전략 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');

// 로컬 로그인 전략
const { Strategy: LocalStrategy } = require('passport-local');

// 비밀번호 암호화 라이브러리
const bcrypt = require('bcrypt');

// 사용자 모델 불러오기
const { User } = require('../models');



// module.exports 객체
module.exports = () => {
  passport.use(new LocalStrategy({
    /* ---------- 객체 : req.body에 대한 설정 ---------- */
    usernameField: 'email',     // req.body.email
    passwordField: 'password',  // req.body.password
  }, async (email, password, done) => {
    /* ---------- 함수 : 로그인 할 때 입력한 이메일이 있는지 검사 ---------- */
    try {
      const user = await User.findOne({
        where: { email }
      });
      /* ---------- 만약 사용자(이메일)가 없다면 클라이언트 실패 ---------- */
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 이메일입니다!' });
      };

      // DB에 저장된 비밀번호와 사용자가 입력한 비밀번호를 await으로 비교
      const result = await bcrypt.compare(password, user.password);
      /* 만약 이메일이 있고, 비밀번호가 일치하면 로그인 성공 */
      if (result) {
        return done(null, user);  // 성공 시 사용자 정보를 넘김
      };
      /* ---------- 비밀번호가 일치하지 않으면 클라이언트 실패 ---------- */
      return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
      
    } catch (error) {
      /* ---------- 서버 에러가 난다면 ---------- */
      console.error(error);
      return done(error); // 서버 에러가 난 경우
    }
  }));
};