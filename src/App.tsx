import { observer } from 'mobx-react';
import React from 'react';

import { BarLoader } from './loaders/BarLoader';
import { CircleSpinner } from './loaders/CircleSpinner';

import './app.scss';

@observer
export class App extends React.PureComponent {
  public render() {
    return (
      <div className={'spinners'}>
        <CircleSpinner />
        <BarLoader />
      </div>
    );
  }
}
