import React from 'react';

import './circle-spinner.scss';

export const CircleSpinner: React.FC = () => {
  return (
    <div className={'circle-spinners'}>
      <div className={'spinner basic'}></div>
      <div className={'spinner woosh'}></div>
      <div className={'spinner snap'}></div>
    </div>
  );
};
