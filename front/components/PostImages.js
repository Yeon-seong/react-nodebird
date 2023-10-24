/* -------------------- 트위터 포스트 이미지 -------------------- */



// 외부 컴포넌트 불러오기
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

// 내부 컴포넌트 불러오기
import ImagesZoom from './ImagesZoom';



// 포스트 이미지 컴포넌트(사용자 정의 태그)
const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  /* 이미지를 클릭했을 때 onZoom이 실행되면 이미지 확대 보이기 */
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  /* 이미지를 클릭했을 때 onClose이 실행되면 이미지 확대 */
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  /* ----- 이미지가 1개라면 화면 100% 차지 ----- */
  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          /* 최대 높이 */
          style={{
            maxHeight: '300px'
          }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  };
  
  /* ----- 이미지가 2개라면 화면 50% 차지 ----- */
  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          style={{
            width: '50%',
            display: 'inline-block'
          }}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          role="presentation"
          style={{
            width: '50%',
            display: 'inline-block'
          }}
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  };
  
  /* ----- 이미지가 3개 이상이라면 첫 번째 이미지와 더보기 버튼 ----- */
  if (images.length >= 3) {
    return (
      <>
        <div>
          {/* 첫 번째 이미지 */}
          <img
            role="presentation"
            style={{
              width: '50%'
            }}
            src={images[0].src}
            alt={images[0].src}
            onClick={onZoom}
          />
          {/* 첫 번째 이미지 뒤의 이미지 */}
          <div
            role="presentation"
            style={{
              display: 'inline-block',
              width: '50%',
              textAlign: 'center',
              verticalalign: 'middle'
            }}
            onClick={onZoom}
            >
              <PlusOutlined />
              <br />
              {images.length - 1}
              개의 사진 더보기
          </div>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  };

  return (
    <div>이미지 구현중...</div>
  );
};



// 포스트 이미지 컴포넌트의 images props 데이터 타입 검사
PostImages.propTypes = {
  /* PropTypes으로 구성된 객체들의 배열 검사 */
  images: PropTypes.arrayOf(PropTypes.object),
};

// 포스트 이미지 컴포넌트 내보내기
export default PostImages;