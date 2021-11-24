import React, { useEffect, FC } from 'react';

import { getScroll, usePrevious } from './helpers';

export const Autocomplete: FC<any> = ({ options }) => {
  // const prevIndex = usePrevious(highlightedItem);

  return (
    <ul
      // ref={ref}
      className="autocomplete"
      data-test-id="autocomplete"
      role="listbox"
      tabIndex={-1}
    >
      {options.map(({ id, name }) => (
        <li
          key={id + name}
          // aria-selected={highlightedItem === index}
          className={'option'}
          // data-test-id={`autocomplete-${index}`}
          onClick={() => {}}
          role="option"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
