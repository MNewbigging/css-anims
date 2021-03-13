import { observer } from 'mobx-react';
import React from 'react';

import { CircleSpinner } from './spinners/CircleSpinner';

import './app.scss';

@observer
export class App extends React.PureComponent {
  public render() {
    return (
      <div className={'spinners'}>
        <CircleSpinner />
      </div>
    );
  }
}
