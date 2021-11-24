import React, { useEffect, FC } from 'react';
import cn from 'classnames';

export const Autocomplete: FC<any> = ({ options, onSelect }) => {
  // const prevIndex = usePrevious(highlightedItem);

  return (
    <ul
      // ref={ref}
      className={cn('autocomplete')}
      role="listbox"
      tabIndex={-1}
    >
      {options.map(({ id, name }) => (
        <li
          key={id + name}
          // aria-selected={highlightedItem === index}
          className={'option'}
          // data-test-id={`autocomplete-${index}`}
          onClick={() => onSelect(id)}
          role="option"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
