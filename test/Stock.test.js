import React from 'react';
import ReactDOM from 'react-dom';
import Stock from '../client/src/components/Stock/Stock';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Stock />, div);
  ReactDOM.unmountComponentAtNode(div);
})