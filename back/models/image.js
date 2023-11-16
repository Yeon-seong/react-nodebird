/* -------------------- 트위터 이미지 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 이미지 모델(테이블)
  const Image = sequelize.define('Image', { // MySQL에는 images 테이블 생성

    /* ---------- 이미지 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있다.
    // 경로 소스 칼럼
    src: {
      type: DataTypes.STRING(300),  // 300글자 이내의 문자열
      allowNull: false,             // 이미지 경로 소스 필수
    },

    /* 하나의 이미지(Image)에 대한 게시글(Post) 정보가 딱 하나씩 들어감 */
    // PostId

  }, {
    /* ---------- 이미지 모델 세팅 ---------- */
    charset: 'utf8',              // MySQL에서 한글 사용 가능
    collate: 'utf8_general_ci',   // 한글 저장
  });
  // 이미지 모델 관계 설정
  Image.associate = (db) => {
    /* X : 하나의 이미지(Image)는 게시글(Post)이 여러 개일 수 없다. */
    db.Image.belongsTo(db.Post);
  };
  return Image;
};