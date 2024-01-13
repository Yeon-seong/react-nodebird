/* -------------------- 트위터 팔로우 목록 -------------------- */



// React 라이브러리 불러오기
import React from 'react';

// Redux 라이브러리 Hook 불러오기
import { useDispatch } from 'react-redux';

// 데이터 유효성 타입 검사
import PropTypes from 'prop-types';

// 외부 컴포넌트 불러오기
import { List, Button, Card } from 'antd';

// Ant Design 아이콘 불러오기
import { StopOutlined } from '@ant-design/icons';

// 사용자 액션 불러오기
import {
  
  /* ---------- 언팔로우 요청 액션 ---------- */
  UNFOLLOW_REQUEST,

  /* ---------- 팔로워 제거 요청 액션 ---------- */
  REMOVE_FOLLOWER_REQUEST,

} from '../reducers/user';



// 팔로우 리스트 컴포넌트(사용자 정의 태그)
const FollowList = ({ header, data, onClickMore, loading }) => {

  /* dispatch = useDispatch 함수라고 선언 */
  const dispatch = useDispatch();

  // onCancel : item에 대한 데이터를 보내기 위한 고차함수 사용
  const onCancel = (id) => () => {  // id는 반복문에 대한 데이터
    /* header가 팔로잉이면 언팔로우 요청 액션 객체 디스패치 */
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id, // item.id
      });
    }
    /* header가 팔로워면 팔로워 제거 요청 액션 객체 디스패치 */
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,   // item.id
    });
  };



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
      loadMore={(
        <div style={{ textAlign: 'center', margin: '10px 0px' }}>
          <Button onClick={onClickMore} loading={loading}>더 보기</Button>
        </div>
      )}
      /* 팔로잉 목록, 팔로워 목록 전체 테두리 */
      bordered
      /* 목록용 데이터소스 : 팔로잉 목록, 팔로워 목록 더미데이터 배열 전달 */
      dataSource={data}

      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />/* List 닫음 */
  );
};



// 팔로우 리스트 컴포넌트의 header, data, onClickMore, loading props 데이터 타입 검사
FollowList.propTypes = {
  /* String 객체 필수 검사 */
  header: PropTypes.string.isRequired,
  /* Array 객체 필수 검사 */
  data: PropTypes.array.isRequired,
  /* PropTypes으로 구성된 함수 필수 검사 */
  onClickMore: PropTypes.func.isRequired,
  /* Boolean 객체 필수 검사 */
  loading: PropTypes.bool.isRequired,
};

// 팔로우 리스트 컴포넌트 내보내기
export default FollowList;