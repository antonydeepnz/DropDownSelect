import React, { FC, useRef, useState, useMemo } from 'react';
import cn from 'classnames';

import { Autocomplete } from './autocomplete';

import './style.css';

interface IProps {
  placeholder?: string;
  value: string;
  caption: string;
  options: any[];
  onChange: any;
}

export const DropDownSelect: FC<IProps> = ({
  placeholder = '',
  value,
  caption,
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState(false);
  const [autocomplete, setAutocomplete] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // event.stopPropagation();
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSelected(true);
  };

  const handleChange = (event) => {
    setAutocomplete(event.target.value);
  };

  const autocompletedOption = useMemo(
    () => options.filter(({ name }) => name.toLowerCase().match(autocomplete)),
    [options, autocomplete]
  );

  return (
    <div
      className={cn('dropdownSelectWrapper', {
        dropdownSelectWrapperActive: selected,
      })}
    >
      <div className={cn('dropdownSelectInputWrapper')} onClick={handleClick}>
        <p className={cn('dropdownSelectInputCaption')}>{caption}</p>
        <input type="hidden" value={value} />
        <input
          ref={inputRef}
          list="autocomplete"
          type="text"
          aria-selected={selected}
          value={autocomplete}
          className={cn('dropdownSelectInput')}
          onChange={handleChange}
        />
        <p
          className={cn('dropdownSelectInputPlaceholder', {
            dropdownSelectInputPlaceholderHided: selected,
          })}
        >
          {placeholder}
        </p>
      </div>
      {selected && (
        <Autocomplete options={autocompletedOption} onSelect={onChange} />
      )}
    </div>
  );
};
