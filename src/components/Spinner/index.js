import React from 'react';
import './Spinner.scss';

const Spinner = (props) => {
  return (
    <div className={`spinner ${props.size ? props.size : ''}`} />
  );
};

export default Spinner;
