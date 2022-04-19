import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './tableContext';

function Provider({ children }) {
  const [name, setName] = useState({ filterByName: { name: '' } });
  const [population, setPopulation] = useState(
    { filterByNumericValues: [] },
  );
  const contextValue = {
    name,
    setName,
    population,
    setPopulation,
  };

  return (
    <TableContext.Provider value={ contextValue }>
      {children}
    </TableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
