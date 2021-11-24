import React, { Component, useState } from 'react';
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
  const [value, setValue] = useState('');
  return (
    <div className="wrapper">
      <DropDownSelect
        caption="Модель"
        value={value}
        options={options}
        placeholder="Любая"
        onChange={setValue}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
