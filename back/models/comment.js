/* -------------------- 트위터 답글 모델 -------------------- */



// module.exports 객체
module.exports = (sequelize, DataTypes) => {
  // 답글 모델(테이블)
  const Comment = sequelize.define('Comment', { // MySQL에는 comments 테이블 생성
    

    /* ---------- 답글 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있음
    // 콘텐츠 칼럼
    content: {
      type: DataTypes.TEXT,   // 텍스트 글자 수 무제한
      allowNull: false,       // 답글 콘텐츠 필수
    },

    /* ---------- belongsTo 메서드가 실제 칼럼 제작 ---------- */
    // UserId: {}
    // PostId: {}

  }, {
    /* ---------- 답글 모델 세팅 ---------- */
    charset: 'utf8mb4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mb4_general_ci',  // 한글, 이모티콘 저장
  });


  // 답글 모델 관계 설정
  Comment.associate = (db) => {

    /* (1:N 관계) : 하나의 답글(Comment)은 작성자(User)가 한 명이다. */
    db.Comment.belongsTo(db.User);

    /* (1:N 관계) : 하나의 답글(Comment)은 게시글(Post)이 하나다. */
    db.Comment.belongsTo(db.Post);

  };
  return Comment;
};