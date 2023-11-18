/* -------------------- 트위터 사용자 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 사용자 모델(테이블)
  const User = sequelize.define('User', { // MySQL에는 users 테이블 생성


    /* ---------- 사용자 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있음.
    // 이메일 칼럼
    email: {
      type: DataTypes.STRING(30),   // 30글자 이내의 문자열
      allowNull: false,             // 사용자 이메일 필수
      unique: true,                 // 고유한 값(중복 X)
    },
    // 닉네임 칼럼
    nickname: {
      type: DataTypes.STRING(30),   // 30글자 이내의 문자열
      allowNull: false,             // 사용자 닉네임 필수
    },
    // 비밀번호 칼럼
    password: {
      type: DataTypes.STRING(300),  // 300글자 이내의 문자열
      allowNull: false,             // 사용자 비밀번호 필수
    },
    
  }, {
    /* ---------- 사용자 모델 세팅 ---------- */
    charset: 'utf8',              // MySQL에서 한글 사용 가능
    collate: 'utf8_general_ci',   // 한글 저장
  });


  // 사용자 모델 관계 설정
  User.associate = (db) => {};
  return User;
};