import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './tableContext';

function Provider({ children }) {
  const [name, setName] = useState({ filterByName: { name: '' } });
  const [population, setPopulation] = useState(
    { filterByNumericValues: [] },
  );
  const [data, setData] = useState([]);
  const [backupData, setBackupData] = useState([]);
  const contextValue = {
    name,
    setName,
    population,
    setPopulation,
    data,
    setData,
    backupData,
    setBackupData,
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
