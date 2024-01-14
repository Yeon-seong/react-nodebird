/* -------------------- 트위터 해시태그 모델 -------------------- */



// 데이터 타입스 = 시퀄라이즈
const DataTypes = require('sequelize');

// 데이터 타입스 안의 모델 객체 사용을 위한 구조분해 할당
const { Model } = DataTypes;



// module.exports 객체
module.exports = class Hashtag extends Model {

  // 해시태그 모델(해시태그 테이블) 설정
  static init(sequelize) {
    return super.init({

      /* ---------- Model init의 첫 번째 인수 ---------- */
      /* 해시태그 모델 정보 */
      // id: {},    // id가 기본적으로 들어있음
      // 이름 칼럼
      name: {
        type: DataTypes.STRING(30), // 30글자 이내의 문자열
        allowNull: false,           // 해시태그 이름 필수
      },

    }, {

      /* ---------- Model init의 두 번째 인수 ---------- */
      /* 해시태그 모델 세팅 */
      modelName: 'Hashtag',          // 모델 이름 : Hashtag
      tableName: 'hashtags',         // MySQL 테이블 이름 : hashtags(소문자 복수)
      charset: 'utf8mb4',            // MySQL에서 한글, 이모티콘 사용 가능
      collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
      sequelize,                     // 연결 객체를 클래스로 보내주기 위해 넣어준다.

    });
  }


  // 해시태그 모델 관계 설정
  static associate(db) {

    /* (N:M 관계) : 하나의 해시태그(Hashtag)도 여러 게시글(Post)에 있을 수 있다. */
    // 중간 테이블 이름 : 'PostHashtag'
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

  }

};