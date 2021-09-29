import { observer } from 'mobx-react';
import React from 'react';

import { TeaCup } from './art/tea-cup/TeaCup';
import { XmasLights } from './art/xmas-lights/XmasLights';
import { ColourClock } from './clocks/ColourClock';
import { Loaders } from './loaders/Loaders';
import { Particles } from './particles/Particles';

import './app.scss';

@observer
export class App extends React.PureComponent {
  public render() {
    return (
      <div className={'panels'}>
        <Loaders />
        <TeaCup />
        <XmasLights />
        <Particles />
        <ColourClock />
      </div>
    );
  }
}
