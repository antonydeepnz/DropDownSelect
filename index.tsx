import React, { Component } from 'react';
import { render } from 'react-dom';

import { DropDownSelect } from './search';

interface AppProps {}
interface AppState {}

const options = [
  { id: '77', name: 'Москва' },
  { id: '50', name: 'Московская область' },
  { id: '62', name: 'Рязань' },
  { id: '58', name: 'Пенза' },
  { id: '59', name: 'Пермь' },
  { id: '63', name: 'Самара' },
  { id: '64', name: 'Саратов' },
];

const App = () => {
  return (
    <div className="wrapper">
      <DropDownSelect caption="Модель" options={options} placeholder="Любая" />
    </div>
  );
};

render(<App />, document.getElementById('root'));
