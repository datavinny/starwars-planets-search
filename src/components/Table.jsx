import React, { useState, useEffect, useContext } from 'react';
import tableData from '../services/api';
import TableContext from '../context/tableContext';

function Table() {
  const [makeFetch, setMakeFetch] = useState(true);
  const {
    name, population, data, setData, setBackupData, backupData,
  } = useContext(TableContext);

  const numericFilter = (comparison) => {
    const userFilters = population.filterByNumericValues;
    let result = [];
    for (let index = 0; index < userFilters.length; index += 1) {
      if (comparison === 'maior que') {
        result = data.filter((e) => (
          Number(e[userFilters[index].column]) > Number(userFilters[index].value)
        ));
      }
      if (comparison === 'menor que') {
        result = data.filter((e) => (
          Number(e[userFilters[index].column]) < Number(userFilters[index].value)
        ));
      }
      if (comparison === 'igual a') {
        result = data.filter((e) => (
          Number(e[userFilters[index].column]) === Number(userFilters[index].value)
        ));
      }
    }
    return result;
  };

  useEffect(() => {
    async function fetchTable() {
      const result = await tableData();
      setData(result.results);
      setBackupData(result.results);
    }
    if (makeFetch === true) {
      fetchTable();
      setMakeFetch(false);
    } else if (
      name.filterByName.name.length === 0 && population.filterByNumericValues.length === 0
    ) {
      setData(backupData);
    }
    if (name.filterByName.name.length > 0) {
      const userInput = name.filterByName.name;
      const filtred = data.filter((e) => (
        e.name.toLowerCase().includes(userInput.toLowerCase())
      ));
      setData(filtred);
    }
    if (makeFetch === false && population.filterByNumericValues.length > 0) {
      const userFilters = population.filterByNumericValues;
      for (let i = 0; i < userFilters.length; i += 1) {
        const filtred = numericFilter(userFilters[i].comparison);
        setData(filtred);
      }
    }
  }, [name, population]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, index) => (
          <tr key={ index }>
            <td>{e.name}</td>
            <td>{e.rotation_period}</td>
            <td>{e.orbital_period}</td>
            <td>{e.diameter}</td>
            <td>{e.climate}</td>
            <td>{e.gravity}</td>
            <td>{e.terrain}</td>
            <td>{e.surface_water}</td>
            <td>{e.population}</td>
            <td>{e.films}</td>
            <td>{e.created}</td>
            <td>{e.edited}</td>
            <td>{e.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
