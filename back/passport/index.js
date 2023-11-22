/* -------------------- 트위터 로그인 패스포트 설정 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');



module.exports = () => {
  passport.serializeUser(() => {
    // 패스포트 설정1
  });
  passport.deserializeUser(() => {
    // 패스포트 설정2
  });
};