import React from 'react';

import './xmas-lights.scss';

export const XmasLights: React.FC = () => {
  return (
    <div className={'panel xmas-lights'}>
      <div className='container'>
        <svg width='300' height='400' xmlns='http://www.w3.org/2000/svg'>
          <g id='Layer_1'>
            <path
              id='svg_5'
              d='m40.5,336c16,-10 -9,-228 8,-248c17,-20 20,-10 24,-9c4,1 50,34 79,30c29,-4 74,-45 100,-33c26,12 -10,256 -3,262'
              opacity='NaN'
              stroke='#000'
              fill='#fff'
            />
          </g>
        </svg>

        <div className='light l0'>
          <div className='bulb blue'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l1'>
          <div className='bulb red'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l2'>
          <div className='bulb orange'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l3'>
          <div className='bulb green'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l4'>
          <div className='bulb blue'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l5'>
          <div className='bulb red'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l6'>
          <div className='bulb orange'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l7'>
          <div className='bulb green'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='light l8'>
          <div className='bulb blue'></div>
          <div className='rim'></div>
          <div className='body'></div>
        </div>

        <div className='window'></div>
        <div className='frame-up'></div>
        <div className='frame-right'></div>
      </div>
    </div>
  );
};
