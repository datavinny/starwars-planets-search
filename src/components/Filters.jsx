import React, { useContext, useState } from 'react';
import TableContext from '../context/tableContext';

function Filters() {
  const [populationFilters, setPopulationFilters] = useState(
    { comparison: 'maior que', column: 'population', value: '0' },
  );
  const {
    setName, setPopulation,
  } = useContext(TableContext);

  const onChangeValue = ({ target }) => {
    const { value, id } = target;
    setPopulationFilters((prevState) => ({ ...prevState, [id]: value }));
  };

  const submitPopulationFilters = () => {
    setPopulation((prevState) => {
      const prevArr = prevState.filterByNumericValues;
      return ({ filterByNumericValues: [...prevArr, populationFilters] });
    });
  };

  return (
    <form>
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
          placeholder="insert a planet name"
        />
      </label>
      <label htmlFor="column-filter">
        Column-Filter:
        <select onChange={ onChangeValue } data-testid="column-filter" id="column">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison-Filter:
        <select
          onChange={ onChangeValue }
          data-testid="comparison-filter"
          id="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Value
        <input
          onChange={ onChangeValue }
          type="number"
          data-testid="value-filter"
          id="value"
          min="0"
          value={ populationFilters.value }
        />
      </label>
      <button
        onClick={ submitPopulationFilters }
        type="button"
        data-testid="button-filter"
      >
        FILTRAR
      </button>
    </form>
  );
}

export default Filters;
