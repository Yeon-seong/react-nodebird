/* -------------------- 트위터 해시태그 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 해시태그 모델(테이블)
  const Hashtag = sequelize.define('Hashtag', { // MySQL에는 hashtags 테이블 생성

    
    /* ---------- 해시태그 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있음
    // 이름 칼럼
    name: {
      type: DataTypes.STRING(30),   // 30글자 이내의 문자열
      allowNull: false,             // 해시태그 이름 필수
    },

  }, {
    /* ---------- 해시태그 모델 세팅 ---------- */
    charset: 'utf8mp4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mp4_general_ci',  // 한글, 이모티콘 저장
  });


  // 해시태그 모델 관계 설정
  Hashtag.associate = (db) => {

    /* (N:M 관계) : 하나의 해시태그(Hashtag)도 여러 게시글(Post)에 있을 수 있다. */
    // 중간 테이블 이름 : 'PostHash'
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHash' });

  };
  return Hashtag;
};