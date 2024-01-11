/* -------------------- 모든 페이지에서 공통적으로 적용되어야 하는 <head> -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// 외부 컴포넌트 불러오기
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';



// 서버사이드 렌더링(SSR) : getInitialProps 사용
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    /* ---------- React 렌더링 로직을 동기적으로 실행 ---------- */
    try {
      ctx.renderPage = () => originalRenderPage({
        /* enhanceApp으로 원래 app기능에 document 기능에다가
           stylesheet가 styled-component들을 서버사이드 렌더링할 수 있게 해준다. */
        enhanceApp: (App) => (props) => sheet.collectStyles(<App { ...props } />)
      });
      // 부모 'getInitialProps'를 실행(이제 사용자 정의 'renderPage'가 포함된다.)
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    /* ---------- 에러 캐치 ---------- */
    } catch (error) {
      console.log(error);
    /* ---------- try 블록이 종료되면 무조건 실행 ---------- */
    } finally {
      sheet.seal();
    }
  }



  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}