/* -------------------- 트위터 게시글 모델 -------------------- */



module.exports = (sequelize, DataTypes) => {
  // 게시글 모델(테이블)
  const Post = sequelize.define('Post', { // MySQL에는 posts 테이블 생성
    

    /* ---------- 게시글 모델 정보 ---------- */
    // id: {},    // id가 기본적으로 들어있음
    // 콘텐츠 칼럼
    content: {
      type: DataTypes.TEXT,   // 텍스트 글자 수 무제한
      allowNull: false,       // 게시글 콘텐츠 필수
    },

    /* ---------- belongsTo 메서드가 실제 칼럼 제작 ---------- */
    // UserId: {}
    // RetweetId: {}                // as로 PostId를 RetweetId로 이름을 바꾼다.

  }, {
    /* ---------- 게시글 모델 세팅 ---------- */
    charset: 'utf8mb4',             // MySQL에서 한글, 이모티콘 사용 가능
    collate: 'utf8mb4_general_ci',  // 한글, 이모티콘 저장
  });


  // 게시글 모델 관계 설정
  Post.associate = (db) => {

    /* (1:N 관계) : 하나의 게시글(Post)은 작성자(User)가 한 명이다. */
    db.Post.belongsTo(db.User);

    /* (1:N 관계) : 하나의 게시글(Post)은 여러 답글(Comment)을 가질 수 있다. */
    db.Post.hasMany(db.Comment);

    /* (1:N 관계) : 하나의 게시글(Post)은 여러 이미지(Image)를 가질 수 있다. */
    db.Post.hasMany(db.Image);

    /* (N:M 관계) : 하나의 게시글(Post)도 여러 해시태그(Hashtag)를 가질 수 있다. */
    // 중간 테이블 이름 : 'PostHash'
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHash' });

    /* (N:M 관계) : 하나의 게시글(Post)도 여러 사용자(User)로부터 좋아요(Likers)를 받을 수 있다. */
    // 중간 테이블 이름 : 'Like', 내가 좋아요를 누른 사용자 별칭 : 'Likers'
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });

    /* (1:N 관계) : 하나의 게시글(Post)은 여러 게시글(Post)이 리트윗(Retweet)을 할 수 있다. */
    // 중간 테이블 이름 : 'Retweet'
    db.Post.belongsTo(db.Post, { as: 'Retweet' });

  };
  return Post;
};