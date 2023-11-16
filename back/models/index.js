// SQL(시퀄라이즈) 불러오기
const Sequelize = require('sequelize');

// 개발 시 환경 변수 기본 값 : development
const env = process.env.NODE_ENV || 'development';

// config = development 객체 정보
const config = require('../config/config')[env];

// 데이터베이스 객체
const db = {};

// 시퀄라이즈 객체에 연결 정보가 담김
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;