/* -------------------- 트위터 앱 레이아웃 -------------------- */


import React, { useState } from 'react';
import propTypes from 'prop-types';
import Link from 'next/link'; 
import { Menu, Input, Row, Col } from 'antd';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';



const AppLayout = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
				<Menu.Item>
					<Link href="/"><a>노드버드</a></Link>
				</Menu.Item>
        
				<Menu.Item>
					<Link href="/profile"><a>프로필</a></Link>
				</Menu.Item>

				<Menu.Item>
					<Input.Search
						enterButton style={{ verticalAlign: 'middle' }}
						type="text"
						name="메인 검색 창"
						placeholder="검색"
					/>
				</Menu.Item>

				<Menu.Item>
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
      </Menu>

			<Row gutter={8}>
				<Col xs={24} md={6}>
					{isLoggedIn ? <UserProfile /> : <LoginForm />}
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



AppLayout.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppLayout;