/* -------------------- 트위터 앱 레이아웃 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// Redux 라이브러리 불러오기
import { useSelector } from 'react-redux';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// 내부 컴포넌트 불러오기
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';



// 글로벌 컴포넌트 : 전역 스타일 정의
const Global = createGlobalStyle`
  .ant-row {
		margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

	.ant-col:last-child {
    padding-right: 0 !important;
  }
`;


// 검색인풋 컴포넌트 : Input.Search 컴포넌트 커스텀 스타일링
const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;


// 앱 레이아웃 컴포넌트(사용자 정의 태그)
const AppLayout = ({ children }) => {
	
	/* useSelector로 중앙 데이터 저장소 user 데이터의 로그인 한 사용자 정보 받아오기  */
	const { me } = useSelector((state) => state.user);
	
  return (
    <div>
			<Global />
      <Menu mode="horizontal">

				{/* 노드버드 메인화면 링크 */}
				<Menu.Item>
					<Link href="/"><a>노드버드</a></Link>
				</Menu.Item>
        
				{/* 프로필 화면 링크 */}
				<Menu.Item>
					<Link href="/profile"><a>프로필</a></Link>
				</Menu.Item>

				{/* 검색 창 */}
				<Menu.Item>
					<SearchInput
						enterButton
						type="text"
						name="메인 검색 창"
						placeholder="검색"
					/>
				</Menu.Item>

				{/* 회원가입 화면 링크 */}
				<Menu.Item>
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
      </Menu>

			{/* ---------- 반응형 화면 분할 ---------- */}
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{/* 로그인 되어있으면 사용자 프로필, 로그인이 안 되어있으면 로그인 폼 보이기 */}
					{me ? <UserProfile /> : <LoginForm />}
				</Col>

				<Col xs={24} md={12}>
					{ children }
				</Col>
				
				<Col xs={24} md={6}>
					<a
						href="https://blog.naver.com/dd300"
						target="_blank"
						rel="noreferrer noopener"
					>
						Naver 블로그
					</a>
				</Col>
			</Row>
    </div>
  );
};



// 앱 레이아웃 컴포넌트의 children props 데이터 타입 검사
AppLayout.propTypes = {
	/* Node 객체 필수 검사 */
  children: PropTypes.node.isRequired,
};

// 앱 레이아웃 컴포넌트 내보내기
export default AppLayout;