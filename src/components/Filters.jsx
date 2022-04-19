import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/tableContext';

function Filters() {
  const [populationFilters, setPopulationFilters] = useState(
    { comparison: 'maior que', column: 'population', value: '0' },
  );
  const [columnFilters, setColumnFilters] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const {
    setName, setPopulation, population, backupData, setData,
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

  const attColumnOptions = () => {
    const userFilters = population.filterByNumericValues;
    let newColumnFilters = [];
    for (let i = 0; i < userFilters.length; i += 1) {
      newColumnFilters = columnFilters.filter((e) => e !== userFilters[i].column);
    }
    if (newColumnFilters.length > 0) {
      setColumnFilters(newColumnFilters);
      setPopulationFilters(
        (prevState) => ({ ...prevState, column: newColumnFilters[0] }),
      );
    }
  };

  useEffect(() => {
    attColumnOptions();
  }, [population]);

  const removeSelectedFilter = (selectedFilter) => {
    const userFilters = population.filterByNumericValues;
    const attFilters = userFilters.filter((e) => e !== selectedFilter);
    setData(backupData);
    setPopulation({ filterByNumericValues: [...attFilters] });
  };

  const clearFilters = () => {
    setData(backupData);
    setPopulation({ filterByNumericValues: [] });
    setColumnFilters(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
  };

  return (
    <div>
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
            {columnFilters.map((e) => <option key={ e } value={ e }>{e}</option>)}
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
        <button
          onClick={ clearFilters }
          type="button"
          data-testid="button-remove-filters"
        >
          REMOVER FILTROS
        </button>
      </form>
      <section>
        <p>Applied Filters:</p>
        { population.filterByNumericValues.length
      && population.filterByNumericValues.map((e, i) => (
        // <div key={ i }>
        <p key={ i } data-testid="filter">
          { e.column }
          {' '}
          { e.comparison }
          {' '}
          { e.value }
          <button type="button" onClick={ () => removeSelectedFilter(e) }>X</button>
        </p>
        // </div>
      ))}
      </section>
    </div>
  );
}

export default Filters;
