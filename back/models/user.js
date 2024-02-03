/* -------------------- 트위터 사용자 모델 -------------------- */



// 데이터 타입스 = 시퀄라이즈
const DataTypes = require('sequelize');

// 데이터 타입스 안의 모델 객체 사용을 위한 구조분해 할당
const { Model } = DataTypes;



// module.exports 객체
module.exports = class User extends Model {

  // 사용자 모델(사용자 테이블) 설정
  static init(sequelize) {
    return super.init({

      /* ---------- Model init의 첫 번째 인수 ---------- */
      /* 사용자 모델 정보 */
      // id: {},    // id가 기본적으로 들어있음.
      // 이메일 칼럼
      email: {
        type: DataTypes.STRING(30),    // 30글자 이내의 문자열
        allowNull: false,              // 사용자 이메일 필수
        unique: true,                  // 고유한 값(중복 X)
      },
      // 닉네임 칼럼
      nickname: {
        type: DataTypes.STRING(30),    // 30글자 이내의 문자열
        allowNull: false,              // 사용자 닉네임 필수
      },
      // 비밀번호 칼럼
      password: {
        type: DataTypes.STRING(300),   // 300글자 이내의 문자열
        allowNull: false,              // 사용자 비밀번호 필수
      },

    }, {

      /* ---------- Model init의 두 번째 인수 ---------- */
      /* 사용자 모델 세팅 */
      modelName: 'User',          // 모델 이름 : User
      tableName: 'users',         // MySQL 테이블 이름 : users(소문자 복수)
      charset: 'utf8mb4',         // MySQL에서 한글, 이모티콘 사용 가능
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,                  // 연결 객체를 클래스로 보내주기 위해 넣어준다.

    });
  }


  // 사용자 모델 관계 설정
  static associate(db) {

    /* (1:N 관계) : 한 명의 사용자(User)는 여러 게시글(Post)을 가질 수 있다. */
    db.User.hasMany(db.Post);

    /* (1:N 관계) : 한 명의 사용자(User)는 여러 답글(Comment)을 가질 수 있다. */
    db.User.hasMany(db.Comment);

    /* (N:M 관계) : 한 명의 사용자(User)도 여러 게시글(Post)에 좋아요(Liked)를 할 수 있다. */
    // 중간 테이블 이름 : 'Like', 내 게시글에 좋아요를 누른 사용자 별칭 : 'Likerd'
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });

    /* (N:M 관계) : 한 명의 사용자(User)도 여러 사용자(User)에게 팔로우(Follow)를 할 수 있다. */
    // 중간 테이블 이름 : 'Follow', 별칭 : 'Followers', 칼럼의 아이디 : 'FollowingId'
    db.User.belongsToMany(
      db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }
    );

    // 중간 테이블 이름 : 'Follow', 별칭 : 'Followings', 칼럼의 아이디 : 'FollowerId'
    db.User.belongsToMany(
      db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' }
    );

  }

};