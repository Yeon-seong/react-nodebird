/* -------------------- 트위터 로그인 패스포트 설정 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');

// Local 파일 불러오기
const local = require('./local');



module.exports = () => {
  passport.serializeUser(() => {
    // 패스포트 설정1
  });
  passport.deserializeUser(() => {
    // 패스포트 설정2
  });
  
  // 로컬 실행 : local.js의 module.exports 실행
  local();
};