/* -------------------- 트위터 앱 레이아웃 페이지 -------------------- */


import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link'; 
import { Menu, Input, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
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
					<Input.Search enterButton style={{ verticalAlign: 'middle' }} />
				</Menu.Item>

				<Menu.Item>
					<Link href="/signup"><a>회원가입</a></Link>
				</Menu.Item>
      </Menu>

			<Row gutter={8}>
				<Col xs={24} md={6}>
					<a
						href="https://www.youtube.com/channel/UCApS8QVxNA7ngyzrudA5q-w"
						target="_blank"
						rel="noreferrer noopener"
					>
						YouTube 채널
					</a>
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