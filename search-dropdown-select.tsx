import React from 'react';
import cn from 'classname';

import './style.css';

interface IProps {
  placeholder?: string;
  caption: string;
  options: any[];
}

export const DropDownSelect = ({ caption, options }) => {
  return (
    <div className={cn('dropdownSelectWrapper')}>
      <div className={cn('dropdownSelectInputWrapper')}>
      <p className={cn('dropdownSelectInputCaption')}>{caption}</p>
      <input type="text" />
      <p className={cn('dropdownSelectInputPlaceholder')}>{placeholder}</p>
    </div>
  );
};
