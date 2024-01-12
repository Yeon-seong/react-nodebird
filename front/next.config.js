/* -------------------- Next 커스텀 웹팩 -------------------- */



const withBundleAnalyzer = require('@next/bundle-analyzer')({
  // enabled의 ANALYZE라는 환경변수가 true여야 실행
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({

  // 컴프레스 플러그인 대체
  compress: true,

  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];

    return {
      ...config,

      // 배포 모드라면 production, 아니면 development
      mode: prod ? 'production' : 'development',

      // 배포 환경에서 소스 코드 숨기기, 개발일 때는 eval로 개발
      devtool: prod ? 'hidden-source-map' : 'eval',

      // 웹팩 플러그인
      plugins,
    };
  },

});