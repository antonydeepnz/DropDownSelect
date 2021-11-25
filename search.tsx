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
  const [focused, setFocused] = useState<boolean>(false);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState<number>(0);
  const [autocomplete, setAutocomplete] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setFocused(true);
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
      setFocused(false);
      setAutocomplete('');
    },
    []
  );

  const displayedValue = useMemo(
    () => options.find(({ id }) => id === value)?.name,
    [value]
  );

  const handleSuggestionsSelect = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        onChange(highlightedSuggestion);
      }

      if (event.keyCode === 38) {
        setHighlightedSuggestion((prev) => prev - 1);
      }

      if (event.keyCode === 40) {
        setHighlightedSuggestion((prev) => prev + 1);
      }
    },
    [highlightedSuggestion]
  );

  return (
    <div
      className={cn('dropdownSelectWrapper', {
        dropdownSelectWrapperActive: focused,
      })}
    >
      <div className={cn('dropdownSelectInputWrapper')} onClick={handleClick}>
        <p className={cn('dropdownSelectInputCaption')}>{caption}</p>
        <input type="hidden" value={value} />
        <input
          ref={inputRef}
          type="text"
          aria-selected={focused}
          value={autocomplete}
          className={cn('dropdownSelectInput')}
          onChange={handleChange}
          onKeyDown={handleSuggestionsSelect}
        />
        <p
          className={cn(
            'dropdownSelectInputPlaceholder',
            {
              dropdownSelectInputPlaceholderBlured:
                !value || (!autocomplete && focused),
            },
            {
              dropdownSelectInputPlaceholderHided:
                focused && autocomplete && displayedValue,
            },
            { dropdownSelectInputPlaceholderValue: displayedValue }
          )}
        >
          {displayedValue || placeholder}
        </p>
      </div>
      {focused && (
        <Autocomplete
          options={autocompletedOption}
          highlightedItem={highlightedSuggestion}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};
