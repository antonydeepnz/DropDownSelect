import React, { FC, useRef, useState, useMemo, useCallback } from 'react';
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

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSelected(true);
  };

  const handleChange = (event) => {
    setAutocomplete(event.target.value);
  };

  const autocompletedOption = useMemo(
    () =>
      options.filter(({ name }) =>
        name.toLowerCase().match(autocomplete.toLowerCase())
      ),
    [options, autocomplete]
  );

  const handleSelect = useCallback(
    (id: string) => () => {
      onChange(id);
      setSelected(false);
      setAutocomplete('');
    },
    []
  );

  const displayedValue = useMemo(
    () => options.find(({ id }) => id === value)?.name,
    [value]
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
          type="text"
          aria-selected={selected}
          value={autocomplete}
          className={cn('dropdownSelectInput')}
          onChange={handleChange}
        />
        <p
          className={cn(
            'dropdownSelectInputPlaceholder',
            {
              dropdownSelectInputPlaceholderHided:
                autocomplete && displayedValue,
            },
            { dropdownSelectInputPlaceholderValue: displayedValue }
          )}
        >
          {displayedValue || placeholder}
        </p>
      </div>
      {selected && (
        <Autocomplete options={autocompletedOption} onSelect={handleSelect} />
      )}
    </div>
  );
};
