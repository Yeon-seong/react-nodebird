/* -------------------- 모든 페이지 공통 -------------------- */


import React from 'react';
import propTypes from 'prop-types';
import 'antd/dist/antd.css';

const NodeBird = ({ Component }) => {
  return (
    <Component />
  )
};

NodeBird.propTypes = {
  Component: propTypes.elementType.isRequired,
}

export default NodeBird;