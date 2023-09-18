/* -------------------- 트위터 앱 레이아웃 -------------------- */


// 외부 컴포넌트 불러오기
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; 
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

// 내부 컴포넌트 불러오기
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';


// 검색인풋 컴포넌트 : Input.Search 컴포넌트 커스텀 스타일링
const SearchInput = styled(Input.Search)`
	vertical-align: middle;
`;


// 앱 레이아웃 컴포넌트(사용자 정의 태그)
const AppLayout = ({ children }) => {
	/* 컴포넌트 상태 저장 : 리액트 Hooks useState 사용 */
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
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

			{/* 반응형 화면 분할 */}
			<Row gutter={8}>
				<Col xs={24} md={6}>
					{/* 로그인 되어있으면 사용자 프로필, 로그인이 안 되어있으면 로그인 폼을 보이기 */}
					{isLoggedIn
						? <UserProfile setIsLoggedIn={setIsLoggedIn} />
						: <LoginForm setIsLoggedIn={setIsLoggedIn} />}
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