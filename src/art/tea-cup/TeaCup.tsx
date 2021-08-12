import React from 'react';

import './tea-cup.scss';

export const TeaCup: React.FC = () => {
  return (
    <div className={'panel tea-cup'}>
      <div className='steam'>
        <svg className='steam-line' width='50' height='90' xmlns='http://www.w3.org/2000/svg'>
          <g>
            <path
              transform='rotate(-37.1924 22.6347 47.5)'
              id='svg_1'
              d='m-0.02458,79c-4.50757,-36.83077 60.40143,-10.66154 42.37115,-63'
            />
          </g>
        </svg>

        <svg className='steam-line mid' width='50' height='90' xmlns='http://www.w3.org/2000/svg'>
          <g>
            <path
              transform='rotate(-37.1924 22.6347 47.5)'
              id='svg_1'
              d='m-0.02458,79c-4.50757,-36.83077 60.40143,-10.66154 42.37115,-63'
            />
          </g>
        </svg>

        <svg className='steam-line' width='50' height='90' xmlns='http://www.w3.org/2000/svg'>
          <g>
            <path
              transform='rotate(-37.1924 22.6347 47.5)'
              id='svg_1'
              d='m-0.02458,79c-4.50757,-36.83077 60.40143,-10.66154 42.37115,-63'
            />
          </g>
        </svg>
      </div>

      <div className='cup-holder'>
        <div className='cup'></div>
        <div className='handle'></div>
        <div className='handle-inner'></div>
      </div>
    </div>
  );
};
