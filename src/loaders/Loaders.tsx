import React from 'react';

import { BarLoader } from './BarLoader';
import { CircleSpinner } from './CircleSpinner';

import './loaders.scss';

export class Loaders extends React.Component {
  public render() {
    return (
      <div className={'panel loaders'}>
        <CircleSpinner />
        <BarLoader />
      </div>
    );
  }
}
