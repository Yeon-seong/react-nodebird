/* -------------------- 트위터 답글 모델 -------------------- */



// 데이터 타입스 = 시퀄라이즈
const DataTypes = require('sequelize');

// 데이터 타입스 안의 모델 객체 사용을 위한 구조분해 할당
const { Model } = DataTypes;



// module.exports 객체
module.exports = class Comment extends Model {

  // 답글 모델(답글 테이블) 설정
  static init(sequelize) {
    return super.init({

      /* ---------- Model init의 첫 번째 인수 ---------- */
      /* 답글 모델 정보 */
      // id: {},    // id가 기본적으로 들어있음
      // 콘텐츠 칼럼
      content: {
        type: DataTypes.TEXT, // 텍스트 글자 수 무제한
        allowNull: false,     // 답글 콘텐츠 필수
      },

      /* belongsTo 메서드가 실제 칼럼 제작 */
      // UserId: {}
      // PostId: {}

    }, {

      /* ---------- Model init의 두 번째 인수 ---------- */
      /* 답글 모델 세팅 */
      modelName: 'Comment',          // 모델 이름 : Comment
      tableName: 'comments',         // MySQL 테이블 이름 : comments(소문자 복수)
      charset: 'utf8mb4',            // MySQL에서 한글, 이모티콘 사용 가능
      collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
      sequelize,                     // 연결 객체를 클래스로 보내주기 위해 넣어준다.

    });
  }


  // 답글 모델 관계 설정
  static associate(db) {

    /* (1:N 관계) : 하나의 답글(Comment)은 작성자(User)가 한 명이다. */
    db.Comment.belongsTo(db.User);

    /* (1:N 관계) : 하나의 답글(Comment)은 게시글(Post)이 하나다. */
    db.Comment.belongsTo(db.Post);

  }

};