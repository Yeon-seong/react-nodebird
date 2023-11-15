/* -------------------- 트위터 사용자 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 사용자 모델(테이블)
  const User = sequelize.define('User', { // MySQL에는 users 테이블 생성
    /* ---------- 사용자 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있다.
    email: {},
    nickname: {},
    password: {},
  }, {
    /* ---------- 사용자 모델 세팅 ---------- */
    charset: 'utf8',              // MySQL에서 한글 사용 가능
    collate: 'utf8_general_ci',   // 한글 저장
  });
  // 사용자 모델 관계 설정
  User.associate = (db) => {};
  return User;
};