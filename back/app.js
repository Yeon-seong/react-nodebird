// http 서버 모듈 사용 : 웹 브라우저 요청 처리
const http = require('http');


// 요청(Req: Request)
const server = http.createServer((reg, res) => {
  console.log(reg.url, reg.method);
  
  // 응답(Res: Response)
  res.write('<h1>Hello node1</h1>');
  res.write('<h2>Hello node2</h2>');
  res.write('<h3>Hello node3</h3>');
  res.write('<h4>Hello node4</h4>');
  res.end('<h5>Hello node5</h5>');
});


server.listen(3000, () => {
  console.log('서버 실행 중');
});