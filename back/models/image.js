/* -------------------- 트위터 이미지 모델 -------------------- */



// 데이터 타입스 = 시퀄라이즈
const DataTypes = require('sequelize');

// 데이터 타입스 안의 모델 객체 사용을 위한 구조분해 할당
const { Model } = DataTypes;



// module.exports 객체
module.exports = class Image extends Model {

  // 이미지 모델(이미지 테이블) 설정
  static init(sequelize) {
    return super.init({

      /* ---------- Model init의 첫 번째 인수 ---------- */
      /* 이미지 모델 정보 */
      // id: {},    // id가 기본적으로 들어있음.
      // 경로 소스 칼럼
      src: {
        type: DataTypes.STRING(300), // 300글자 이내의 문자열
        allowNull: false,            // 이미지 경로 소스 필수
      },

      /* belongsTo 메서드가 실제 칼럼 제작 */
      // PostId: {}

    }, {

      /* ---------- Model init의 두 번째 인수 ---------- */
      /* 이미지 모델 세팅 */
      modelName: 'Image',         // 모델 이름 : Image
      tableName: 'images',        // MySQL 테이블 이름 : images(소문자 복수)
      charset: 'utf8',            // MySQL에서 한글 사용 가능
      collate: 'utf8_general_ci', // 한글 저장
      sequelize,                  // 연결 객체를 클래스로 보내주기 위해 넣어준다.

    });
  }


  // 이미지 모델 관계 설정
  static associate(db) {

    /* (1:N 관계) : 하나의 이미지(Image)는 게시글(Post)이 하나다. */
    db.Image.belongsTo(db.Post);

  }

};