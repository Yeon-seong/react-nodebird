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

    /* 하나의 게시글(Post)에 대한 소유자(User) 정보가 딱 하나씩 들어감 */
    // UserId: {}

  }, {
    /* ---------- 게시글 모델 세팅 ---------- */
    charset: 'utf8mp4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mp4_general_ci',  // 한글, 이모티콘 저장
  });
  // 게시글 모델 관계 설정
  Post.associate = (db) => {
    /* X : 하나의 게시글(Post)은 작성자(User)가 여러 명일 수 없다. */
    db.Post.belongsTo(db.User);
    /* @ : 하나의 게시글(Post)도 여러 개의 해시태그(Hashtag)를 가질 수 있다. */
    db.Post.belongsToMany(db.Hashtag, { thrugh: 'PostHash' });
    /* @ : 하나의 게시글(Post)도 여러 명의 사용자(User)로부터 좋아요(Likers)를 받을 수 있다. */
    db.Post.belongsToMany(db.User, { thrugh: 'Like', as: 'Likers' });
    /* O : 하나의 게시글(Post)은 여러 개의 답글(Comment)을 가질 수 있다. */
    db.Post.hasMany(db.Comment);
    /* O : 하나의 게시글(Post)은 여러 개의 이미지(Image)를 가질 수 있다. */
    db.Post.hasMany(db.Image);
  };
  return Post;
};