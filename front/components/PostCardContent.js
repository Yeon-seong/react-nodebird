/* -------------------- 트위터 포스트 카드 콘텐츠 -------------------- */



// 외부 컴포넌트 불러오기
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';



// 포스트 카드 콘텐츠 컴포넌트(사용자 정의 태그) : 해시태그 추출 컴포넌트
const PostCardContent = ({ postData }) => (
  // 첫 번째 포스트 #해시태그 #익스프레스
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        /* ----- 해시태그 : Link로 감싸서 반환 ----- */
        return <Link href={`/hashtag/${v.slice(1)}`} key={i}>
          <a>{v}</a>
        </Link>
      }
      /* ----- 일반 텍스트 : 그대로 반환 ----- */
      return v;
    })}
  </div>
);



// 포스트 카드 콘텐츠 컴포넌트의 postData props 데이터 타입 검사
PostCardContent.propTypes = {
  /* String 객체 필수 검사 */
  postData: PropTypes.string.isRequired,
};

// 포스트 카드 콘텐츠 컴포넌트 내보내기
export default PostCardContent;