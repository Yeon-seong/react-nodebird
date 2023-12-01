/* -------------------- 트위터 로그인 패스포트 설정 -------------------- */



// Passport 미들웨어 호출
const passport = require('passport');

// Local 파일 불러오기
const local = require('./local');

// 사용자 모델 불러오기
const { User } = require('../models');



// module.exports 객체
module.exports = () => {
  // 패스포트 설정1
  passport.serializeUser((user, done) => {
    /* 쿠키랑 묶어줄 정보(user.id)만 저장 */
    done(null, user.id);
  });


  // 패스포트 설정2
  /* 복원하기 위해 id를 통해서 user.id 전달 */
  passport.deserializeUser(async (id, done) => {
    try {
      /* id를 통해 나머지 사용자 정보 복구 */
      const user = await User.findOne({ where: { id }});
      done(null, user); // 사용자 정보를 복구해 req.user에 넣는다.
      
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  

  // 로컬 실행 : local.js의 module.exports 실행
  local();
};