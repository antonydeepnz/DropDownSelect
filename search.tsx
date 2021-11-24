import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';

import { Autocomplete } from './autocomplete';

import './style.css';

interface IProps {
  placeholder?: string;
  caption: string;
  options: any[];
}

export const DropDownSelect: FC<IProps> = ({
  placeholder = '',
  caption,
  options,
}) => {
  const [selected, setSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSelected(true);
  };

  return (
    <div className={cn('dropdownSelectWrapper')}>
      <div className={cn('dropdownSelectInputWrapper')} onClick={handleClick}>
        <p className={cn('dropdownSelectInputCaption')}>{caption}</p>
        <input
          ref={inputRef}
          list="autocomplete"
          type="text"
          aria-selected={selected}
          className={cn('dropdownSelectInput')}
        />
        <p
          className={cn('dropdownSelectInputPlaceholder', {
            dropdownSelectInputPlaceholderHided: selected,
          })}
        >
          {placeholder}
        </p>
        <Autocomplete options={options} />
      </div>
    </div>
  );
};
