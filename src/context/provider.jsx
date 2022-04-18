import React from 'react';
import PropTypes from 'prop-types';
import TableContext from './tableContext';

function Provider({ children }) {
  // const [stateA, setStateA] = useState('initialStateA');
  // const [stateB, setStateB] = useState('initialStateB');
  const contextValue = {
    title: 'a',
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
