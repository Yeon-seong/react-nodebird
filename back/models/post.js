/* -------------------- 트위터 게시글 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 게시글 모델(테이블)
  const Post = sequelize.define('Post', { // MySQL에는 posts 테이블 생성
    
    /* ---------- 게시글 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있다.
    // 콘텐츠 칼럼
    content: {
      type: DataTypes.TEXT,   // 텍스트 글자 수 무제한
      allowNull: false,       // 게시글 콘텐츠 필수
    },

  }, {
    /* ---------- 게시글 모델 세팅 ---------- */
    charset: 'utf8mp4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mp4_general_ci',  // 한글, 이모티콘 저장
  });
  // 게시글 모델 관계 설정
  Post.associate = (db) => {};
  return Post;
};