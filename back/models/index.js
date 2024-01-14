/* -------------------- 트위터 시퀄라이즈 -------------------- */



// SQL(시퀄라이즈) 불러오기
const Sequelize = require('sequelize');

// 모델 불러오기
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');



// 개발 시 환경 변수 기본 값 : development
const env = process.env.NODE_ENV || 'development';

// config = development 객체 정보
const config = require('../config/config')[env];

// 데이터베이스 객체
const db = {};



// 시퀄라이즈 객체에 연결 정보가 담김
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);



// 클래스 불러오기
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;


// 모델 설정 실행(init)
Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});


// 모델 관계 설정 실행(associate)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



// db에 시퀄라이즈 넣기
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 데이터베이스 객체 내보내기
module.exports = db;