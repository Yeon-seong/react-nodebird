/* -------------------- 모든 페이지에서 공통적으로 적용되어야 하는 <head> -------------------- */



// 외부 컴포넌트 불러오기
import Document, { Html, Main, Main, NextScript } from 'next/document';


// _document 파일 기본 구조
export default class MyDocument extends Document {
  render() {
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html> 
  }
}