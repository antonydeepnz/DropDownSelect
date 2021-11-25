import React, { FC, useRef } from 'react';
import cn from 'classnames';

export const Autocomplete: FC<any> = ({
  options,
  highlightedItem,
  onSelect,
}) => {
  const itemsRefs = useRef<HTMLElement[]>([]);
  // const prevIndex = usePrevious(highlightedItem);

  console.log(itemsRefs);

  return (
    <ul className={cn('autocomplete')} role="listbox" tabIndex={-1}>
      {options.map(({ id, name }, idx) => (
        <li
          ref={(ref) => (itemsRefs.current[id] = ref)}
          key={id + name}
          aria-selected={highlightedItem === idx}
          className={'option'}
          // data-test-id={`autocomplete-${index}`}
          onClick={onSelect(id)}
          role="option"
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
