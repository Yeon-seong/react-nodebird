/* -------------------- 트위터 해시태그 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 해시태그 모델(테이블)
  const Hashtag = sequelize.define('Hashtag', { // MySQL에는 hashtags 테이블 생성
    /* ---------- 해시태그 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있다.
    name: {},
  }, {
    /* ---------- 해시태그 모델 세팅 ---------- */
    charset: 'utf8mp4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mp4_general_ci',  // 한글, 이모티콘 저장
  });
  // 해시태그 모델 관계 설정
  Hashtag.associate = (db) => {};
  return Hashtag;
};