import React from 'react';

import './bar-loader.scss';

export const BarLoader: React.FC = () => {
  return (
    <div className={'bar-loader'}>
      <div className={'bar one'}></div>
      <div className={'bar two'}></div>
      <div className={'bar three'}></div>
    </div>
  );
};
