/* -------------------- 트위터 팔로우 목록 -------------------- */



// 외부 컴포넌트 불러오기
import React from 'react';
import PropTypes from 'prop-types';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';



// 팔로우 리스트 컴포넌트(사용자 정의 태그)
const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: '20px' }}
      /* 격자 모양 */
      grid={{ gutter: 4, xs: 2, md: 3 }}
      /* 목록 크기 */
      size="small"
      /* 팔로잉 목록, 팔로워 목록 헤더 */
      header={<div>{header}</div>}
      /* 더보기 버튼 */
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0px' }}>
          <Button>더 보기</Button>
        </div>
      }
      /* 팔로잉 목록, 팔로워 목록 전체 테두리 */
      bordered
      /* 목록용 데이터소스 : 팔로잉 목록, 팔로워 목록 더미 데이터 배열 전달 */
      dataSource={data}
      renderItem={(item) => {
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      }}
    />/* List 닫음 */
  );
};



// 팔로우 리스트 컴포넌트의 header, data props 데이터 타입 검사
FollowList.propTypes = {
  /* String 객체 필수 검사 */
  header: PropTypes.string.isRequired,
  /* Array 객체 필수 검사 */
  data: PropTypes.array.isRequired,
};

// 팔로우 리스트 컴포넌트 내보내기
export default FollowList;