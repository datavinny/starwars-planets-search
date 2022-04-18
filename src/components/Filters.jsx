import React, { useContext } from 'react';
import TableContext from '../context/tableContext';

function Filters() {
  const { setName } = useContext(TableContext);
  // console.log(name);
  return (
    <div>
      <label htmlFor="name-filter">
        Project - Star Wars - Trybe
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setName({
            filterByName: {
              name: target.value,
            },
          }) }
          type="text"
          id="name-filter"
        />
      </label>
    </div>
  );
}

export default Filters;
