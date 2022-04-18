import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './tableContext';

function Provider({ children }) {
  const [name, setName] = useState({ filterByName: { name: '' } });
  // const [stateB, setStateB] = useState('initialStateB');
  const contextValue = {
    name,
    setName,
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
